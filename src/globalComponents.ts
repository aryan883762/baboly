import Vue from 'vue'
// @ts-ignore
import VxTooltip from '@/layouts/components/vx-tooltip/VxTooltip.vue'
// @ts-ignore
import VxCard from '@/components/vx-card/VxCard.vue'
// @ts-ignore
import VxList from '@/components/vx-list/VxList.vue'
// @ts-ignore
import VxBreadcrumb from '@/layouts/components/VxBreadcrumb.vue'
// @ts-ignore
import FeatherIcon from '@/components/FeatherIcon.vue'
// @ts-ignore
import VxInputGroup from '@/components/vx-input-group/VxInputGroup.vue'

// v-select component
import vSelect from 'vue-select'

Vue.component(VxTooltip.name, VxTooltip)
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(VxBreadcrumb.name, VxBreadcrumb)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(VxInputGroup.name, VxInputGroup)

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    })
  },
  OpenIndicator: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    })
  }
})

Vue.component(vSelect)
