<template>
  <vx-card
    no-shadow
    class="profile-page-cards"
  >
    <h2 class="title">
      Password
    </h2>
    <vs-divider />
    <div class="profile-content">
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="oldPassword"
            type="password"
            label="Current Password"
            placeholder="Your current password"
            class="w-full"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="newPassword"
            type="password"
            label="New Password"
            placeholder="Enter your new password"
            class="w-full"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="confirmNewPassword"
            type="password"
            label="Confirm Password"
            placeholder="Enter your new password again"
            class="w-full"
          />
        </div>
      </div>
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/appModule'
import { User } from '@/models/User'

  @Component({
    name: 'UserSettingsChangePassword',
    components: {}
  })
export default class UserSettingsChangePassword extends Vue {
    private activeUser: User = AppModule.activeUser
    private oldPassword: string = ''
    private newPassword: string = ''
    private confirmNewPassword: string = ''
}

</script>
