<template>
  <div
    class="nav-header py-4"
    @mouseover="hovered"
    @mouseleave="hovered(false)"
    @click="showChildren = !showChildren"
  >
    <!-- header -->
    <div
      class="header-label flex items-center cursor-pointer relative px-5 py-2"
      :class="[
        {'text-white bg-primary-gradient header-active': isHeaderActive},
        {'header-open': isHovered || showChildren}
      ]"
    >
      <feather-icon
        :icon="header.icon"
        svg-classes="h-5 w-5"
        class="mr-3"
      />
      <span class="whitespace-no-wrap">{{ header.header }}</span>
      <feather-icon
        icon="ChevronDownIcon"
        svg-classes="h-4 w-4"
        class="ml-1"
      />
    </div>

    <!-- Children -->
    <transition name="fade-top-2x">
      <ul
        v-show="showChildren"
        ref="headerDropdown"
        class="header-children h-nav-menu-dd shadow-drop text-intial absolute shadow-lg py-2"
        :class="{'dd-right': dropRight}"
      >
        <li
          v-for="(item, index) in header.items"
          :key="item.name"
        >
          <template v-if="!item.submenu">
            <HNavMenuItem
              :to="item.slug !== 'external' ? item.url : ''"
              :href="item.slug === 'external' ? item.url : ''"
              :icon="item.icon"
              :target="item.target"
              :is-disabled="item.isDisabled"
              :slug="item.slug"
            >
              <span class="truncate">{{ item.name }}</span>
              <vs-chip
                v-if="item.tag"
                :color="item.tagColor"
              >
                {{ item.tag }}
              </vs-chip>
            </HNavMenuItem>
          </template>
          <template v-else>
            <HNavMenuGroup
              :key="`group-${index}`"
              open-hover
              :group="item"
              :group-index="index"
              :open="checkGrpChildrenActive(item)"
            />
          </template>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import HNavMenuGroup from './HorizontalNavMenuGroup.vue'
import HNavMenuItem from './HorizontalNavMenuItem.vue'
import VxTooltip from '@/layouts/components/vx-tooltip/VxTooltip.vue'

  @Component({
    name: 'HorizontalNavMenuHeader',
    components: {
      HNavMenuGroup,
      HNavMenuItem
    }
  })
export default class HorizontalNavMenuHeader extends Vue {
    @Prop() private header!: any;
    @Prop() private openOnHover!: boolean;

    private showChildren: boolean = false
    private isHovered: boolean = false
    private dropRight: boolean = false

    get isHeaderActive () {
      const path = this.$route.fullPath
      let active = false
      const routeParent = this.$route.meta ? this.$route.meta.parent : undefined

      this.header.items.forEach((item) => {
        // If item is group
        if (item.submenu) {
          if (this.checkGrpChildrenActive(item)) {
            active = true
          }
        } else if (item.url) {
          if (path === item.url || routeParent === item.slug) {
            active = true
          }
        }
      })

      return active
    }

    private checkGrpChildrenActive (group) {
      const path = this.$route.fullPath
      let active = false
      const routeParent = this.$route.meta ? this.$route.meta.parent : undefined

      if (group.submenu) {
        group.submenu.forEach((item) => {
          if ((path === item.url || routeParent === item.slug) && item.slug) {
            active = true
          } else if (item.submenu) {
            active = !!this.checkGrpChildrenActive(item)
          }
        })
      }

      return active
    }

    private hovered (val = true) {
      this.isHovered = val
      if (this.openOnHover) {
        val ? this.showChildren = true : this.showChildren = false
      }
    }

    @Watch('showChildren', { immediate: true, deep: true })
    private onShowChildren () {
      this.$nextTick(() => {
        if (this.showChildren) {
          let dd: any = this.$refs.headerDropdown
          if (dd.getBoundingClientRect().left + dd.offsetWidth - (window.innerWidth - 16) >= 0) {
            this.dropRight = true
          }
        }
      })
    }
}

</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/components/horizontalNavMenuHeader.scss";
</style>
