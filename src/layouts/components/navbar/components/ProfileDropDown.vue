<template>
  <div
    v-if="activeUserInfo"
    class="the-navbar__user-meta flex items-center"
  >
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">
        {{ activeUserInfo.name | truncate(15, '...') }}
      </p>
      <small>
        {{ activeUserInfo.userRole }}
      </small>
    </div>

    <vs-dropdown
      vs-custom-content
      vs-trigger-click
      class="cursor-pointer"
    >
      <div class="con-img ml-3">
        <vs-avatar
          size="large"
          :src="activeUserInfo.avatar"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/account/settings').catch(() => {})"
          >
            <feather-icon
              icon="UserIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Profile</span>
          </li>
          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/account/events').catch(() => {})"
          >
            <feather-icon
              icon="CalendarIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">My Events</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/email').catch(() => {})"
          >
            <feather-icon
              icon="MailIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Inbox</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/account/orders').catch(() => {})"
          >
            <feather-icon
              icon="CheckSquareIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Orders</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/apps/chat').catch(() => {})"
          >
            <feather-icon
              icon="MessageSquareIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Chat</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/account/wish-list').catch(() => {})"
          >
            <feather-icon
              icon="HeartIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Wish List</span>
          </li>

          <vs-divider class="m-1" />
          <li
            v-if="activeUserInfo.userRole === 'admin'"
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="$router.push('/admin').catch(() => {})"
          >
            <feather-icon
              icon="Settings"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Admin</span>
          </li>
          <vs-divider
            v-if="activeUserInfo.userRole === 'admin'"
            class="m-1"
          />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon
              icon="LogOutIcon"
              svg-classes="w-4 h-4"
            />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script lang='ts'>

import { Component, Watch, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'
import { ActiveUserModule } from '@/store/modules/activeUserModule'
import { AuthModule } from '@/store/modules/authModule'
import { Route } from 'vue-router'
import { User } from '@/models/User'

  @Component({
    name: 'ProfileDropDown',
    components: {}
  })

export default class ProfileDropDown extends Vue {
    private activeUserInfo: User | null = ActiveUserModule.activeUserInfo

    private logout () {
      // if user is logged in via firebase
      const firebaseCurrentUser = firebase.auth().currentUser

      // Change role on logout. Same value as initialRole of acj.js
      // @ts-ignore
      this.$acl.change('public')
      AuthModule.logout()

      if (firebaseCurrentUser) {
        firebase.auth().signOut().then(() => {
          this.$router.push('/').catch(() => {
          })
        })
      }

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/').catch(() => {
      })
    }
}

</script>
