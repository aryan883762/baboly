<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Event Notifications
    </p>
    <vs-divider />CreateEventNotifications
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'

  @Component({
    name: 'CreateEventNotifications',
    components: {}
  })
export default class CreateEventNotifications extends Vue {
    @Prop() private event!: Event
}

</script>

<style scoped>

</style>
