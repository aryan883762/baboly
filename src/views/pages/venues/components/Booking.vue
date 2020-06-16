<template>
  <div class="venue-booking w-full pb-12">
    <div class="flex px-10 pt-0">
      <div class="flex-1">
        <p
          class="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-secondary font-medium leading-9"
        >
          Request a Quote
        </p>
        <p class="text-sm font-bold">
          Buskers On The Ball Conference
        </p>
      </div>
    </div>
    <vs-divider/>
    <div class="px-10 pt-0" v-if="!isRequestSubmitted">
      <div class="flex-1 mt-5">
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-5">
            <vs-input
              label=" Name Your Event"
              placeholder="Event Name"
              class="w-full"
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-5">
            <vs-input
              label="Number of quests (Required)"
              placeholder="Number of attendees?"
              class="w-full"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full ml-2">
            <label class="text-sm">Event Type</label>
            <ul class="centerx flex mb-5 mt-3">
              <li class="mr-5">
                <vs-radio v-model="eventType" vs-value="Business">Business</vs-radio>
              </li>
              <li class="mr-5">
                <vs-radio v-model="eventType" vs-value="Social Event">Social Event</vs-radio>
              </li>
              <li class="mr-5">
                <vs-radio v-model="eventType" vs-value="Wedding">Wedding</vs-radio>
              </li>
              <li class="mr-5">
                <vs-radio v-model="eventType" vs-value="Other">Other</vs-radio>
              </li>
            </ul>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-5">
            <label class="text-sm ml-2">Event Date (Required)</label>
            <flat-pickr
              v-model="eventDate"
              :config="configDate"
              placeholder="Select a time"
              class="w-full"
            />
          </div>
          <div class="vx-col sm:w-1/2 w-full mb-5">
          <div class="flex sm:mt-6 md:mt-6 lg:mt-6 xl:mt-6">
            <label class="text-sm mr-3">Are your dates flexible?</label>
            <ul class="centerx flex">
              <li class="mr-5">
                <vs-radio v-model="isDateFlexible" vs-value="yes">Yes</vs-radio>
              </li>
              <li class="mr-5">
                <vs-radio v-model="isDateFlexible" vs-value="no">No</vs-radio>
              </li>
            </ul>
          </div>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/2 w-full mb-5">
            <vs-input
              label="Phone Number (Required)"
              placeholder="Phone Number"
              class="w-full"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-5">
            <label class="text-sm ml-2">Include any additional requests in the box below.</label>
            <vs-textarea placeholder="Add Your Additional information"/>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full mb-5">
              <vs-checkbox class="inline-flex" v-model="isSendRequest">Do you want to send the request to the similar venues?</vs-checkbox>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center mt-5">
        <vs-button
          type="filled"
          @click="isRequestSubmitted = !isRequestSubmitted"
        >
          Submit
        </vs-button>
      </div>
      <div class="flex items-center justify-center mt-10">
        <p class="text-xs">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
    <!-- After request submit -->
    <div class="px-6 py-8" v-if="isRequestSubmitted">
      <div class="flex-1 mt-5">
      <div class="img-container mb-4 text-center">
        <img
          src="@/assets/images/icons/congratulations.png"
          class="rounded"
        >
        <p class="text-2xl font-medium text-black mb-6 mt-8">Congratulations!</p>
        <span class="text-sm">Your request has been successfully sent.</span>
      </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
  @Component({
    name: 'Booking',
    components: {
      flatPickr
    }
  })
export default class extends Vue {
  private eventType: string = 'Business'
  private eventDate: string = null
  private isDateFlexible: string = 'yes'
  private isSendRequest: boolean = true
  private isRequestSubmitted:  boolean = false
  private configDate: any = {
          enableTime: true,
          dateFormat: 'd-m-Y H:i' }
}
</script>
