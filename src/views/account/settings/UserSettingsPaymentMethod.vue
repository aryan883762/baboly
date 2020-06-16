<template>
  <vx-card
    no-shadow
    class="profile-page-cards"
  >
    <h2 class="title">
      Payment Method
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
    name: 'UserSettingsPaymentMethod.vue',
    components: {}
  })
export default class UserSettingsPaymentMethod extends Vue {
    private activeUser: User = AppModule.activeUser
}
</script>
