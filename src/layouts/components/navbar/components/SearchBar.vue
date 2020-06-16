<template>
  <div class="flex">
    <div
      v-show="showFullSearch"
      class="search-full-container w-full h-full absolute left-0 top-0"
      :class="{'flex': showFullSearch}"
    >
      <VxAutoSuggest
        ref="navbarSearch"
        :auto-focus="showFullSearch"
        :data="navbarSearchAndPinList"
        search_key="title"
        background-overlay
        class="w-full"
        input-classses="w-full vs-input-no-border vs-input-no-shdow-focus"
        icon="SearchIcon"
        placeholder="Explore Babooly..."
        @input="hndSearchQueryUpdate"
        @selected="selected"
        @closeSearchbar="showFullSearch = false"
      >
        <template v-slot:group="{ groupName }">
          <p class="font-semibold text-primary">
            {{ groupName | title }}
          </p>
        </template>

        <!-- Pages Suggestion -->
        <template v-slot:pages="{suggestion}">
          <div class="flex items-end leading-none py-1">
            <feather-icon
              :icon="suggestion.icon"
              svg-classes="h-5 w-5"
              class="mr-4"
            />
            <span class="mt-1">{{ suggestion.title }}</span>
          </div>
        </template>

        <!-- No Items Slot -->
        <template v-slot:noResult="">
          <div class="flex items-center">
            <feather-icon
              icon="InfoIcon"
              svg-classes="h-5 w-5"
              class="mr-4"
            />
            <span>No results found.</span>
          </div>
        </template>
      </VxAutoSuggest>

      <div class="absolute right-0 h-full z-50">
        <feather-icon
          icon="XIcon"
          class="px-4 cursor-pointer h-full close-search-icon"
          @click="showFullSearch = false"
        />
      </div>
    </div>
    <feather-icon
      icon="SearchIcon"
      class="cursor-pointer navbar-fuzzy-search mr-4"
      @click="showFullSearch = true"
    />
  </div>
</template>

<script>
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue'
import { AppModule } from '@/store/modules/appModule'

export default {
  components: {
    VxAutoSuggest
  },
  data () {
    return {
      navbarSearchAndPinList: AppModule.navbarSearchAndPinList,
      showFullSearch: false
    }
  },
  methods: {
    selected (item) {
      if (item.pages) {
        this.$router.push(item.pages.url).catch(() => {
        })
      }
      this.showFullSearch = false
    },
    hndSearchQueryUpdate (query) {
      // Show overlay if any character is entered
      AppModule.TOGGLE_CONTENT_OVERLAY(!!query)
    }
  }
}

</script>
