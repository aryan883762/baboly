<template>
  <div class="venue-overview w-full pb-12">
    <div class="flex px-10 pt-0">
      <div class="flex-1">
        <p
          class="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-secondary font-medium leading-9"
        >
          About
        </p>
        <p class="text-sm font-bold">
          Buskers On The Ball Conference
        </p>
      </div>
      <div class="flex items-center items-end justify-end">
          <vs-button
            color="secondary"
            type="filled"
            class="mr-4"
          >
            Write a Post
          </vs-button>
      </div>
    </div>
    <vs-divider/>
    <div class="px-10 pt-0">
      <div class="ml-0 vx-row flex w-full mt-0">
        <vs-button
          size="small"
          type="filled"
          class="mr-2 mb-2"
        >
          Wedding
        </vs-button>
        <vs-button
          class="mr-2 mb-2"
          size="small"
          type="filled"
        >
          Bar
        </vs-button>
        <vs-button
          class="mr-2 mb-2"
          size="small"
          type="filled"
        >
          Restaurant
        </vs-button>
        <vs-button
          class="mr-2 mb-2"
          size="small"
          type="filled"
        >
          Standup Comedy
        </vs-button>
    </div>
    <div class="flex-1 mt-5">
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
        read more
      </vs-button>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Overview'
  })
export default class extends Vue {

}
</script>
