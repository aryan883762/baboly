<template>
  <div
    :class="classes[0]"
    @mouseenter="onMouseEnter()"
    @mouseleave="onMouseLeave()"
  >
    <vx-card class="overlay-card overflow-hidden h-64">
      <template slot="no-body">
        <div class=" text-white">
          <div class="flex flex-col justify-between h-full">
            <div class="text-center mt-8 w-full">
              <h5 class="text-accent h-16 p2 tracking-wide">
                {{ name }}
              </h5>

              <div class="text-primary flex justify-around">
                <svgicon
                  :name="icon"
                  class="w-24 h-24 text-6xl "
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import '@/icons/components/index'
@Component({
  name: 'EventCategoryCard',
  components: {}
})
export default class EventCategoryCard extends Vue {
    @Prop() private img?: string
    @Prop() private name!: string
    @Prop() private slug!: string
    @Prop() private icon!: string
    @Prop() private description?: string

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
.svg-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
}

</style>
