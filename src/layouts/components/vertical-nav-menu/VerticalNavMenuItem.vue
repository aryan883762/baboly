<template>
  <div
    class="vs-sidebar--item"
    :class="[
      {'vs-sidebar-item-active': activeLink},
      {'disabled-item pointer-events-none': isDisabled}
    ]"
  >
    <router-link
      v-if="to"
      tabindex="-1"
      exact
      :class="[{'router-link-active': activeLink}]"
      :to="to"
      :target="target"
    >
      <span
        v-if="!featherIcon && iconPack === 'svg'"
        class="feather-icon select-none relative"
      >
        <svgicon
          :name="icon"
          class="w-6 h-6"
        />
      </span>
      <vs-icon
        v-else-if="!featherIcon"
        :icon-pack="iconPack"
        :icon="icon"
      />
      <feather-icon
        v-else
        :class="{'w-3 h-3': iconSmall}"
        :icon="icon"
      />
      <slot />
    </router-link>

    <a
      v-else
      :target="target"
      :href="href"
      tabindex="-1"
    >
      <span
        v-if="!featherIcon && iconPack === 'svg'"
        class="feather-icon select-none relative"
      >
        <svgicon
          :name="icon"
          class="w-6 h-6"
        />
      </span>
      <vs-icon
        v-else-if="!featherIcon"
        :icon-pack="iconPack"
        :icon="icon"
      />
      <feather-icon
        v-else
        :class="{'w-3 h-3': iconSmall}"
        :icon="icon"
      />
      <slot />
    </a>
  </div>
</template>

<script>
export default {
  name: 'VNavMenuItem',
  props: {
    icon: { type: String, default: '' },
    iconSmall: { type: Boolean, default: false },
    iconPack: { type: String, default: 'material-icons' },
    href: { type: [String, null], default: '#' },
    to: { type: [String, Object, null], default: null },
    slug: { type: String, default: null },
    index: { type: [String, Number], default: null },
    featherIcon: { type: Boolean, default: true },
    target: { type: String, default: '_self' },
    isDisabled: { type: Boolean, default: false }
  },
  computed: {
    activeLink () {
      return !!(((this.to === this.$route.path) || (this.$route.meta.parent === this.slug)) && this.to)
    }
  }
}

</script>
<style lang="scss">
  /*@import "../../../assets/scss/babooly/layouts/components/verticalNavMenuItem"*/
</style>
