<template>
  <div class="relative">
    <div class="vx-navbar-wrapper navbar-full p-0">
      <vs-navbar
        class="navbar-custom navbar-skelton"
        :class="navbarClasses"
        :style="navbarStyle"
        :color="navbarColor"
      >
        <!--                        <Bookmarks-->
        <!--                          v-if="windowWidth >= 992"-->
        <!--                          :navbar-color="navbarColor"-->
        <!--                        />-->
        <div
          v-if="windowWidth >= 992"
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

        <MenuItems />

        <SearchBar />
        <template v-if="activeUserInfo">
          <NotificationDropDown v-if="activeUserInfo.name" />
          <ProfileDropDown v-if="activeUserInfo.name" />
        </template>
        <template v-else>
          <Public />
        </template>
      </vs-navbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Bookmarks from './components/Bookmarks.vue'
import MenuItems from './components/MenuItems.vue'
import SearchBar from './components/SearchBar.vue'
import NotificationDropDown from './components/NotificationDropDown.vue'
import ProfileDropDown from './components/ProfileDropDown.vue'
import Logo from '../Logo.vue'

import { AppModule } from '@/store/modules/appModule'
import { ActiveUserModule } from '@/store/modules/activeUserModule'
import Public from './components/Public.vue'

  @Component({
    name: 'TheNavbarHorizontal',
    components: {
      Public,
      Logo,
      MenuItems,
      Bookmarks,
      SearchBar,
      NotificationDropDown,
      ProfileDropDown
    }
  })
export default class TheNavbarHorizontal extends Vue {
    @Prop() private logo!: string;
    @Prop() private navbarType!: string;

    get activeUserInfo () {
      return ActiveUserModule.activeUserInfo
    }

    get navbarColor () {
      let color = '#fff'
      if (this.navbarType === 'sticky') color = '#f7f7f7'
      else if (this.navbarType === 'static') {
        if (this.scrollY < 50) {
          color = '#f7f7f7'
        }
      }

      // this.isThemedark === 'dark' ? color === '#fff' ? color = '#10163a' : color = '#262c49' : null

      return color
    }

    get appsName () {
      return AppModule.appName
    }

    get isThemedark () {
      return AppModule.theme
    }

    get navbarStyle () {
      return this.navbarType === 'static' ? { transition: 'all .25s ease-in-out' } : {}
    }

    get navbarClasses () {
      return this.scrollY > 5 && this.navbarType === 'static' ? null : 'd-theme-dark-light-bg'
    }

    get scrollY () {
      return AppModule.scrollY
    }

    get verticalNavMenuWidth () {
      return AppModule.verticalNavMenuWidth
    }

    get windowWidth () {
      return AppModule.windowWidth
    }
}

</script>
