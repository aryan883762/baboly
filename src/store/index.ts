import Vue from 'vue'
import Vuex from 'vuex'
import { IAppState } from '@/store/modules/appModule'
import { IActiveUserState } from '@/store/modules/activeUserModule'
import { IAuthState } from '@/store/modules/authModule'
import { IEventCategoryState } from '@/store/modules/eventCategoryModule'

Vue.use(Vuex)

export interface IRootState {
  app: IAppState
  user: IActiveUserState
  auth: IAuthState
  eventCategories : IEventCategoryState
  // tagsView: ITagsViewState
  // errorLog: IErrorLogState
  // permission: IPermissionState
  // settings: ISettingsState
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
