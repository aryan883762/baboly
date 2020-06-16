import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'email' })
class Email extends VuexModule {

}

export const EmailModule = getModule(Email)
