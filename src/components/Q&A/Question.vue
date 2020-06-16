<template>
    <div class="flex mt-5 rounded-lg shadow-drop p-4 hover:bg-gray-600 cursor-pointer">
      <div class="mr-3">
        <vs-avatar
          :src="userLatestPhotos[0]"
          size="37px"
        />
      </div>
      <div class="flex flex-col w-full">
          <p class="comment-body text-sm leading-normal font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium sagittis,
            lorem tellus blandit aliquet ipsum orci, eu. (max 140 character)
          </p>
        <div class="flex mt-3">
          <div class="flex-1">
            <p class="author leading-normal">
              Annette Mckinney <span class="ml-3">12 Dec 2018 at 11:46 AM</span>
            </p>
          </div>
          <div class="flex items-center items-end justify-end">
            <feather-icon
              icon="MessageSquareIcon"
              svg-classes="h-4 w-4"
              class="mr-2 ml-2 cursor-pointer"
            />
            <span class="text-count mr-2">2433</span>
            <feather-icon
              icon="HeartIcon"
              svg-classes="h-4 w-4"
              class="mr-2 ml-2 cursor-pointer"
            />
            <span class="text-count mr-2">2433</span>
            <feather-icon
                  class="mr-2"
                  icon="UploadIcon"
                  svg-classes="h-5 w-5"
            />
            <span class="text-count mr-2">Share</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import moment from 'moment'

  @Component({
    name: 'Question'
  })
export default class extends Vue {
    private userLatestPhotos: any[] = [
      require('@/assets/images/profile/user-uploads/user-01.jpg'),
      require('@/assets/images/profile/user-uploads/user-02.jpg'),
      require('@/assets/images/profile/user-uploads/user-04.jpg'),
    ];

}
</script>
