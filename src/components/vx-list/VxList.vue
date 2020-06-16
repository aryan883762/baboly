<template>
  <ul class="list">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="list__item"
    >
      <feather-icon
        :icon="rtlSpecificIcon"
        class="w-5 h-5 mr-1"
      >
        {{ item }}
      </feather-icon>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'VxList',
  props: {
    list: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      default: 'ChevronsRightIcon'
    }
  },
  computed: {
    rtlSpecificIcon () {
      let i = this.icon
      if (this.$vs.rtl && i.includes('Left')) {
        i = i.replace('Left', 'Right')
      } else if (i.includes('Right')) {
        i = i.replace('Right', 'Left')
      } else {
        i = null
      }
      return i
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/components/vxList.scss";
</style>
