<template>
  <div class="profile-setting">
    <vs-tabs
      :key="isSmallerScreen"
      :position="isSmallerScreen ? 'top' : 'left'"
      class="tabs-shadow-none"
      color="secondary"
    >
      <!-- GENERAL -->
      <vs-tab
        icon-pack="feather"
        icon="icon-user text-xl"
        :label="!isSmallerScreen ? 'Profile' : ''"
      >
        <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsGeneral />
        </div>
      </vs-tab>
      <vs-tab
        icon-pack="feather"
        icon="icon-lock text-xl"
        :label="!isSmallerScreen ? 'Password' : ''"
      >
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsChangePassword />
        </div>
      </vs-tab>
      <!-- <vs-tab
        icon-pack="feather"
        icon="icon-info text-xl"
        :label="!isSmallerScreen ? 'Info' : ''"
      >
        <div class="tab-info md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsInfo />
        </div>
      </vs-tab> -->
      <vs-tab
        icon-pack="feather"
        icon="icon-shield text-xl"
        :label="!isSmallerScreen ? 'Privacy' : ''"
      >
        <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsSecurity />
        </div>
      </vs-tab>

      <vs-tab
        icon-pack="feather"
        icon="icon-at-sign text-xl"
        :label="!isSmallerScreen ? 'Social Links' : ''"
      >
        <div class="tab-social-links md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsSocialLinks />
        </div>
      </vs-tab>
      <vs-tab
        icon-pack="feather"
        icon="icon-credit-card text-xl"
        :label="!isSmallerScreen ? 'Payment Method' : ''"
      >
        <div class="tab-social-links md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsPaymentMethod />
        </div>
      </vs-tab>
      <!-- <vs-tab
        icon-pack="feather"
        icon="icon-link-2 text-xl"
        :label="!isSmallerScreen ? 'Connections' : ''"
      >
        <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsConnections />
        </div>
      </vs-tab> -->
      <vs-tab
        icon-pack="feather"
        icon="icon-bell text-xl"
        :label="!isSmallerScreen ? 'Notifications' : ''"
      >
        <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
          <UserSettingsNotifications />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

import { AppModule } from '@/store/modules/appModule'
import UserSettingsGeneral from '@/views/account/settings/UserSettingsGeneral.vue'
import UserSettingsChangePassword from '@/views/account/settings/UserSettingsChangePassword.vue'
import UserSettingsInfo from '@/views/account/settings/UserSettingsInfo.vue'
import UserSettingsSocialLinks from '@/views/account/settings/UserSettingsSocialLinks.vue'
import UserSettingsNotifications from '@/views/account/settings/UserSettingsNotifications.vue'
import UserSettingsConnections from '@/views/account/settings/UserSettingsConnections.vue'
import UserSettingsSecurity from '@/views/account/settings/UserSettingsPrivacy.vue'
import UserSettingsPaymentMethod from '@/views/account/settings/UserSettingsPaymentMethod.vue'

  @Component({
    name: 'UserSettings',
    components: {
      UserSettingsGeneral,
      UserSettingsChangePassword,
      UserSettingsInfo,
      UserSettingsSocialLinks,
      UserSettingsConnections,
      UserSettingsNotifications,
      UserSettingsSecurity,
      UserSettingsPaymentMethod
    }
  })
export default class UserSettings extends Vue {
  get isSmallerScreen () {
    return AppModule.windowWidth < 768
  }

  get activeUserInfo () {
    return AppModule.activeUser
  }
}

</script>

<style lang="scss">
</style>
