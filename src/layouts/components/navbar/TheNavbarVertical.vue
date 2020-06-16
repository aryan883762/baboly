<template>
  <div class="relative">
    <div
      class="vx-navbar-wrapper"
      :class="classObj"
    >
      <vs-navbar
        class="vx-navbar navbar-custom navbar-skelton"
        :color="navbarColorLocal"
        :class="textColor"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->

        <div
          v-if="layoutType !== 'vertical'"
          class="navbar-bookmarks flex items-center"
        >
          <router-link
            tag="div"
            to="/"
            class="vx-logo cursor-pointer flex"
          >
            <Logo class="w-10 mr-4 fill-current text-primary" />
            <span class="vx-logo-text text-primary">{{ appsName }}</span>
          </router-link>
        </div>
        <feather-icon
          v-if="windowWidth < 992"
          class="sm:inline-flex xl:hidden cursor-pointer p-2"
          icon="MenuIcon"
          @click.stop="showSidebar"
        />

        <!--                        <Bookmarks-->
        <!--                          v-if="windowWidth >= 992"-->
        <!--                          :navbar-color="navbarColor"-->
        <!--                        />-->

        <vs-spacer />

        <SearchBar />

        <NotificationDropDown />

        <ProfileDropDown />
      </vs-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Bookmarks from './components/Bookmarks.vue'
import SearchBar from './components/SearchBar.vue'
import Logo from './../../../layouts/components/Logo.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'
import { AppModule } from '@/store/modules/appModule'

  @Component({
    name: 'TheNavbarVertical',
    components: {
      Bookmarks,
      SearchBar,
      Logo,
      NotificationDropDown,
      ProfileDropDown
    }
  })
export default class extends Vue {
    @Prop() private navbarColor!: string;

    get appsName () {
      return AppModule.appName
    }

    get layoutType () {
      return AppModule.mainLayoutType
    }

    get navbarColorLocal () {
      return AppModule.theme === 'dark' && this.navbarColor === '#fff' ? '#10163a' : this.navbarColor
    }

    get verticalNavMenuWidth () {
      return AppModule.verticalNavMenuWidth
    }

    get textColor () {
      return { 'text-white': (this.navbarColor !== '#10163a' && AppModule.theme === 'dark') || (this.navbarColor !== '#fff' && AppModule.theme !== 'dark') }
    }

    get windowWidth () {
      return AppModule.windowWidth
    }

    // NAVBAR STYLE
    get classObj () {
      if (this.verticalNavMenuWidth === 'reduced') return 'navbar-reduced'
      else if (this.verticalNavMenuWidth) return 'navbar-full'
      return 'navbar-default'
    }

    private showSidebar () {
      AppModule.TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE(true)
    }
}
</script>
