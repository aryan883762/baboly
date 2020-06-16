<template>
  <div class="container">
    <div class="search-page__search-bar flex items-center">
      <vs-input
        v-model="searchQuery"
        icon-no-border
        placeholder="Search"
        class="w-full input-rounded-full"
        icon="icon-search"
        icon-pack="feather"
      />
    </div>
    <div class="search-page__serch-menu flex flex-wrap items-center md:justify-between mt-8">
      <div class="flex flex-wrap">
        <span class="search-tab-filter shadow-drop">All</span>
        <span class="search-tab-filter shadow-drop">Today</span>
        <span class="search-tab-filter shadow-drop">Tomorrow</span>
        <span class="search-tab-filter shadow-drop">This Week</span>
        <span class="search-tab-filter shadow-drop">Next Week</span>
      </div>
    </div>
    <div class="vx-row">
      <div
        v-for="event in events"
        :key="event.uid"
        class="vx-col w-full md:w-1/2 lg:w-1/3 mb-base"
      >
        <EventCard
          :uid="event.uid"
          :img="`https://picsum.photos/seed/${event.description}/400/300`"
          :title="event.title"
          :body="event.description"
          hosted="{HOSTED By User}"
          location="{LocationDir}"
          :people="uGoin"
          :time="event.startTime"
          :tags="event.tags"
        />
      </div>
    </div>
    <pre>
          {{ events }}
    </pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { EventModule } from '@/store/modules/eventModule'
import EventCard from './EventCard.vue'
import { Event } from '@/models/Event'

export interface goIn {
    img?: string,
    name: string
  }

  @Component({
    components: { EventCard }
  })
export default class Events extends Vue {
    @Prop({ default: false }) private isEdit!: boolean;
    private events: Event[] = [];
    private uGoin: goIn[] = []
    private searchQuery: string = ''

    private mounted () {
      this.fetchEvents()
    }

    private async fetchEvents () {
      try {
        this.events = await EventModule.getEvents()
        this.uGoin = [{
          name: 'Lai Lewandowski'
        },
        {
          name: 'Elicia Rieske'
        },
        {
          name: 'Darcey Nooner'
        },
        {
          name: 'Julee Rossignol'
        },
        {
          name: 'Jeffrey Gerondale'
        }]
      } catch (err) {
        console.error(err)
      }
    }
}
</script>
