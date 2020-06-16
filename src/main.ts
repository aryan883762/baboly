import Vue from 'vue'
// @ts-ignore
import App from '@/App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' // Material Icons
import 'vuesax/dist/vuesax.css'

// axios
import axios from './axios.js'

// Firebase
import '@/firebase/firebaseConfig'

// ACL
import acl from '@/acl/acl'

// Globally Registered Components
import '@/globalComponents.ts'

// Styles: SCSS
import '@/assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'

// Vue Router
import router from '@/router'

// Vuex Store
import store from '@/store'

// i18n
// import i18n from './i18n/i18n'

// Vuexy Admin Filters
import '@/filters/filters'

// Clipboard
import VueClipboard from 'vue-clipboard2'

// Tour
import VueTour from 'vue-tour'

// VeeValidate
import VeeValidate, { Validator } from 'vee-validate'

// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'

// Vuejs - Vue wrapper for hammerjs
// @ts-ignore
import { VueHammer } from 'vue2-hammer/index.min'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Vue select css
// Note: In latest version you have to add it separately
import 'vue-select/dist/vue-select.css'

// Feather font icon
import '@/assets/css/iconfont.css'

// moment
import moment from 'moment'
import VueMoment from 'vue-moment'

// * ICONS FOR ANDROID IOS NATIVE
import SvgIcon from 'vue-svgicon'

// Default tag name is 'svgicon'
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

// Only for Develop config.
Vue.use(VueGoogleMaps, {
  load: {
    // Add your API key here
    key: 'AIzaSyBFZwbqmuI2pKMMud3RokSuGT4pMJff0xo',
    libraries: 'places' // This is required if you use the Auto complete plug-in
  }
})

// TODO Load Locales ('en' comes loaded by default)
// require('moment/locale/es');

// TODO Choose Locale
// moment.locale('es');

Vue.use(VueMoment, { moment })
Vue.use(VeeValidate)
Vue.use(VueHammer)
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#1EA79D',
      secondary: '#9C27B0',
      accent: '#9C27B0',
      info: '#24a0ed',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
      warning: 'rgb(255, 130, 0)',
      dark: 'rgb(36, 33, 69)'
    }
  }
}) // Vuesax

// Vue.prototype.$http = axios
// Vue.use(AuthPlugin)
Vue.use(VueClipboard)
// Vue.use(VueTour)
// require('vue-tour/dist/vue-tour.css')
Vue.use(VeeValidate)
// Vue.use(VueGoogleMaps, {
//   load: {
//     // Add your API key here
//     key: 'YOUR_KEY',
//     libraries: 'places' // This is required if you use the Auto complete plug-in
//   }
// })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // @ts-ignore
  acl,
  render: h => h(App)
}).$mount('#app')
