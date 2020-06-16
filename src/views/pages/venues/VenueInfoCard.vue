<template>
  <div>
    <div class="vx-row mx-2 py-5 bg-white shadow rounded text-black content-between">
      <div class="ml-0 vx-row w-full mt-0 py-6 px-8">
        <vs-button
          class="mr-3 white-btn text-sm px-6 mb-5"
          size="small"
          type="filled"
        >
          Wedding
        </vs-button>
        <vs-button
          class="mr-3 white-btn text-sm px-6 mb-5"
          size="small"
          type="filled"
        >
          Bar
        </vs-button>
        <vs-button
          class="mr-3 white-btn text-sm px-6 mb-5"
          size="small"
          type="filled"
        >
          Resaurant
        </vs-button>
        <vs-button
          class="mr-3 white-btn text-sm px-6 mb-5"
          size="small"
          type="filled"
        >
          Standup comedy
        </vs-button>
      </div>
      <vs-list class="vs-custom-list">
        <vs-list-item>
          <div class="vs-list--icon">
            <i class="vs-icon notranslate icon-scale material-icons null">place</i>
          </div>
          <div class="list-titles">
            420 Mason St, San Francisco, CA 94102, USA
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="vs-list--icon">
            <i class="vs-icon notranslate icon-scale material-icons null">schedule</i>
          </div>
          <div class="list-titles">
            <vs-dropdown>
              <a
                class="a-icon"
                href.prevent
              >
                Open • Closes 6:30 PM
                <vs-icon
                  class=""
                  icon="expand_more"
                />
              </a>
              <vs-dropdown-menu>
                <vs-dropdown-item to="/components/">
                  Morning - 8:00 PM
                </vs-dropdown-item>
                <vs-dropdown-item>
                  Night - 12:00 PM
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="vs-list--icon">
            <i class="vs-icon notranslate icon-scale material-icons null">call</i>
          </div>
          <div class="list-titles">
            (818) 360-0144
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="vs-list--icon">
            <i class="vs-icon notranslate icon-scale material-icons null">language</i>
          </div>
          <div class="list-titles">
            location.theupsstore.com
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="flex-col w-full">
            <div class="flex flex-row">
              <div class="vs-list--icon inline">
                <i class="vs-icon notranslate icon-scale material-icons null">supervisor_account</i>
              </div>
              <div class="list-titles inline">
                Capacity 50 - 300
              </div>
            </div>
            <div class=" py-5 text-center">
              <vs-button
                color="secondary"
                type="filled"
                class="w-9/12"
              >
                Request a Quote
              </vs-button>
            </div>
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="flex-col w-full py-5">
            <div class="list-titles">
              Create your own event at {venue name}
            </div>
            <div class="mt-5 text-center">
              <vs-button
                color="primary"
                type="filled"
                class="w-9/12"
              >
                Create event
              </vs-button>
            </div>
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="flex-col w-full py-5">
            <div class="list-titles">
              <h2 class="text-center">
                Claim Listing
              </h2>
              <p class="leading-6 mt-5">
                Claim listing is the best way to manage and protect your business.
              </p>
            </div>
            <div class="mt-5">
              <div class="flex flex-row">
                <vs-button
                  color="info"
                  type="filled"
                  class="ml-3 bg-info"
                >
                  Claim This Listing
                </vs-button>
                <vs-button
                  type="border"
                  icon="outlined_flag"
                  class="ml-3 bg-info border-info text-info"
                >
                  Report
                </vs-button>
              </div>
            </div>
          </div>
        </vs-list-item>
        <vs-list-item>
          <div class="flex-col w-full py-5 px-5">
            <ReviewSummary
              title="Review Summary"
              :rating-list="[200,17,16,20,30]"
              :overall-rating="3.5"
              :total-reviews="300"
            />
            <Review
              :user-info="user_info"
            />
          </div>
        </vs-list-item>
      </vs-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Review from '@/components/review/Review.vue'
import ReviewSummary from '@/components/review/ReviewSummary.vue'

@Component({
  name: 'VenueInfoCard',
  components: { Review, ReviewSummary }
})
export default class extends Vue {
    @Prop() private name!: string;
    @Prop() private address!: string;
    @Prop() private description!: string;
    @Prop() private lat!: string;
    @Prop() private lng!: string;
    private userInfo: any = {
      profile_img: require('@/assets/images/profile/user-uploads/user-13.jpg'),
      uId: 12132
    };
    private get Geolat () {
      return parseFloat(this.lat)
    }
    private get Geolng () {
      return parseFloat(this.lng)
    }
}

</script>
<style lang="scss" scoped>
  .schedule-solt {
    .vuesax-app-is-ltr.vs-list--slot {
      margin-left: unset!important;
    }
  }
</style>
