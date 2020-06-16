<template>
  <vx-card
    no-shadow
    class="profile-page-cards"
  >
    <h2 class="title">
      Account Privacy
    </h2>
    <vs-divider />
    <div class="profile-content" />
  </vx-card>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/appModule'
import { User } from '@/models/User'

  @Component({
    name: 'UserSettingsPrivacy.vue',
    components: {}
  })
export default class UserSettingsSecurity extends Vue {
    private activeUser: User = AppModule.activeUser
}
</script>
