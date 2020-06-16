<template>
  <div
    id="venue-details-page"
    class="container w-full px-0"
  >
    <div
      v-if="venue"
      class="vx-row flex-col-reverse lg:flex-row"
    >
      <div class="vx-col w-full xl:w-7/10 lg:w-2/3 mb-base p-0 sm:pr-0 md:pr-0 lg:pr-6 xl:pr-7">

        <vs-card class="venue-card-media">
          <div slot="header" >
            <div slot="media">
              <img
                class="responsive block"
                :src="`https://picsum.photos/seed/${venue.uid}/1000/400`"
              >
            </div>
          <div class="flex px-8 py-4" style="border-bottom: 1px solid #f0f3f5">
            <div class="flex-1">
              <p
               class="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-secondary font-medium leading-normal"
              >
               Buskers On The Ball Conference
              </p>
              <div class="flex items-center mt-2">
                <feather-icon
                  class="mr-2"
                  icon="MapPinIcon"
                  svg-classes="h-5 w-5"
                />
                <span class="text-sm">
                420 Mason St, San Francisco, CA 94102, USA
                </span>
                <feather-icon
                  class="mr-2"
                  icon="NavigationIcon"
                  svg-classes="h-5 w-5"
                />
              </div>
            </div>
            <div class="items-center items-end">
              <div class="flex items-center items-end justify-end">
                <vs-button
                  color="secondary"
                  type="filled"
                  size="small"
                  class="mr-4"
                >
                  follow
                </vs-button>
                <feather-icon
                  class="mr-2"
                  icon="HeartIcon"
                  svg-classes="h-5 w-5"
                />
                <span class="mr-4">145</span>
                <feather-icon
                  class="mr-2"
                  icon="UploadIcon"
                  svg-classes="h-5 w-5"
                />
              </div>
              <div class="flex items-end justify-end mt-3">
              <star-rating
                  :rating="'4.5'"
                  :read-only="true"
                  :increment="0.01"
                  :rounded-corners="true"
                  active-color="#681A7F"
                  border-color="#681A7F"
                  :star-size="20"
                  :show-rating="false"
                  :inline="true"
                /><span class="ml-3 text-black"> 2,358 Reviews</span>
              </div>
            </div>
          </div>
          </div>
          <div class="flex">
            <div class="flex-1">
              <nav class="venue-menu-tab">
                <ul class="flex-none md:flex lg:flex xl:flex px-3 mt-2 mb-4">
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-overview' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Overview
                    </router-link>
                  </li>
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-events' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Events
                    </router-link>
                  </li>
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-booking' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Booking
                    </router-link>
                  </li>
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-images' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Images
                    </router-link>
                  </li>
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-comments' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Comments
                    </router-link>
                  </li>
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-reviews' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Reviews
                    </router-link>
                  </li>
                  <li class="text-base md:w-1/6 lg:w-1/6 xl:w-1/6">
                    <router-link
                      tag="div"
                      :to="{ name: 'venue-qa' }"
                      class="cursor-pointer flex p-4 justify-start md:justify-center lg:justify-center"
                    >
                    Q&A
                    </router-link>
                  </li>                                                                                                          
                </ul>
              </nav>
              <div class="venue-body">
                   <router-view />
              </div>
            </div>
          </div>
          <div
            slot="footer"
            class="mb-5"
          />
        </vs-card>
      </div>
      <div class="vx-col w-full xl:w-3/10 lg:w-1/3 mb-base p-0">
        <VenueInfoCard
          :name="venue.venueName"
          :address="venue.formattedAddress"
          :lat="venue.lat"
          :lng="venue.lng"
        />
      </div>
    </div>
    <div>
      <pre> {{ venue }}</pre>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VenueModule } from '@/store/modules/venueModule'
import Comments from '@/components/comments/Comments.vue'
import VenueInfoCard from './VenueInfoCard.vue'
import { Venue } from '@/models/Venue'
import VueStarRating from 'vue-star-rating'
export interface VenueDate {
  date: string,
  title: string,
  direction: string,
}

@Component({
  name: 'VenueDetails',
  components: { Comments, VenueInfoCard, 'star-rating': VueStarRating }
})
export default class extends Vue {
  @Prop() private uid!: string;
  @Prop() private slug!: string;

  private venue: Venue | null = null;
  private venues: VenueDate[] = []
  private indexActive: number = 0
  private async mounted () {
    this.$vs.loading()
    this.venues = [{ date: Date().toString(), title: 'Mrs. Dandre Gaylord Sr. Jhoan ', direction: ' 11 Marin Blvd, Jersey City, NJ 07302, ' }]
    this.testTable()
    await this.fetchVenue()
  }
  get venuesGetter () {
    return this.venues
  }
  private testTable () {
    this.venues.push({ date: Date().toString(), title: 'Mrs. Dandre Gaylord Sr. Jhoan ', direction: ' 11 Marin Blvd, Jersey City, NJ 07302, ' })
  }
  private async fetchVenue () {
    try {
      this.venue = await VenueModule.getVenue(this.uid)
      this.$vs.loading.close()
    } catch (err) {
      this.$vs.loading.close()
      console.error(err)
    }
  }
    goBack() {
       this.$router.push({ name: 'venue-qa' })
    }
}
</script>
