<template>
  <div class="w-full">
    <h3 class="text-center">
      {{ title }}
    </h3>
    <h1 class="font-extrabold mt-5">
      {{ overallRating }}
    </h1>
    <star-rating
      :rating="overallRating"
      :read-only="true"
      :increment="0.01"
      :rounded-corners="true"
      active-color="#681A7F"
      border-color="#681A7F"
      :star-size="20"
      :show-rating="false"
      :inline="true"
    /> {{ totalReviews }} Reviews
    <div class="mt-5">
      <div
        v-for="(rating, ratingIndex) in ratingList"
        :id="ratingIndex"
        :key="ratingIndex"
        class="flex flex-row"
      >
        <div class="w-1/5">
          {{ 5-ratingIndex }} Stars
        </div>
        <div class="w-4/5">
          <vs-progress
            :height="12"
            :percent="(rating/totalReviews)*100"
            color="secondary"
            class="rounded-none rating-progress"
          >
            primary
          </vs-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueStarRating from 'vue-star-rating'

@Component({
  name: 'ReviewSummary',
  components: { 'star-rating': VueStarRating }
})
export default class extends Vue {
    @Prop() private title!: string
    @Prop() private overallRating!: string
    @Prop() private totalReviews!: number
    @Prop() private ratingList!: number[]
}

</script>
