import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'
import { ActiveUserModule } from '@/store/modules/activeUserModule'

Vue.use(AclInstaller)

let initialRole = 'public'

let userInfo = ActiveUserModule.activeUserInfo
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole

export default new AclCreate({
  initial: initialRole,
  notfound: '/login',
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule('admin').generate(),
    editor: new AclRule('editor').or('admin').generate(),
    customer: new AclRule('customer').or('editor').or('admin').generate(),
    public: new AclRule('public').or('customer').or('admin').or('editor').generate()
  }
})
