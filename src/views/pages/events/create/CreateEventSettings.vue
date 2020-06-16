<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Location Settings
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <vs-radio
        v-model="isOnline"
        vs-value="0"
        class="mb-8 w-full"
      >
        Has Venue
        <p class="mt-1 text-xs">
          Event will take pale in a venue (address required)
        </p>
      </vs-radio>
      <vs-radio
        v-model="isOnline"
        vs-value="1"
        class="mb-8 w-full"
      >
        Online event
        <p class="mt-1 text-xs">
          Online events or webinars or courses (URL link required)
        </p>
      </vs-radio>
      <vs-radio
        v-model="isOnline"
        vs-value="-1"
        class="mb-8 w-full"
      >
        Has Venue with online broadcasting
        <p class="mt-1 text-xs">
          Event will take place in a venue and will be broadcast online too (Address and URL link required)
        </p>
      </vs-radio>
    </vs-row>

    <p class="text-lg font-medium">
      Privacy Settings
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <vs-radio
        v-model="isPublic"
        vs-value="1"
        class="mb-8 w-full"
      >
        Public Event
        <p class="mt-1 text-xs">
          Event will be available publicly on Babooly and searach engines
        </p>
      </vs-radio>
      <vs-radio
        v-model="isPublic"
        vs-value="0"
        class="mb-8 w-full"
      >
        Private Event
        <p class="mt-1 text-xs">
          Event will be available only for hosts and invitees
        </p>
      </vs-radio>
      <ul
        v-if="isPublic==='0'"
        class="ml-10"
      >
        <li class="mb-5">
          <vs-checkbox v-model="guestListIsVisible">
            Guest list is visible <span class="text-sm">(Guests can see other guests and attendee)</span>
          </vs-checkbox>
        </li>
        <li>
          <vs-checkbox v-model="canInvite">
            Guest can invite <span class="text-sm">(Guests can invite other friends and relatives)</span>
          </vs-checkbox>
        </li>
      </ul>
    </vs-row>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'

  @Component({
    name: 'CreateEventSettings',
    components: {}
  })
export default class CreateEventSettings extends Vue {
    @Prop() private event!: Event
    private ticketType: string = '0'
    private isPublic: string = '1'
    private isOnline: string = '0'
    private guestListIsVisible = 0
    private canInvite = 0
}

</script>

<style scoped>

</style>
