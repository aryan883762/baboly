<template>
  <vx-card
    no-shadow
    class="profile-page-cards"
  >
    <h2 class="title">
      General Information
    </h2>
    <vs-divider />
    <div class="profile-content">
      <!-- Img Row -->
      <div class="flex flex-wrap items-center mb-2">
        <vs-avatar
          :src="activeUser.avatar"
          size="60px"
          class="mr-4 mb-4"
        />
        <div>
          <vs-button
            color="secondary"
            class="mr-4 sm:mb-0 mb-2"
          >
            Upload photo
          </vs-button>
          <vs-button
            type="border"
            color="danger"
          >
            Remove
          </vs-button>
          <p class="text-sm mt-2">
            Allowed JPG, GIF or PNG. Max size of 800kB
          </p>
        </div>
      </div>

      <!-- Info -->
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="activeUser.name"
            label="First Name"
            placeholder="Enter first name"
            class="w-full"
          />
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            label="Last Name"
            placeholder="Enter last name"
            class="w-full"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            v-model="activeUser.email"
            v-validate="'required|email'"
            label="Email"
            placeholder="Your Email"
            name="email"
            class="w-full"
          />
          <span
            v-show="errors.has('email')"
            class="text-danger text-sm"
          >{{ errors.first('email') }}</span>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-input
            type="text"
            label="Phone Number"
            placeholder="Enter phone number"
            class="w-full"
          />
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select
            v-model="timeZone"
            label="Time Zone"
            class="w-full"
          >
            <vs-select-item
              v-for="(item,index) in timeZoneList"
              :key="index"
              :value="item.value"
              :text="item.text"
            />
          </vs-select>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select
            v-model="country"
            label="Country"
            class="w-full"
          >
            <vs-select-item
              v-for="(item,index) in countryList"
              :key="index"
              :value="item.value"
              :text="item.text"
            />
          </vs-select>
        </div>
      </div>
      <div class="vx-row">
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select
            v-model="language"
            label="Language"
            class="w-full"
          >
            <vs-select-item
              v-for="(item,index) in languageList"
              :key="index"
              :value="item.value"
              :text="item.text"
            />
          </vs-select>
        </div>
        <div class="vx-col sm:w-1/2 w-full mb-2">
          <vs-select
            v-model="currency"
            label="Currency"
            class="w-full"
          >
            <vs-select-item
              v-for="(item,index) in currencyList"
              :key="index"
              :value="item.value"
              :text="item.text"
            />
          </vs-select>
        </div>
      </div>
      <vs-alert
        v-if="activeUser.emailVerified"
        icon-pack="feather"
        icon="icon-info"
        class="h-full my-4"
        color="warning"
      >
        <span>Your account is not verified. <a
          href="#"
          class="hover:underline"
        >Resend Confirmation</a></span>
      </vs-alert>

      <!-- Save & Reset Button -->
      <div class="absolute right-0 bottom-0 w-full text-right p-10">
        <vs-button
          class="ml-auto mt-2"
          color="secondary"
          @click.prevent="submitForm"
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
    name: 'UserSettingsGeneral',
    components: {}
  })
export default class UserSettingsGeneral extends Vue {
    private activeUser: User = AppModule.activeUser
    private timeZone: any = '1'
    private country: any = '1'
    private currency: any = '1'
    private language: any = '1'
    private timeZoneList: any = [
      { text: 'UTC - 05:00 Eastern Time', value: '1' },
      { text: 'PST - 08:00 Eastern Time', value: '2' },
      { text: 'UTC - 05:00 Eastern Time', value: '3' },
      { text: 'PST - 00:00 Eastern Time', value: '4' },
      { text: 'UTC - 02:00 Eastern Time', value: '5' },
      { text: 'UTC - 01:00 Eastern Time', value: '6' }
    ]
    private countryList: any = [
      { text: 'United State', value: '1' },
      { text: 'Russia', value: '2' },
      { text: 'China', value: '3' },
      { text: 'India', value: '4' }
    ]
    private currencyList: any = [
      { text: '$ US Dollar', value: '1' },
      { text: '$ Hong Kong Dollar', value: '2' }
    ]
    private languageList: any = [
      { text: 'English', value: '1' },
      { text: 'French', value: '2' }
    ]
    private submitForm () {
      this.$validator.validateAll().then(result => {
        if (result) {
          // if form have no errors
          alert('form submitted!')
        } else {
          // form have errors
        }
      })
    }
}
</script>
