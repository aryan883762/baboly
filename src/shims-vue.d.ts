import Vue from 'vue'
import { Route, VueRouter } from 'vue-router/types/router'
import Vuesax from 'vuesax'

declare module '*.vue' {
   export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
    // @ts-ignore
    $vs: Vuesax; // vuesax custom plugin
  }
}
