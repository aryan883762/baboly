<template>
  <div class="clearfix pb-5">
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <vs-input
          v-model="firstName"
          v-validate="'required|alpha_dash|min:3|max:100'"
          data-vv-validate-on="blur"
          label-placeholder="First Name"
          name="first name"
          placeholder="First Name"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first('first name') }}</span>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <vs-input
          v-model="lastName"
          v-validate="'required|alpha_dash|min:3|max:100'"
          data-vv-validate-on="blur"
          label-placeholder="Last Name"
          name="last name"
          placeholder="Last Name"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first('last name') }}</span>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full px-3">
        <vs-input
          v-model="email"
          v-validate="'required|email'"
          data-vv-validate-on="blur"
          name="email"
          type="email"
          label-placeholder="Email"
          placeholder="Email"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first('email') }}</span>
      </div>
    </div>
    <div class="flex flex-wrap -mx-3 mb-3">
      <div class="w-full md:w-1/2 px-3 mb-3 md:mb-0">
        <vs-input
          ref="password"
          v-model="password"
          v-validate="'required|min:8|max:100'"
          type="password"
          data-vv-validate-on="blur"
          name="password"
          label-placeholder="Password"
          placeholder="Password"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first('password') }}</span>
      </div>
      <div class="w-full md:w-1/2 px-3">
        <vs-input
          v-model="confirmPassword"
          v-validate="'min:8|max:100|confirmed:password'"
          type="password"
          data-vv-validate-on="blur"
          data-vv-as="password"
          name="confirmPassword"
          label-placeholder="Confirm Password"
          placeholder="Confirm Password"
          class="w-full"
        />
        <span class="text-danger text-sm">{{ errors.first('confirmPassword') }}</span>
      </div>
    </div>

    <vs-checkbox
      v-model="isTermsConditionAccepted"
      class="mt-6"
    >
      I accept the terms & conditions.
    </vs-checkbox>
    <vs-button
      type="border"
      to="/login"
      class="mt-6"
    >
      Back To Login
    </vs-button>

    <vs-button
      class="float-right mt-6"
      :disabled="!validateForm"
      @click="registerUser"
    >
      Register
    </vs-button>
    <vs-divider>OR</vs-divider>
    <div class="text-center">
      <div class="social-login-buttons flex w-48 mx-auto">
        <!-- facebook -->
        <div
          class="bg-facebook pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-6"
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
          class="bg-twitter pt-3 pb-2 px-4 rounded-lg cursor-pointer mr-6"
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
          class="bg-google pt-3 pb-2 px-4 rounded-lg cursor-pointer"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@/store/modules/authModule'
import { ActiveUserModule } from '@/store/modules/activeUserModule'

  @Component({
    name: 'RegisterFirebase',
    components: {}
  })

export default class RegisterFirebase extends Vue {
    private name: string = ''
    private firstName: string = ''
    private lastName: string = ''
    private email: string = ''
    private password: string = ''
    private confirmPassword: string = ''
    private isTermsConditionAccepted: boolean = false

    private validateForm () {
      // @ts-ignore
      return !this.errors.any() && this.firstName !== '' &&
        this.lastName !== '' && this.email !== '' &&
        this.password !== '' && this.confirmPassword !== '' &&
        this.isTermsConditionAccepted !== false
    }

    private resetFields () {
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
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

    private async registerUser () {
      // If form is not validated or user is already login return
      if (!this.validateForm || !this.checkLogin()) return

      const payload = {
        userDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        },
        notify: this.$vs.notify
      }
      await AuthModule.register(payload)
      await this.updateUserRole()
      this.resetFields()
    }
    private async updateUserRole () {
      if (ActiveUserModule.user) {
        // @ts-ignore
        this.$acl.change(ActiveUserModule.user.userRole)
      }
    }
}
</script>
<style lang="scss">
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
</style>
