<template>
  <div class="flex flex-wrap">
    <vs-button
      color="primary"
      type="filled"
      to="/login"
    >
      Login
    </vs-button>

    <vs-button
      class="ml-2"
      color="secondary"
      type="filled"
      to="/register"
    >
      Sign up
    </vs-button>
  </div>
</template>

<script>
import { ActiveUserModule } from '@/store/modules/activeUserModule'

export default {
  name: 'Public',
  data () {
    return {}
  },
  computed: {
    activeUserInfo () {
      return ActiveUserModule.activeUserInfo
    }
  }
}
</script>

<style scoped>

</style>
