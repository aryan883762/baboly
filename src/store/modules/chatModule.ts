import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ dynamic: true, store, name: 'chat' })
class Chat extends VuexModule {

}

export const ChatModule = getModule(Chat)
