<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Invite Your friends, family and customers
    </p>
    <vs-divider />
    CreateEventInvitations
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'

  @Component({
    name: 'CreateEventInvitations',
    components: {}
  })
export default class CreateEventInvitations extends Vue {
    @Prop() private event!: Event
}

</script>

<style scoped>

</style>
