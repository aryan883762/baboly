<template>
  <vx-card no-shadow>
    <!-- Bio -->
    <vs-textarea
      v-model="bio"
      label="Bio"
      placeholder="Your bio..."
    />

    <!-- DOB -->
    <div class="mt-8">
      <label class="text-sm">Birth Date</label>
      <flat-pickr
        v-model="dob"
        :config="{dateFormat: 'd F Y'}"
        class="w-full"
      />
    </div>

    <!-- Country -->
    <div class="mt-8">
      <label class="text-sm">Country</label>
      <v-select
        v-model="country"
        :options="countryOptions"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />
    </div>

    <!-- Languages -->
    <div class="mt-8">
      <label class="text-sm">Languages</label>
      <v-select
        v-model="langKnown"
        multiple
        :close-on-select="false"
        :options="langOptions"
        :dir="$vs.rtl ? 'rtl' : 'ltr'"
      />
    </div>

    <!-- Mobile Number -->
    <vs-input
      v-model="mobile"
      class="w-full mt-8"
      type="number"
      label-placeholder="Mobile"
    />

    <!-- Website  -->
    <vs-input
      v-model="website"
      class="w-full mt-8"
      label-placeholder="Website"
    />

    <!-- Gender -->
    <div class="mt-8 mb-base">
      <label class="text-sm">Gender</label>
      <div class="mt-2">
        <vs-radio
          v-model="gender"
          vs-value="male"
          class="mr-4"
        >
          Male
        </vs-radio>
        <vs-radio
          v-model="gender"
          vs-value="female"
          class="mr-4"
        >
          Female
        </vs-radio>
        <vs-radio
          v-model="gender"
          vs-value="other"
        >
          Other
        </vs-radio>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">
        Save Changes
      </vs-button>
      <vs-button
        class="ml-4 mt-2"
        type="border"
        color="warning"
      >
        Reset
      </vs-button>
    </div>
  </vx-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import { AppModule } from '@/store/modules/appModule'

  @Component({
    name: 'UserSettingsInfo',
    components: {
      flatPickr,
      vSelect
    }
  })

export default class UserSettingsInfo extends Vue {
    private bio: string = ''
    private dob: string = null
    private country: string = 'USA'
    private langKnown: string[] = ['English', 'Russian']
    private gender: string = 'male'
    private mobile: string = ''
    private website: string = ''

    // Options
    private countryOptions: any = [
      { label: 'Australia', value: 'australia' },
      { label: 'France', value: 'france' },
      { label: 'Germany', value: 'germany' },
      { label: 'India', value: 'india' },
      { label: 'Jordan', value: 'jordan' },
      { label: 'Morocco', value: 'morocco' },
      { label: 'Portuguese', value: 'portuguese' },
      { label: 'Syria', value: 'syria' },
      { label: 'USA', value: 'usa' }
    ]
    private langOptions: any = [
      { label: 'English', value: 'english' },
      { label: 'Spanish', value: 'spanish' },
      { label: 'French', value: 'french' },
      { label: 'Russian', value: 'russian' },
      { label: 'German', value: 'german' },
      { label: 'Arabic', value: 'arabic' },
      { label: 'Sanskrit', value: 'sanskrit' }
    ]
}
</script>
