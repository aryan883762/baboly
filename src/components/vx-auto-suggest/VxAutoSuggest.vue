<template>
  <div class="vx-auto-suggest">
    <div class="flex items-center relative">
      <!-- Input -->
      <vs-input
        ref="input"
        v-model="searchQuery"
        :placeholder="placeholder"
        :class="inputClassses"
        class="z-50"
        icon-pack="feather"
        icon="icon-search"
        icon-no-border
        @keyup.esc="escPressed"
        @keyup.up="increaseIndex(false)"
        @keyup.down="increaseIndex"
        @keyup.enter="suggestionSelected"
        @focus="updateInputFocus"
        @blur="updateInputFocus(false)"
      />
    </div>

    <!-- Group List -->
    <ul
      ref="scrollContainer"
      :class="{'hidden': !inputFocused}"
      class="auto-suggest-suggestions-list z-50 rounded-lg mt-2 shadow-lg overflow-x-hidden"
      tabindex="-1"
      @mouseenter="insideSuggestions = true"
      @mouseleave="insideSuggestions = false"
      @focus="updateInputFocus"
      @blur="updateInputFocus(false)"
    >
      <li
        v-for="(suggestionList, grpName, grpIndex) in filteredData"
        ref="grp_list"
        :key="grpIndex"
        class="auto-suggest__suggestion-group-container"
      >
        <!-- Group Header -->
        <p
          v-if="!hideGroupTitle"
          class="auto-suggest__suggestion-group-title pt-3 pb-1 px-4"
        >
          <slot
            name="group"
            :group_name="grpName"
          />
        </p>

        <!-- Suggestion List of each group -->
        <ul>
          <li
            v-for="(suggestion, index) in suggestionList"
            :key="index"
            class="auto-suggest__suggestion-group__suggestion py-3 px-4 cursor-pointer"
            :class="{'vx-auto-suggest__current-selected': currentSelected === `${grpIndex}.${index}`}"
            @mouseenter="currentSelected = `${grpIndex}.${index}`"
            @click="suggestionSelected"
          >
            <slot
              :name="grpName"
              :suggestion="suggestion"
            />
          </li>

          <li
            v-if="!suggestionList.length && searchQuery"
            class="auto-suggest__suggestion-group__suggestion py-3 px-4 no-results"
          >
            <slot
              name="noResult"
              :group_name="grpName"
            >
              <p>No Results Found.</p>
            </slot>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search..'
    },
    data: {
      type: Object,
      required: true
    },
    initalData: {
      type: Object,
      // eslint-disable-next-line no-new-object
      default: () => new Object()
    },
    inputClassses: {
      type: [String, Object, Array], default: ''
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    showPinned: {
      type: Boolean,
      default: false
    },
    searchLimit: {
      type: Number,
      default: 4
    },
    hideGroupTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchQuery: '',
      filteredData: {},
      currentSelected: -1,
      inputFocused: false,
      insideSuggestions: false
    }
  },
  watch: {
    // UPDATE SUGGESTIONS LIST
    searchQuery (val) {
      this.$emit('input', val)

      if (val === '') {
        this.inputInit()
      } else {
        let queriedData = {}
        const dataGrps = Object.keys(this.data)

        dataGrps.forEach((grp, i) => {
          queriedData[dataGrps[i]] = this.filterGrp(this.data[grp])
        })

        // Check if any of group has at least one queried item
        if (!Object.values(queriedData).some(obj => obj.length)) {
          this.currentSelected = -1
        }

        this.filteredData = queriedData
      }
    },
    autoFocus (val) {
      if (val) {
        this.focusInput()
      } else {
        this.searchQuery = ''
      }
    },
    filteredData (val) {
      // Auto Select first item if it's not item-404
      let grpIndex = null

      for (let [index, grpSuggestions] of Object.values(val).entries()) {
        if (grpSuggestions.length) {
          grpIndex = index
          break
        }
      }

      if (grpIndex !== null) this.currentSelected = grpIndex + '.0'
    }
  },
  mounted () {
    if (this.autoFocus) this.focusInput()
  },
  methods: {
    escPressed () {
      this.$emit('closeSearchbar')
      this.searchQuery = ''
    },
    filterGrp (grp) {
      let exactEle = grp.data.filter((item) => {
        return item[grp.key].toLowerCase().startsWith(this.searchQuery.toLowerCase())
      })
      let containEle = grp.data.filter((item) => {
        return !item[grp.key].toLowerCase().startsWith(this.searchQuery.toLowerCase()) && item[grp.key].toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
      })
      return exactEle.concat(containEle).slice(0, this.searchLimit)
    },
    inputInit () {
      if (Object.entries(this.initalData).length === 0 && this.initalData.constructor === Object) {
        this.filteredData = {}
      } else {
        this.filteredData = this.initalData
      }
    },
    updateInputFocus (val = true) {
      if (val) {
        if (this.searchQuery === '') this.inputInit()
        setTimeout(() => {
          this.inputFocused = true
        }, 100)
      } else {
        if (this.insideSuggestions) return
        setTimeout(() => {
          this.inputFocused = false
        }, 100)
        this.escPressed()
      }
    },
    suggestionSelected () {
      if (this.currentSelected > -1) {
        const [grpIndex, itemIndex] = this.currentSelected.split('.')

        const grpOfSelectedItem = Object.keys(this.data)[grpIndex]
        const selectedItem = this.filteredData[grpOfSelectedItem][itemIndex]

        this.$emit('selected', { [grpOfSelectedItem]: electedItem })

        this.searchQuery = ''
      }
    },
    increaseIndex (val = true) {
      // If there's no matching items
      if (!Object.values(this.filteredData).some(grpItems => grpItems.length)) return

      const [$grpIndex, $itemIndex] = this.currentSelected.split('.')

      const grpArray = Object.entries(this.filteredData)
      const activeGrpTotalItems = grpArray[$grpIndex][1].length

      if (val) {
        // If active item is not of last item in grp
        if (activeGrpTotalItems - 1 > $itemIndex) {
          this.currentSelected = $grpIndex + '.' + (Number($itemIndex) + 1)

          // If active item grp is not last in grp list
        } else if ($grpIndex < grpArray.length - 1) {
          for (let i = Number($grpIndex) + 1; i < grpArray.length; i++) {
            // If navigating group have items => Then move in that group
            if (grpArray[i][1].length > 0) {
              this.currentSelected = Number(i) + '.0'
              break
            }
          }
        }
      } else {
        // If active item is not of first item in grp
        if (Number($itemIndex)) {
          this.currentSelected = $grpIndex + '.' + (Number($itemIndex) - 1)

          // If active item grp  is not first in grp list
        } else if (Number($grpIndex)) {
          for (let i = Number($grpIndex) - 1; i >= 0; i--) {
            // If navigating group have items => Then move in that group
            if (grpArray[i][1].length > 0) {
              this.currentSelected = (i) + '.' + (grpArray[i][1].length - 1)
              break
            }
          }
        }
      }
    },
    focusInput () {
      this.$refs.input.$el.querySelector('input').focus()
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/components/vxAutoSuggest.scss";
</style>
