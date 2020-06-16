<template>
  <div
    ref="createEvent"
    class="create-event-page container"
  >
    <h2 class="text-center">
      Create events
    </h2>
    <br>
    <CreateEventSelectCategory
      v-if="!event.category"
      @selectCategory="selectCategory"
    />

    <div v-if="event.category">
      <h5 class="text-center">
        Follow the steps to create your event.
      </h5>
      <br>
      <vs-tabs

        id="profile-tabs"
        :key="isSmallerScreen"
        color="secondary"
        :position="isSmallerScreen ? 'top' : 'left'"
      >
        <!-- GENERAL -->
        <vs-tab
          icon-pack="feather"
          icon="icon-calendar text-xl"
          :label="!isSmallerScreen ? 'General Info' : ''"
          class="bg-white ml-2"
        >
          <CreateEventGeneral
            :event="event"
          />
        </vs-tab>
        <vs-tab
          icon-pack="feather"
          icon="icon-settings text-xl"
          :label="!isSmallerScreen ? 'Privacy & Settings' : ''"
          class="bg-white ml-2"
        >
          <CreateEventSettings
            :event="event"
          />
        </vs-tab>
        <vs-tab
          icon-pack="feather"
          icon="icon-map-pin text-xl"
          :label="!isSmallerScreen ? 'Location' : ''"
          class="bg-white ml-2"
        >
          <CreateEventVenue :event="event" />
        </vs-tab>
        <vs-tab
          icon-pack="feather"
          icon="icon-tag  text-xl"
          :label="!isSmallerScreen ? 'RSVP & Ticket' : ''"
          class="bg-white ml-2"
        >
          <CreateEventTickets :event="event" />
        </vs-tab>
        <vs-tab
          icon-pack="feather"
          icon="icon-at-sign text-xl"
          :label="!isSmallerScreen ? 'Contact Info' : ''"
          class="bg-white ml-2"
        >
          <CreateEventContactInfo :event="event" />
        </vs-tab>
        <vs-tab
          icon-pack="feather"
          icon="icon-bell text-xl"
          :label="!isSmallerScreen ? 'Notifications' : ''"
          class="bg-white ml-2"
        >
          <CreateEventNotifications :event="event" />
        </vs-tab>
        <vs-tab
          icon-pack="feather"
          icon="icon-mail text-xl"
          :label="!isSmallerScreen ? 'Invitations' : ''"
          class="bg-white ml-2"
        >
          <CreateEventInvitations :event="event" />
        </vs-tab>
      </vs-tabs>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

import { Event, emptyEvent } from '@/models/Event'
import { EventModule } from '@/store/modules/eventModule'
import CreateEventSelectCategory from '@/views/pages/events/create/CreateEventSelectCategory.vue'
import CreateEventTickets from '@/views/pages/events/create/CreateEventTickets.vue'
import CreateEventVenue from '@/views/pages/events/create/CreateEventVenue.vue'
import CreateEventContactInfo from '@/views/pages/events/create/CreateEventContactInfo.vue'
import CreateEventInvitations from '@/views/pages/events/create/CreateEventInvitations.vue'
import CreateEventNotifications from '@/views/pages/events/create/CreateEventNotifications.vue'
import CreateEventGeneral from '@/views/pages/events/create/CreateEventGeneral.vue'
import { CategoryCard } from '@/models/Category'
import { AppModule } from '@/store/modules/appModule'
import CreateEventSettings from '@/views/pages/events/create/CreateEventSettings.vue'

  @Component({
    name: 'CreateEvent',
    components: {
      CreateEventSettings,
      CreateEventSelectCategory,
      CreateEventGeneral,
      CreateEventTickets,
      CreateEventVenue,
      CreateEventContactInfo,
      CreateEventInvitations,
      CreateEventNotifications

    }
  })

export default class CreateEvent extends Vue {
    private event: Event = emptyEvent

    get isSmallerScreen () {
      return AppModule.windowWidth < 768
    }

    private validateStep1 () {
      return new Promise((resolve, reject) => {
        var errorText = 'correct all values'
        this.$validator.validateAll('step-2').then(result => {
          if (result) {
            resolve(true)
            alert('Form submitted!')
          } else {
            reject(errorText)
          }
        })
      })
    }

    private selectCategory (card: CategoryCard) {
      this.event.category = {
        name: card.name,
        slug: card.slug
      }
    }

    private async createEvent () {
      let eventResponse = await EventModule.createEvent()
      return eventResponse
    }
}
</script>
<style lang="scss">
  .create-event-page {
    margin-top: -50px;
    .vs-tabs-position-left {
      .con-ul-tabs {
        background-color: #fff;
      }

      .vs-tabs--li {
        padding: 10px 25px;
        border-bottom: 1px solid #eee;
      }
    }
  }
</style>
