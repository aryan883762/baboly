<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Event Contact Info
    </p>
    <vs-divider />
    <div class="vx-row">
      <!-- Col 1 -->
      <vs-col class="w-full md:w-1/2 mt-4">
        <vs-input
          v-model="event.contact_name"
          class="w-full"
          icon-pack="feather"
          icon="icon-at-sign"
          label="Contact Name"
          icon-no-border
          name="name"
        />
        <span
          v-show="errors.has('name')"
          class="text-danger text-sm"
        >{{ errors.first('name') }}</span>
        <vs-input
          v-model="event.contact_email"
          v-validate="'email'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-at-sign"
          label="Contact Email"
          icon-no-border
          name="email"
        />
        <span
          v-show="errors.has('email')"
          class="text-danger text-sm"
        >{{ errors.first('email') }}</span>

        <vs-input
          v-model="event.contact_phone"
          v-validate="'phone'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-phone"
          label="Phone"
          icon-no-border
          name="phone"
        />
        <span
          v-show="errors.has('phone')"
          class="text-danger text-sm"
        >{{ errors.first('phone') }}</span>
      </vs-col>
      <!-- Col 2 -->
      <div class="vx-col w-full md:w-1/2 mt-4">
        <span class="text-sm">Contact Information / Note</span>
        <vs-textarea
          v-model="event.contact_info"
          rows="6"
          counter="200"
          class="w-full"
          icon-pack="feather"
          icon="icon-info"
          name="contact_info"
        />
      </div>
    </div>

    <p class="text-lg font-medium mt-10">
      Event Social Links
    </p>
    <vs-divider />
    <div class="vx-row">
      <!-- Col 1 -->
      <div class="vx-col w-full md:w-1/2 mt-4">
        <vs-input
          v-model="event.website"
          v-validate="'url:require_protocol'"
          class="w-full"
          icon-pack="feather"
          icon="icon-globe"
          label="Website"
          icon-no-border
          name="website"
        />
        <span
          v-show="errors.has('website')"
          class="text-danger text-sm"
        >{{ errors.first('website') }}</span>

        <vs-input
          v-model="event.facebook"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-facebook"
          label="Facebook"
          icon-no-border
          name="facebook"
        />
        <span
          v-show="errors.has('facebook')"
          class="text-danger text-sm"
        >{{ errors.first('facebook') }}</span>

        <vs-input
          v-model="event.instagram"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-instagram"
          label="Instagram"
          icon-no-border
          name="instagram"
        />
        <span
          v-show="errors.has('instagram')"
          class="text-danger text-sm"
        >{{ errors.first('instagram') }}</span>
      </div>

      <!-- Col 2 -->
      <div class="vx-col w-full md:w-1/2 mt-4">
        <vs-input
          v-model="event.twitter"
          v-validate="'url:require_protocol'"
          class="w-full"
          icon-pack="feather"
          icon="icon-twitter"
          label="Twitter"
          icon-no-border
          name="twitter"
        />
        <span
          v-show="errors.has('twitter')"
          class="text-danger text-sm"
        >{{ errors.first('twitter') }}</span>

        <vs-input
          v-model="event.linkedin"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-linkedin"
          label="Linkedin"
          icon-no-border
          name="linkedin"
        />
        <span
          v-show="errors.has('linkedin')"
          class="text-danger text-sm"
        >{{ errors.first('linkedin') }}</span>

        <vs-input
          v-model="event.youtube"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-youtube"
          label="Youtube"
          icon-no-border
          name="youtube"
        />
        <span
          v-show="errors.has('youtube')"
          class="text-danger text-sm"
        >{{ errors.first('youtube') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'

  @Component({
    name: 'CreateEventContactInfo',
    components: {}
  })
export default class CreateEventContactInfo extends Vue {
    @Prop() private event!: Event
}

</script>

<style scoped>

</style>
