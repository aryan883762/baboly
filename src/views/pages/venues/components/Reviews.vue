<template>
  <div class="venue-overview w-full pb-12">
    <div class="flex px-10 pt-0">
      <div class="flex-1">
        <p
          class="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-secondary font-medium leading-9"
        >
          Reviews
        </p>
        <p class="text-sm font-bold">
          9999 reviews
        </p>
      </div>
      <div class="flex items-center items-end justify-end">
          <vs-button
            color="secondary"
            type="filled"
            class="mr-4"
          >
            Write a Review
          </vs-button>
      </div>
    </div>
    <vs-divider/>
    <div class="px-10 pt-0">
    <div class="flex mt-5">
      <p class="text-sm" style="line-height: 21px">
        What if a storm hits Hilton Head Island before you get ready to go on vacation?
        The answer is simple…What if a storm hits Hilton Head Island before you get ready 
        to go on vacation? The answer is simple…What if a storm hits Hilton What if a storm
        hits Hilton Head Island before you get ready to go on vacation?  The answerHead Island
        before you get ready to go on vacation? The answer is simple… stay home!....
        <br/>
        <br/>
        What if a storm hits Hilton Head Island before you get ready to go on vacation?
        The answerHead Island before you get ready to go on vacation? The answer is simple
      </p>
    </div>
    <div class="flex items-center justify-center mt-5">
      <vs-button
        color="secondary"
        type="filled"
        size="small"
        class="opacity-75"
      >
        load more reviews
      </vs-button>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Review'
  })
export default class extends Vue {

}
</script>
