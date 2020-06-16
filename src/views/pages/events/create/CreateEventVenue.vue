<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Event Location
    </p>
    <vs-divider />

    <div
      class=" w-full "
    >
      <vs-checkbox v-model="event.isOnline">
        Is Online
      </vs-checkbox>
      <div class="vx-row mx-2 md:mx-auto ">
        <vs-input
          v-model="event.vName"
          label="Venue Name"
          placeholder="Venue Name"
          class="md:w-1/4 w-full"
        />
        <vs-input
          v-if="event.isOnline"
          v-model="event.vUrl"
          label="Venue Url"
          placeholder="Venue Url"
          class="md:w-2/3 md:ml-2 w-full"
        />
        <div
          v-else
          class="md:w-2/3 md:ml-2 w-full"
        >
          <vs-input
            v-model="event.vDir"
            label="Venue Dir"
            placeholder="Venue Dir"
            class="w-full"
          />
          <GmapMap
            :center="{ lat: 25.7751, lng: -80.2105 }"
            :zoom="15"
            class="mt-3"
            map-type-id="terrain"
            style="width: 100%; height: 400px"
          >
            <GmapMarker
              :position="{ lat: 25.7751, lng: -80.2105 }"
              :clickable="true"
              @click="center={ lat: 25.7751, lng: -80.2105 }"
            />
          </GmapMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'

  @Component({
    name: 'CreateEventVenue',
    components: {}
  })
export default class CreateEventVenue extends Vue {
    @Prop() private event!: Event
}

</script>

<style scoped>

</style>
