<template>
  <vx-card
    no-shadow
    class="profile-page-cards"
  >
    <h2 class="title">
      Notification settings
    </h2>
    <vs-divider />
    <div class="profile-content">
      <!-- Save & Reset Button -->
      <div class="absolute right-0 bottom-0 w-full text-right p-10">
        <vs-button
          class="ml-auto mt-2"
          color="secondary"
        >
          Save Changes
        </vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/appModule'
import { User } from '@/models/User'

  @Component({
    name: 'UserSettingsNotifications',
    components: {}
  })
export default class UserSettingsNotifications extends Vue {
    private activeUser: User = AppModule.activeUser
    private comment:string=''
    private follow:string=''
    private answer:string=''
}
</script>
