<template>
  <div class="venue-qa w-full pb-12">
    <div class="flex px-10 pt-0">
      <div class="flex-1">
        <p
          class="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-secondary font-medium leading-9"
        >
          Questions & Answers
        </p>
        <div class="flex w-1/2 mt-2">
          <div class="flex-1">
            <p class="text-sm font-bold">
              999 Questions
            </p>
          </div>
          <div class="flex items-center items-end justify-end">
            <p class="text-sm font-bold">
              1067 Answers
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center items-end justify-end">
          <vs-button
            color="secondary"
            type="filled"
            @click="showQuestionInput = true"
          >
            Wriet your Question
          </vs-button>
      </div>
    </div>
    <vs-divider/>
    <div class="px-10 pt-0">
      <div class="flex-1 mt-5">
        <vs-input
          v-model="searchQuestion"
          icon-no-border
          placeholder="Search Question..."
          class="w-full search-question"
          icon="icon-search"
          icon-pack="feather"
          color="none"
        />
      </div>
      <div class="flex-1 mt-5" v-if="showQuestionInput">
        <div class="vx-row">
          <div class="vx-col w-full">
            <vs-textarea
              placeholder="Write your question..."
              rows="6"
             />
          </div>
        </div>
        <div class="flex">
          <div class="flex-1">
            <div class="flex items-end justify-end">
              <vs-button
                color="dark"
                type="border"
                class="border-none mr-3"
                @click="showQuestionInput = false"
              >
                Close
              </vs-button>
              <vs-button
                type="filled"
              >
                Submit
              </vs-button>
            </div>
          </div>
        </div>
      </div>
    <div>
      <Question 
        v-for="index in 5" :key="index"
        @getAnswer="getAnswer"
      />
    <div class="flex items-center justify-center mt-5">
      <vs-button
        color="secondary"
        type="filled"
        size="small"
        class="opacity-75"
      >
        load more questions
      </vs-button>
    </div>
    </div>
    <div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import QuestionComponent from '@/components/Q&A/Question.vue'
  @Component({
    name: 'QA',
    components: {
      Question: QuestionComponent
    }
  })
export default class extends Vue {
  private searchQuestion: string = ''
  private showQuestionInput: boolean = false

}
</script>
