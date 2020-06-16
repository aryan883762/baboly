<template>
  <div>
    <h5 class="text-center">
      Select your event category
    </h5>
    <vs-row>
      <EventCategoryCard
        v-for="(category, key) in categories"
        :key="key"
        class="p-3 vx-col w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-base noSelect"
        :icon="'event-categories/'+category.slug"
        description="Something"
        :name="category.name"
        :slug="category.slug"
        @click.native="selectCategory(category)"
      />
    </vs-row>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import EventCategoryCard from '@/views/pages/events/create/EventCategoryCard.vue'
import { Category, CategoryCard } from '@/models/Category'
import { EventCategoryModule } from '@/store/modules/eventCategoryModule'

@Component({
  name: 'CreateEventSelectCategory',
  components: {
    EventCategoryCard
  }
})
export default class SelectEventCategory extends Vue {
  private categories:Category[] = [];

  private async mounted () {
    await EventCategoryModule.getCategories()
    this.categories = EventCategoryModule.categories
  }

  private selectCategory (card: CategoryCard) {
    this.$emit('selectCategory', card)
  }
}
</script>

<style lang="scss" scoped>
</style>
