<template>
  <div
    :class="classes[0]"
    class="vx-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4  mb-base noSelect"
    @mouseenter="onMouseEnter()"
    @mouseleave="onMouseLeave()"
  >
    <vx-card class="overlay-card overflow-hidden">
      <template slot="no-body">
        <img
          :src="img"
          alt="category-card-cover"
          class="responsive"
          :class="classes[1]"
        >

        <div class="card-overlay text-white">
          <div class="flex flex-col justify-between h-full">
            <div class="text-center mt-8 w-full">
              <h3 class="text-white mb-2 tracking-wide">
                {{ name }}
              </h3>
              <p class="mb-6">
                {{ description }}
              </p>
              <div class="flex justify-around">
                <svgicon
                  :name="icon"
                  class="w-24 h-24 text-6xl "
                  width="200"
                  height="200"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </vx-card>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, PropSync } from 'vue-property-decorator'
import '@/icons/components/index'
@Component
export default class CategoryCc extends Vue {
    @Prop() private uid!: string
    @Prop() private img?: string
    @Prop() private icon?: string
    @Prop() private name!: string
    @Prop() private description!: string
    @Prop() private online?: boolean

    private hover: boolean = false
    private classes: string[] = []
    private onMouseEnter () {
      this.classes = ['hover']
    }
    private onMouseLeave () {
      this.classes = ['', 'blur-3']
    }
}
</script>
<style lang="css" scoped>
.noSelect {
  user-select: none;
}
.hover {
  transition: transform .4s;
  transform: scale(1.1);
}

</style>
