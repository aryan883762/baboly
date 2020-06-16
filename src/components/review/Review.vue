<template>
  <div class="w-full py-8">
    <div class="mt-12 text-center">
      <vs-avatar
        :src="userInfo.profile_img"
        size="45px"
        class="border-2 border-white border-solid -m-1"
      />
      <div class="mt-5">
        <span class="font-medium">
          Rate & review
        </span>
        <p class="mt-5">
          Share your experience to help others
        </p>
        <div class="inline-block mt-5">
          <star-rating
            :show-rating="false"
            :rating="currentSelectedRating"
            :increment="0.5"
            :rounded-corners="true"
            active-color="#681A7F"
            :star-size="30"
            border-color="#FFFFFF"
            @rating-selected="setCurrentSelectedRating"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VueStarRating from 'vue-star-rating'

  @Component({
    name: 'Review',
    components: { 'star-rating': VueStarRating }
  })
export default class extends Vue {
    @Prop() private userInfo!: any

    private currentSelectedRating: any = 3.5

    private setCurrentSelectedRating (rating) {
      this.currentSelectedRating = rating
    }
}
</script>
