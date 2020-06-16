<template>
  <vx-card
    no-shadow
    class="profile-page-cards"
  >
    <h2 class="title">
      Social Links
    </h2>
    <vs-divider />
    <div class="profile-content">
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="facebook"
            class="w-full"
            icon-pack="feather"
            icon="icon-facebook"
            label="Facebook"
            icon-no-border
          />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="instagram"
            class="w-full"
            icon-pack="feather"
            icon="icon-instagram"
            label="Instagram"
            icon-no-border
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="twitter"
            class="w-full"
            icon-pack="feather"
            icon="icon-twitter"
            label="Twitter"
            icon-no-border
          />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="linkedin"
            class="w-full"
            icon-pack="feather"
            icon="icon-linkedin"
            label="Linkedin"
            icon-no-border
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

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/appModule'
import { User } from '@/models/User'

  @Component({
    name: 'UserSettingsSocialLinks',
    components: {}
  })
export default class UserSettingsSocialLinks extends Vue {
    private activeUser: User = AppModule.activeUser
    private twitter:string = ''
    private facebook: string = ''
    private instagram: string = ''
    private linkedin:string = ''
}
</script>
