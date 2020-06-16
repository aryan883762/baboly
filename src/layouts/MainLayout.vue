<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      {'no-scroll': isAppPage}
    ]"
  >
    <VNavMenu
      v-if="windowWidth < 992"
      :nav-menu-items="navMenuItems"
      :title="appName"
      parent=".layout--main"
    />
    <div
      id="content-area"
      :class="[contentAreaClass, {'show-overlay': bodyOverlay}]"
    >
      <div id="content-overlay" />

      <!-- Navbar -->
      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
        <TheNavbarHorizontal
          :navbar-type="navbarType"
          :class="[
            {'text-white': isNavbarDark && !isThemeDark},
            {'text-base': !isNavbarDark && isThemeDark}
          ]"
        />

        <div
          v-if="navbarType === 'static'"
          style="height: 162px"
        />
        <!--        // TODO Use it as the filter area-->
        <!--                <HNavMenu-->
        <!--                  :class="[-->
        <!--                    {'text-white': isNavbarDark && !isThemeDark},-->
        <!--                    {'text-base': !isNavbarDark && isThemeDark}-->
        <!--                  ]"-->
        <!--                  :nav-menu-items="navMenuItems"-->
        <!--                />-->
      </template>

      <template v-else>
        <TheNavbarVertical
          :navbar-color="navbarColor"
          :class="[
            {'text-white': isNavbarDark && !isThemeDark},
            {'text-base': !isNavbarDark && isThemeDark}
          ]"
        />
      </template>
      <!-- /Navbar -->

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6"
              >
                <div
                  class="content-area__heading"
                  :class="{
                    'pr-4 border-0 md:border-r border-solid border-grey-light':
                      $route.meta.breadcrumb
                  }"
                >
                  <h2 class="mb-1">
                    {{ routeTitle }}
                  </h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  v-if="$route.meta.breadcrumb"
                  class="ml-4 md:block hidden"
                  :route="$route"
                  :is-r-t-l="$vs.rtl"
                />

                <!-- DROPDOWN -->
                <vs-dropdown
                  vs-trigger-click
                  class="ml-auto md:block hidden cursor-pointer"
                >
                  <vs-button
                    radius
                    icon="icon-settings"
                    icon-pack="feather"
                  />

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/pages/profile').catch(() => {})"
                      >
                        <feather-icon
                          icon="UserIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4"
                        />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/apps/todo').catch(() => {})"
                      >
                        <feather-icon
                          icon="CheckSquareIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4"
                        />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        class="flex items-center"
                        @click="$router.push('/apps/email').catch(() => {})"
                      >
                        <feather-icon
                          icon="MailIcon"
                          class="inline-block mr-2"
                          svg-classes="w-4 h-4"
                        />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </transition>

            <div class="content-area__content">
              <BackToTop
                v-if="!hideScrollToTop"
                bottom="5%"
                :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'"
                visibleoffset="500"
              >
                <vs-button
                  icon-pack="feather"
                  icon="icon-arrow-up"
                  class="shadow-lg btn-back-to-top"
                  color="secondary"
                />
              </BackToTop>

              <transition
                :name="routerTransition"
                mode="out-in"
              >
                <router-view
                  @changeRouteTitle="changeRouteTitle"
                  @setAppClasses="
                    classesStr => $emit('setAppClasses', classesStr)
                  "
                />
              </transition>
            </div>
          </div>
        </div>
      </div>

      <TheFooter />
    </div>
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import TheNavbarHorizontal from '@/layouts/components/navbar/TheNavbarHorizontal.vue'
import TheNavbarVertical from '@/layouts/components/navbar/TheNavbarVertical.vue'
import TheFooter from '@/layouts/components/TheFooter.vue'
import VNavMenu from '@/layouts/components/vertical-nav-menu/VerticalNavMenu.vue'
import { AppModule } from '../store/modules/appModule'
import { defaultThemeConfigs } from '@/models/Theme'
import { ActiveUserModule } from '../store/modules/activeUserModule'

export default {
  components: {
    BackToTop,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu
  },
  data () {
    return {
      footerType: defaultThemeConfigs.footerType || 'static',
      hideScrollToTop: defaultThemeConfigs.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: defaultThemeConfigs.navbarColor || '#fff',
      navbarType: defaultThemeConfigs.navbarType || 'floating',
      navMenuItems: AppModule.navMenuItems,
      routerTransition: defaultThemeConfigs.routerTransition || 'none',
      routeTitle: this.$route.meta.pageTitle
    }
  },
  computed: {
    activeUserInfo () {
      return ActiveUserModule.activeUserInfo
    },
    bodyOverlay () {
      return AppModule.bodyOverlay
    },
    contentAreaClass () {
      if (this.mainLayoutType !== 'vertical') {
        return 'content-area-full'
      }
      if (this.verticalNavMenuWidth === 'default') {
        return 'content-area-reduced'
      } else if (this.verticalNavMenuWidth === 'reduced') {
        return 'content-area-lg'
      } else {
        return 'content-area-full'
      }

      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
    },
    footerClasses () {
      return {
        'footer-hidden': this.footerType === 'hidden',
        'footer-sticky': this.footerType === 'sticky',
        'footer-static': this.footerType === 'static'
      }
    },
    appName () {
      return AppModule.appName
    },
    isAppPage () {
      return this.$route.meta.no_scroll
    },
    isThemeDark () {
      return AppModule.theme === 'dark'
    },
    layoutTypeClass () {
      return `main-${this.mainLayoutType}`
    },
    mainLayoutType () {
      return AppModule.mainLayoutType
    },
    navbarClasses () {
      return {
        'navbar-hidden': this.navbarType === 'hidden',
        'navbar-sticky': this.navbarType === 'sticky',
        'navbar-static': this.navbarType === 'static',
        'navbar-floating': this.navbarType === 'floating'
      }
    },
    verticalNavMenuWidth () {
      return AppModule.verticalNavMenuWidth
    },
    windowWidth () {
      return AppModule.windowWidth
    }
  },
  watch: {
    $route () {
      this.routeTitle = this.$route.meta.pageTitle
    },
    isThemeDark (val) {
      const color = this.navbarColor === '#fff' && val ? '#10163a' : '#fff'
      this.updateNavbarColor(color)
    },
    mainLayoutType (val) {
      this.setNavMenuVisibility(val)
    },
    activeUserInfo () {
      console.log('activeUserInfo', this.activeUserInfo)
    }

  },
  beforeMount () {
    AppModule.UPDATE_MAIN_LAYOUT_TYPE('horizontal')
    console.log(this.navbarType)
  },
  created () {
    const color =
        this.navbarColor === '#fff' && this.isThemeDark
          ? '#10163a'
          : this.navbarColor
    this.updateNavbarColor(color)
    this.setNavMenuVisibility(AppModule.mainLayoutType)
  },
  methods: {
    changeRouteTitle (title) {
      this.routeTitle = title
    },
    updateNavbarColor (val) {
      this.navbarColor = val
      if (val === '#fff') {
        this.isNavbarDark = false
      } else {
        this.isNavbarDark = true
      }
    },
    setNavMenuVisibility (layoutType) {
      if (
        (layoutType === 'horizontal' && this.windowWidth >= 1200) ||
          (layoutType === 'vertical' && this.windowWidth < 1200)
      ) {
        AppModule.TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(false)
        AppModule.updateVerticalNavMenuWidth('no-nav-menu')
      } else {
        AppModule.TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(true)
      }
    }
  }
}
</script>
