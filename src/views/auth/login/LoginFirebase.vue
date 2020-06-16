<template>
  <div>
    <vs-input
      v-model="email"
      v-validate="'required|email|min:3'"
      data-vv-validate-on="blur"
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      class="w-full"
    />
    <span class="text-danger text-sm">{{ errors.first('email') }}</span>

    <vs-input
      v-model="password"
      v-validate="'required|min:6|max:10'"
      data-vv-validate-on="blur"
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">{{ errors.first('password') }}</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox
        v-model="checkboxRememberMe"
        class="mb-3"
      >
        Remember Me
      </vs-checkbox>
      <router-link to="/forgot-password">
        Forgot Password?
      </router-link>
    </div>

    <vs-button
      class="float-right"
      :disabled="!validateForm"
      @click="login"
    >
      Login
    </vs-button>

    <vs-divider>OR</vs-divider>
    <vs-button
      type="border"
      @click="registerUser"
    >
      Go to Register
    </vs-button>
    <div class="social-login-buttons flex flex-wrap items-center float-right ">
      <!-- facebook -->
      <div
        class="bg-facebook pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4"
        @click="loginWithFacebook"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="facebook-f"
          class="text-white h-4 w-4 svg-inline--fa fa-facebook-f fa-w-9"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 264 512"
        >
          <path
            fill="currentColor"
            d="M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z"
          />
        </svg>
      </div>

      <!-- TWITTER -->
      <div
        class="bg-twitter pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4"
        @click="loginWithTwitter"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="twitter"
          class="text-white h-4 w-4 svg-inline--fa fa-twitter fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          />
        </svg>
      </div>

      <!-- GOOGLE -->
      <div
        class="bg-google pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-4"
        @click="loginWithGoogle"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          class="text-white h-4 w-4 svg-inline--fa fa-google fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/authModule'
import { ActiveUserModule } from '@/store/modules/activeUserModule'

  @Component({
    name: 'LoginFireBase',
    components: {}
  })

export default class LoginFireBase extends Vue {
    private email: string = ''
    private password: string = ''
    private checkboxRememberMe: boolean = false

    private mounted () {
      if (!ActiveUserModule.activeUserInfo) return
      this.$router.push('/').catch(() => {
      })
    }

    private checkLogin () {
      // If user is already logged in notify
      if (ActiveUserModule.activeUserInfo) {
        // Close animation if passed as payload
        // this.$vs.loading.close()

        this.$vs.notify({
          title: 'Login Attempt',
          text: 'You are already logged in!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })

        return false
      }
      return true
    }

    private async login () {
      // Loading
      this.$vs.loading()

      const payload = {
        checkboxRememberMe: this.checkboxRememberMe,
        userDetails: {
          email: this.email,
          password: this.password
        },
        notify: this.$vs.notify,
        closeAnimation: this.$vs.loading.close
      }

      await AuthModule.login(payload)
      await this.updateUserRole()
    }

    // Google login
    private async loginWithGoogle () {
      await AuthModule.loginWithGoogle({ notify: this.$vs.notify })
      await this.updateUserRole()
    }

    // Facebook login
    private async loginWithFacebook () {
      await AuthModule.loginWithFacebook({ notify: this.$vs.notify })
      await this.updateUserRole()
    }

    // Twitter login
    private async loginWithTwitter () {
      await AuthModule.loginWithTwitter({ notify: this.$vs.notify })
      await this.updateUserRole()
    }

    // Github login
    private async loginWithGithub () {
      await AuthModule.loginWithGithub({ notify: this.$vs.notify })
      await this.updateUserRole()
    }

    private async updateUserRole () {
      if (ActiveUserModule.user) {
        console.log('ActiveUserModule.user.userRole', ActiveUserModule.user.userRole)
        // @ts-ignore
        this.$acl.change(ActiveUserModule.user.userRole)
        // @ts-ignore
        console.log(' this.$acl.change(ActiveUserModule.user.userRole)', this.$acl.check(ActiveUserModule.user.userRole))
      }
    }

    registerUser () {
      if (!this.checkLogin()) return
      this.$router.push('/register').catch(() => {
      })
    }

    get validateForm () {
      // @ts-ignore
      return !this.errors.any() && this.email !== '' && this.password !== ''
    }
}
</script>

<style lang="scss">
  #page-login {
    .social-login-buttons {
      .bg-facebook {
        background-color: #1551b1
      }

      .bg-twitter {
        background-color: #00aaff
      }

      .bg-google {
        background-color: #E0584A
      }

      .bg-github {
        background-color: #333
      }
    }
  }
</style>
