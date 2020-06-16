<template>
  <!-- compose ticket -->
  <vs-prompt
    class="create-ticket"
    title="New Free Ticket"
    accept-text="Save Ticket"
    :is-valid="validateForm"
    :active.sync="promotModal"
    @cancel="clearTicketPromptFields"
    @accept="saveTicket"
    @close="clearTicketPromptFields"
  >
    <component
      :is="scrollbarTag"
      :key="$vs.rtl"
      class="scroll-area p-4"
      :settings="settings"
    >
      <form @submit.prevent>
        <div class="vs-row mb-6">
          <vs-input
            v-model="newTicket.title"
            v-validate="'required|min:3|max:100'"
            name="title"
            label-placeholder="Ticket Title"
            class="w-full mb-0"
            :danger="newTicket.title === ''"
            val-icon-danger="clear"
          />
          <span
            v-show="errors.has('title')"
            class="text-danger text-sm"
          >{{ errors.first('title') }}</span>
        </div>
        <div class="vs-row mb-6">
          <vs-textarea
            v-model="newTicket.description"
            label="Short Description about the ticket"
            rows="3"
            counter="160"
            class="w-full"
            icon-pack="feather"
            icon="icon-info"
            name="description"
          />
        </div>
        <div class="flex flex-wrap justify-between items-center h-24 ">
          <p class="text-lg font-medium">
            Ticket Quantity
          </p>
          <div class="mr-5 w-1/3">
            <vs-input
              v-model="newTicket.quantity"
              :danger="newTicket.quantity < 1 "
              name="quantity"
            />
            <span
              v-show="newTicket.quantity < 1"
              class="text-danger text-sm"
            >Quantity is required</span>
          </div>
        </div>
        <div v-if="ticketType > 0">
          <div class="mb-5">
            <p class="text-lg font-medium mb-2">
              Ticket Fees Settings
            </p>

            <ul class="centerx ml-4 text-sm">
              <li>
                <vs-radio
                  v-model="newTicket.feeAbsorbed"
                  vs-value="0"
                >
                  Customer pays the fee <span class="text-xs">You will get paid the ticket price</span>
                </vs-radio>
              </li>
              <li>
                <vs-radio
                  v-model="newTicket.feeAbsorbed"
                  vs-value="1"
                >
                  Absorb fee <span class="text-xs">You will get paid the ticket price minus the fees</span>
                </vs-radio>
              </li>
            </ul>
          </div>
          <div class="flex flex-wrap justify-between items-center mb-2">
            <p class="text-lg font-medium">
              Ticket Sales Price
            </p>
            <div class="mr-5 w-1/3">
              <vs-input
                v-model="newTicket.price"
                v-validate="'required'"
                name="price"
                :danger="! newTicket.price > 0 || newTicket.price > 100000"
                val-icon-danger="clear"
                icon-pack="feather"
                icon="icon-dollar-sign"
                class="inputx"
              />
              <span
                v-show="+newTicket.price === 0"
                class="text-danger text-sm"
              >Price is required</span>
            </div>
          </div>
          <div class="flex flex-wrap justify-between items-center mb-base">
            <div class="ml-5">
              <span
                v-if="newTicket.fee > 0"
                class="text-gray text-sm"
              >Fee: ${{ newTicket.fee }}</span><br>
              <span
                v-if="newTicket.fee > 0"
                class="text-gray text-sm"
              >Sales Price: ${{ newTicket.price }}</span><br>
              <span
                v-if="newTicket.salesPrice > 0 && newTicket.feeAbsorbed > 0 "
                class="text-gray text-sm"
              >Customer pays: ${{ newTicket.price }}</span>
              <span
                v-if="newTicket.salesPrice > 0 && newTicket.feeAbsorbed < 1 "
                class="text-gray text-sm"
              >Customer pays: ${{ newTicket.salesPrice }}</span>
            </div>
          </div>
        </div>
      </form>
    </component>
  </vs-prompt>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/appModule'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { emptyTicket, Ticket } from '@/models/Ticket'
import { Event } from '@/models/Event'

  @Component({
    name: 'EditTicketModal',
    components: {
      VuePerfectScrollbar
      // TimeSelector
    }
  })
export default class EditTicketModal extends Vue {
    @Prop() private tickets!: Ticket[]
    private ticketType: number = 0
    private ticketIndex: number = -1
    private promotModal = false
    private settings: any = {
      maxScrollbarLength: 160,
      wheelSpeed: 0.30
    }
    private newTicket: Ticket = emptyTicket()

    public toggleModal (type: number, index: number) {
      this.promotModal = !this.promotModal
      this.ticketType = type
      this.ticketIndex = index
      this.newTicket = index < 0 ? emptyTicket() : this.tickets[index]
    }

    private clearTicketPromptFields () {
      this.promotModal = false
      this.ticketType = -1
      this.ticketIndex = -1
      this.newTicket = emptyTicket()
    }

    private saveTicket () {
      console.log('saveTicket', this.newTicket)
      const thisTickets = JSON.parse(JSON.stringify(this.tickets))
      if (this.ticketIndex === -1) {
        thisTickets.push(this.newTicket)
      } else {
        thisTickets[this.ticketIndex] = this.newTicket
      }

      this.$emit('updateTickets', thisTickets)
    }

    get validateForm () {
      // @ts-ignore
      return !this.errors.any() && this.newTicket.title !== '' &&
        (this.ticketType < 1 || +this.newTicket.price > 0) &&
        +this.newTicket.quantity > 0
    }

    get scrollbarTag () {
      return AppModule.scrollbarTag
    }

    private addFees () {
      const price = +this.newTicket.price
      const fee = price === 0 ? 0 : this.getFees(price)
      if (this.newTicket.feeAbsorbed > 0) {
        this.newTicket.salesPrice = +price.toFixed(2)
      } else {
        this.newTicket.salesPrice = +(price + fee).toFixed(2)
      }
      this.newTicket.fee = +fee.toFixed(2)
    }

    private getFees (price = 0) {
      return this.calculatePaymentGetawayFee(price) + this.calculateServiceFee(price)
    }

    private calculateServiceFee (price = 0) {
      const ticketServiceCharge = AppModule.ticketServiceCharge
      return ticketServiceCharge.fix + price * ticketServiceCharge.variable
    }

    private calculatePaymentGetawayFee (price = 0) {
      const ticketPaymentGetawayFee = AppModule.ticketPaymentGetawayFee
      return ticketPaymentGetawayFee.fix + price * ticketPaymentGetawayFee.variable
    }

    @Watch('newTicket.price', { immediate: true })
    private priceChanged () {
      this.newTicket.price = +(10 * this.newTicket.price / 10).toString().replace(/[^0-9]/g, '')
      this.addFees()
    }

    @Watch('newTicket.quantity', { immediate: true })
    private quantityChanged () {
      this.newTicket.quantity = +(10 * this.newTicket.quantity / 10).toString().replace(/[^0-9]/g, '')
    }
}
</script>

<style scoped>

</style>
