<template>
  <div class="venue-images w-full pb-8 px-4">
    <div>
      <vs-images 
        :hover="'scale'"
        not-border-radius
      >
        <vs-image 
          :key="index" :src="`https://picsum.photos/400/400?image=3${index}`"
          v-for="(image, index) in 9"
          class="m-3"
          style="width: calc(25% - 24px);"
        />
        <vs-image
          :key="index"
          :src="`https://picsum.photos/400/400?image=4${index}`"
          v-for="(image, index) in 7"
          class="m-3"
          style="width: calc(25% - 24px);"
        />
      </vs-images>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'Images'
  })
export default class extends Vue {

}
</script>
