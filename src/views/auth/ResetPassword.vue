<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col lg:w-1/2 xl:w-1/2 mx-auto self-center">
      <vx-card>
        <div
          slot="no-body"
          class="full-page-bg-color"
        >
          <div class="vx-row">
            <div class="vx-col sm:w-full md:w-full  mx-auto self-center  d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">
                    Reset Password
                  </h4>
                  <p>Please enter your new password.</p>
                </div>
                <vs-input
                  v-model="email"
                  v-validate="'required|email'"
                  data-vv-validate-on="blur"
                  type="email"
                  label-placeholder="Email"
                  name="email"
                  class="w-full mb-6"
                />
                <vs-input
                  ref="password"
                  v-model="password"
                  v-validate="'required|min:6'"
                  type="password"
                  data-vv-validate-on="blur"
                  name="Password"
                  label-placeholder="Password"
                  placeholder="Password"
                  class="w-full"
                />
                <vs-input
                  v-model="passwordConfirmation"
                  v-validate="'min:6|confirmed:password'"
                  type="password"
                  data-vv-validate-on="blur"
                  data-vv-as="password"
                  name="Confirm Password"
                  label-placeholder="Confirm Password"
                  placeholder="Confirm Password"
                  class="w-full"
                />
                <br>
                <span
                  v-for="errors in errors.items "
                  :key="errors.id"
                >
                  <vs-alert
                    color="danger"
                    icon="new_releases"
                    active="true"
                    class="mb-1"
                  >
                    {{ errors.msg }}
                  </vs-alert>
                </span>
                <br>
                <vs-button
                  type="border"
                  to="/login"
                  class="w-full sm:w-auto mb-8 sm:mb-auto mt-3 sm:mt-auto"
                >
                  Go Back To Login
                </vs-button>
                <vs-button
                  :disabled="!validateForm"
                  class="float-right w-full sm:w-auto"
                  @click="resetAccountPassword()"
                >
                  Reset
                </vs-button>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ForgotPasswordModule } from '@/store/modules/forgotPasswordModule'
import router from '../../router'

  @Component({
    name: 'ResetPassword',
    components: {}
  })

export default class extends Vue {
    @Prop() private token!: string

    // * Data
    private email: string = 'asdasda22233@ca.com'
    private password: string = '123123123123123'
    private passwordConfirmation: string = '123123123123123'

    // *Functions
    private async resetAccountPassword () {
      this.$vs.loading({
        text: 'Sending data to the server!..'
      })
      const response = await ForgotPasswordModule.resetPasswordByLink({
        email: this.email,
        token: this.token,
        password: this.password
      })
      // Close animation if passed as payload
      this.$vs.loading.close()

      if (response.error) {
        this.$vs.notify({
          title: 'Error',
          text: response.error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      } else {
        this.$vs.notify({
          title: 'Okay',
          text: 'Your password has been updated!',
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        })
        this.email = ''
        this.password = ''
        this.passwordConfirmation = ''
        // Navigate User to homepage
        // @ts-ignore
        await router.push(router.currentRoute.query.to || '/')
        console.log('no error')
      }
    }

    // *Getter
    get validateForm () {
      // @ts-ignore
      return !this.errors.any() && this.email !== '' &&
        this.password !== '' && this.passwordConfirmation !== '' &&
        this.password === this.passwordConfirmation
    }
}
</script>
