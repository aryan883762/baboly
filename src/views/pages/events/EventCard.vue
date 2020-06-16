<template>
  <vx-card>
    <div slot="no-body">
      <div class="holder w-full w-1/2">
        <img
          :src="img"
          alt="event"
          class="w-full h-64 img-cover rounded"
        >
        <div class=" overlay overlay-shade-bottom stick-bottom-left" />
        <div class="overlay stick-bottom-left">
          <div class="filled font-medium bg-secondary p-1 pl-2 pr-2 w-12 text-center rounded text-white">
            <p class="text-sm ">
              {{ formattedTime | moment("MMM") }}
            </p>
            <p class="text-xl  tracking-wide">
              {{ formattedTime | moment("DD") }}
            </p>
            <p class="text-sm">
              {{ formattedTime | moment("ddd") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <h5 class="mb-2">
      <router-link
        type="border"
        color="#b9b9b9"
        :to="{ name: 'event-details', params: { uid: uid } }"
      >
        {{ title | truncate(25) }}
      </router-link>
    </h5>

    <vs-row>
      <span class="-ml-2">
        <vs-icon
          icon="location_on"
          size="small"
          color="primary"
        />
      </span>
      <span class="ml-2">{LOCATION.DIR}</span>
    </vs-row>

    <p class="text-grey min-h-full h-16">
      {{ body | truncate(80) }}
    </p>
    <p class="mt-3">
      {{ people.length }} people are goin
    </p>
    <vs-row>
      <div class="vx-col">
        <ul class="users-liked user-list mt-3 ml-1">
          <li
            v-for="(user, userIndex) in people"
            :key="userIndex"
          >
            <vx-tooltip
              :text="user.name"
              position="bottom"
            >
              <vs-avatar
                :src="user.img ? user.img : 'https://i.pravatar.cc/30?u='+user.name"
                size="30px"
                class="border-2 border-white border-solid -m-1"
              />
            </vx-tooltip>
          </li>
        </ul>
      </div>
      <div class="vx-col self-end ml-auto">
        <vs-button
          color="primary"
          size="small"
          type="filled"
          icon="star"
        >
          Interested
        </vs-button>
      </div>
    </vs-row>

    <div class="flex mt-3 justify-between flex-wrap">
      <vs-chip
        v-for="(tag, key) in tags"
        :key="key"
      >
        {{ tag.name }}
      </vs-chip>
    </div>
  </vx-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface goIn {
    img?: string,
    name: string
  }

  @Component({ name: 'EventCard' })
export default class EventCard extends Vue {
    @Prop() private uid!: string
    @Prop() private img?: string
    @Prop() private tags?: string
    @Prop() private title!: string
    @Prop() private body!: string
    @Prop() private hosted!: string
    @Prop() private location!: string
    @Prop() private time!: string
    @Prop() private people?: goIn[]

    get formattedTime () {
      // @ts-ignore
      return this.time === '' ? this.$moment(this.time).format('YYYY-MM-DD') : this.time
    }
}
</script>

<style lang="css" scoped>
.img-cover {
  max-height: 300px;
}

</style>
