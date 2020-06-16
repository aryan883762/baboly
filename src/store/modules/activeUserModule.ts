import { User } from '@/models/User'
import store from '@/store'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { AppModule } from '@/store/modules/appModule'

export interface IActiveUserState {
  user: User,
}

@Module({ dynamic: true, store, name: 'activeUser' })
class ActiveUser extends VuexModule implements IActiveUserState {
  // * Default value user = Null
  user: User = null

  constructor () {
    super(VuexModule)
    if (localStorage.length > 1 && this.user === null) {
      console.log('Loading Data from localStorage!')
      this.user = JSON.parse(atob(localStorage.getItem('userInfo')))
    } else {
      this.user = null
    }
  }

  @Mutation
  public updateUserInfo (userData: User) {
    this.user = userData
    ActiveUserModule.getUserRole(userData)
    AppModule.updateNavMenuItems(userData)
  }

  @Mutation
  public getUserRole (user: User) {
    let role: string = 'public'
    if (user && user.roles) {
      const admin = Object.values(user.roles).filter(item => item === 'Admin')
      const editor = Object.values(user.roles).filter(item => item === 'Editor')
      const customer = Object.values(user.roles).filter(item => item === 'Customer')
      role = admin.length === 1 ? 'admin' : editor.length === 1 ? 'editor' : customer.length === 1 ? 'customer' : role
      this.user.userRole = role
    }
  }

  get activeUserInfo (): User {
    return this.user
  }
}

export const ActiveUserModule = getModule(ActiveUser)
