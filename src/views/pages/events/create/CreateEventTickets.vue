<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Guest Registration Settings
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <vs-radio
        v-model="ticketType"
        vs-value="1"
        class="mb-8 w-full lg:w-1/2"
      >
        Paid or Free Ticket
        <p class="mt-1 text-xs">
          The Guests must register and get ticket to attend at your event
        </p>
      </vs-radio>
      <vs-radio
        v-model="ticketType"
        vs-value="3"
        class="mb-8 w-full lg:w-1/2"
      >
        External Ticket Link
        <p class="mt-1 text-xs">
          The event registration and/or tickets is on another website
        </p>
      </vs-radio>
      <vs-radio
        v-model="ticketType"
        vs-value="2"
        class="mb-8 w-full lg:w-1/2"
      >
        RSVP Only <p class="mt-1 text-xs">
          The Guests must register to attend at your event
        </p>
      </vs-radio>
      <vs-radio
        v-model="ticketType"
        vs-value="0"
        class="mb-8 w-full lg:w-1/2"
      >
        No RSVP nor Ticket needed
        <p class="mt-1 text-xs">
          Your event doesn't need any kind of registration or ticket.
        </p>
      </vs-radio>
    </vs-row>

    <br>
    <div
      v-if="ticketType >2 "
      class="vs-row mt-6"
    >
      <p class="text-lg font-medium">
        External Registration Settings
      </p>
      <vs-divider />

      <vs-input
        v-model="event.exTicketURl"
        v-validate="'required|url'"
        label="Ticket URL"
        class="w-full mt-4 mb-4"
        name="ticketurl"
      />
      <span class="text-danger">{{ errors.first('ticketurl') }}</span>
    </div>
    <div
      v-if="ticketType == 1"
      class="vs-row mt-6"
    >
      <p class="text-lg font-medium">
        Create Tickets Stubs
      </p>
      <vs-divider />
      <div class="vx-row no-gutter">
        <div class="vx-col w-full flex justify-center">
          <vs-button
            class="mr-3"
            color="secondary"
            type="filled"
            @click="toggleEditTicket(0, -1)"
          >
            Free Ticket
          </vs-button>
          <vs-button
            color="secondary"
            type="filled"
            @click="toggleEditTicket(1,-1)"
          >
            $ Paid Ticket
          </vs-button>
        </div>
      </div>

      <vs-table
        v-if="tickets.length > 0"
        class="mt-10"
        :data="tickets"
      >
        <template slot="thead">
          <vs-th class="w-1/2">
            Title
          </vs-th>
          <vs-th>Type</vs-th>
          <vs-th>Price</vs-th>
          <vs-th>Fee</vs-th>
          <vs-th />
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(ticket, index) in data"
            :key="index"
          >
            <vs-td>{{ ticket.title | truncate(50, ' ...') }}</vs-td>
            <vs-td>
              <span v-if="ticket.price > 0">Paid</span>
              <span v-else>Free</span>
            </vs-td>

            <vs-td>
              {{ ticket.price }}
            </vs-td>
            <vs-td>
              {{ ticket.fee }}
            </vs-td>
            <vs-td>
              <vs-button
                v-if="ticket.price > 0"
                color="secondary"
                type="filled"
                icon-pack="feather"
                icon="icon-edit"
                @click="toggleEditTicket(1, index)"
              />
              <vs-button
                v-else
                color="secondary"
                type="filled"
                icon-pack="feather"
                icon="icon-edit"
                @click="toggleEditTicket(0, index)"
              />
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>

      <EditTicketModal
        ref="editTicketModal"
        :tickets="tickets"
        @updateTickets="updateTickets"
      />
    </div>

    <div v-if="ticketType == 2">
      <p class="text-lg font-medium">
        Add your Questions if your want the guests answer the questions before RSVP
      </p>
      <vs-divider />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Event } from '@/models/Event'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import EditTicketModal from '@/views/pages/events/create/EditTicketModal.vue'
import { Ticket, TicketTypeMap, ticketTypesMap } from '@/models/Ticket'

  @Component({
    name: 'CreateEventTickets',
    components: {
      VuePerfectScrollbar,
      EditTicketModal
      // TimeSelector
    }
  })
export default class CreateEventTickets extends Vue {
    @Prop() private event!: Event
    private tickets: Ticket[] = []
    private ticketType: number = 0
    private ticketTypes: TicketTypeMap = ticketTypesMap

    private toggleEditTicket (type: number, index: number) {
      const editTicketModal = this.$refs.editTicketModal as EditTicketModal
      editTicketModal.toggleModal(type, index)
    }

    private updateTickets (tickets: Ticket[]) {
      this.tickets = tickets
      console.log(tickets)
    }
}

</script>

<style scoped>

</style>
