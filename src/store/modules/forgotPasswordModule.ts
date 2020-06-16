import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import { resetPassword, sendResetPasswordLink } from '@/api/users'
import store from '@/store'
// @ts-ignore
import { ResetPasswordByLinkParams } from '@/models/Auth'

@Module({ dynamic: true, store, name: 'forgotpassword' })
class ForgotPassword extends VuexModule {
  // @ts-ignore
  @Action({ rawError: true })
  public async sendResetPasswordLink (email: string) {
    try {
      const response = await sendResetPasswordLink({ email })
      if (response && response.data) {
        return response.data
      }
    } catch (e) {
      return e
    }
  }

  // @ts-ignore
  @Action({ rawError: true })
  public async resetPasswordByLink (data: ResetPasswordByLinkParams) {
    try {
      const response = await resetPassword(data)
      if (response && response.data) {
        return response.data
      }
    } catch (e) {
      // Error 😨
      if (e.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
        console.log(e.response.data)
        console.log(e.response.status)
        console.log(e.response.headers)
      } else if (e.request) {
      /*
       * The request was made but no response was received, `e.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
        console.log(e.request)
      } else {
      // Something happened in setting up the request and triggered an e
      //  console.log('e', e.message)
      }
      // console.log(e)
      return e
    }
  }
}

export const ForgotPasswordModule = getModule(ForgotPassword)
