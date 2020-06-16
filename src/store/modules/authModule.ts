import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { loginUserByProvider, loginUser, registerUser } from '@/api/users'
import firebase, { auth } from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import { ActiveUserModule } from '@/store/modules/activeUserModule'
import { User, UserProviderData } from '@/models/User'

export interface IAuthState {
  tokenExpiryKey: string,
  authToken: string,
  deviceId: string,
  deviceOs: string,
  deviceToken: string,
  appVersion: string
}

const timeToExpireToken = 3600 * 1000 // time To expire token  in milliseconds 1 Hour

@Module({ namespaced: true, dynamic: true, store, name: 'auth' })
class Auth extends VuexModule {
  public tokenExpiryKey: string = 'tokenExpiryKey'
  public localStorageKey: string = 'localStorageKey'
  public authToken: string = ''
  public deviceId: string = '123'
  public deviceOs: string = 'web'
  public deviceToken: string = '123'
  public appVersion: string = '0.1'

  constructor () {
    super(VuexModule)
    if (localStorage.length > 1 && !this.authToken) {
      console.log('Loading Data from localStorage!')
      this.authToken = localStorage.getItem('authToken')
      console.log('this.authToken', this.authToken)
    } else {
      this.authToken = ''
    }
  }

  @Action({ rawError: true })
  public async register (payload: any) {
    console.log(payload)
    try {
      const response = await registerUser({
        email: payload.userDetails.email,
        password: payload.userDetails.password,
        passwordConfirmation: payload.userDetails.confirmPassword,
        firstName: payload.userDetails.firstName,
        lastName: payload.userDetails.lastName,
        deviceId: this.deviceId,
        deviceOs: this.deviceOs,
        deviceToken: this.deviceToken,
        appVersion: this.appVersion
      })
      if (response && response.data) {
        const user: User = response.data.user
        // Call authUser Mutation
        this.authUser(user)

        // Navigate User to homepage
        // @ts-ignore
        await router.push(router.currentRoute.query.to || '/')
      }
    } catch (errorData) {
      for (let [key, value] of Object.entries(errorData.errors)) {
        payload.notify({
          title: ' Error ' + key,
          text: value[0],
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }

      if (errorData.error) {
        payload.notify({
          title: ' Error ',
          text: errorData.error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    }
  }

  @Action({ rawError: true })
  public async login (payload) {
    try {
      const response = await loginUser({
        email: payload.userDetails.email,
        password: payload.userDetails.password,
        deviceId: this.deviceId,
        deviceOs: this.deviceOs,
        deviceToken: this.deviceToken,
        appVersion: this.appVersion
      })
      if (response && response.data) {
        // Close animation if passed as payload
        if (payload.closeAnimation) payload.closeAnimation()

        const user: User = response.data.user
        // const roles: any = user.roles
        // localStorage.setItem('roles', JSON.stringify(Object.values(roles)))
        // const admin = Object.values(roles).filter(item => item === 'Admin')
        // const editor = Object.values(roles).filter(item => item === 'Editor')
        // console.log(admin.length, editor.length, admin.length === 1)
        // Update user details
        this.authUser(user)
        // Navigate User to homepage
        // @ts-ignore
        await router.push(router.currentRoute.query.to || '/')
        // if (admin.length === 1)  await router.push(router.currentRoute.query.to || '/admin')
        // else if (editor.length === 1) await router.push('/')
        // else await router.push('/account')
      }
    } catch (errorData) {
      // Close animation if passed as payload
      if (payload.closeAnimation) payload.closeAnimation()

      if (errorData.errors) {
        for (let [key, value] of Object.entries(errorData.errors)) {
          payload.notify({
            title: ' Error ' + key,
            text: value[0],
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      }
      if (errorData.error) {
        payload.notify({
          title: ' Error ',
          text: errorData.error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    }
  }

  // Google Login
  @Action({ rawError: true })
  public async loginWithGoogle (payload: any) {
    const provider = new firebase.auth.GoogleAuthProvider()
    await this.signInWithPopupProvider(provider)
  }

  // Facebook Login
  @Action({ rawError: true })
  public async loginWithFacebook (payload: any) {
    const provider = new firebase.auth.FacebookAuthProvider()
    await this.signInWithPopupProvider(provider)
  }

  // Twitter Login
  @Action({ rawError: true })
  public async loginWithTwitter (payload: any) {
    const provider = new firebase.auth.TwitterAuthProvider()
    await this.signInWithPopupProvider(provider)
  }

  // Github Login
  @Action({ rawError: true })
  public async loginWithGithub (payload: any) {
    const provider = new firebase.auth.GithubAuthProvider()
    await this.signInWithPopupProvider(provider)
  }

  @Action({ rawError: true })
  public async signInWithPopupProvider (provider: any) {
    const providerId = provider.providerId
    const response = await firebase.auth().signInWithPopup(provider)
    if (response && response.user) {
      const user: any = response.user
      const providerUserData: any = user.providerData.find((item: any) => {
        return item.providerId === providerId
      })
      if (providerUserData && user) {
        const params: any = {
          email: providerUserData.email,
          provider: providerId,
          providerUserId: providerUserData.uid,
          token: user.ma,
          emailVerified: user.emailVerified,
          name: providerUserData.displayName ? providerUserData.displayName : '',
          firstName: providerUserData.firstName ? providerUserData.firstName : '',
          lastName: providerUserData.lastName ? providerUserData.lastName : '',
          avatar: providerUserData.photoURL ? providerUserData.photoURL : null,
          deviceId: this.deviceId,
          deviceOs: this.deviceOs,
          deviceToken: this.deviceToken,
          appVersion: this.appVersion
        }

        await this.loginUserByProvider(params)
      }
    }
  }

  // Clear session data upon token expiration
  get isAuthenticated (): boolean {
    let res = new Date().valueOf() < Date.parse(localStorage.getItem('tokenExpiryKey')) &&
      localStorage.getItem(this.localStorageKey) === 'true' &&
      localStorage.getItem('authToken').length > 0
    if (!res) {
      localStorage.clear() // is more effective!
      sessionStorage.clear()
      if (ActiveUserModule) {
        ActiveUserModule.updateUserInfo(null)
      }
    }
    return res
  }

  @Action({ rawError: true })
  public async loginUserByProvider (params: any) {
    return new Promise((resolve, reject) => {
      loginUserByProvider(params)
        .then(response => {
          // If there's user data in response
          if (response.data) {
            const user: User = response.data.user
            // Update user details
            this.authUser(user)
            // Navigate User to homepage
            // @ts-ignore
            router.push(router.currentRoute.query.to || '/')
            resolve(response)
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({ message: 'Something went wrong! gg' })
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @Mutation
  authUser (user: User) {
    this.authToken = user.authToken
    ActiveUserModule.updateUserInfo(user)
    localStorage.setItem('tokenExpiryKey', new Date(Date.now() + timeToExpireToken).toString())
    localStorage.setItem('localStorageKey', 'true')
    localStorage.setItem('userInfo', btoa(JSON.stringify(user)))
    localStorage.setItem('authToken', user.authToken)
  }

  @Mutation
  logout () {
    this.authToken = null
    ActiveUserModule.updateUserInfo(null)
    localStorage.removeItem('tokenExpiryKey')
    localStorage.removeItem('localStorageKey')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('authToken')
  }
}

export const AuthModule = getModule(Auth)
