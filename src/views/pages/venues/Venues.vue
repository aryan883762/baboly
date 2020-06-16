<template>
  <div class="container">
    <div v-if="venues && venues.length > 0">
      <div class="search-page__search-bar flex items-center mb-base">
        <vs-input
          v-model="searchQuery"
          icon-no-border
          placeholder="Search"
          class="w-full input-rounded-full"
          icon="icon-search"
          icon-pack="feather"
        />
      </div>

      <div class="vx-row">
        <div
          v-for="venue in venues"
          :key="venue.uid"
          class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base"
        >
          <VenueCard
            :uid="venue.uid"
            :img="`https://picsum.photos/seed/${venue.uid}/300/200`"
            :name="venue.venueName"
            :location="venue.formattedAddress"
            :description="venue.description"
          />
        </div>
      </div>
    </div>

    <pre>
          {{ venues }}

    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Venue } from '@/models/Venue'
import { VenueModule } from '@/store/modules/venueModule'
import VenueCard from './VenueCard.vue'

  @Component({
    name: 'Venues',
    components: { VenueCard }
  })
export default class Venues extends Vue {
    @Prop({ default: false }) private isEdit!: boolean
    private venues: any[] = [];
    private searchQuery: string = ''

    private async mounted () {
      this.$vs.loading()
      await this.fetchVenues()
    }

    private async fetchVenues () {
      try {
        this.venues = await VenueModule.getVenues()
        this.$vs.loading.close()
      } catch (err) {
        console.error(err)
        this.$vs.loading.close()
      }
    }
}
</script>
