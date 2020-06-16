<template>
  <div class="venue-comments w-full pb-12">
    <div class="px-10 pt-0">
      <div class="flex-1 mt-5">
        <div class="vx-row">
          <div class="vx-col w-full mb-5">
            <vs-textarea
              placeholder="Say something..."
              rows="6"
             />
          </div>
        </div>
        <div class="flex">
          <div class="flex-1">
            <div class="flex items-center mt-2">
              <feather-icon
                class="mr-2"
                icon="PaperclipIcon"
                svg-classes="h-6 w-6"
              /><span class="text-base">Add image</span>
            </div>
          </div>
          <div class="items-center items-end">
            <div class="flex items-center items-end justify-end">
              <vs-button
                type="filled"
              >
                Share
              </vs-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Comments'
  })
export default class extends Vue {

}
</script>
