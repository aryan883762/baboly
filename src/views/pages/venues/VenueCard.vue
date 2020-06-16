<template>
  <div>
    <vx-card>
      <div slot="no-body">
        <div class="holder w-full w-1/2">
          <img
            :src="img"
            alt="venue"
            class="w-full rounded"
          >
          <div class="overlay overlay-shade-bottom stick-bottom-left">
            <span class="filled bg-secondary p-2 text-center rounded text-white">
              one event
            </span>
          </div>
        </div>
      </div>
      <h5 class="mb-2">
        <router-link
          class="mt-4"
          type="border"
          color="#b9b9b9"
          :to="{ name: 'venue-details', params: { uid: uid } }"
        >
          {{ name | truncate(25) }}
        </router-link>
      </h5>
      <p class="text-grey min-h-full h-16">
        {{ description | truncate(80) }}
      </p>
      <div class="vx-row">
        <span>
          <vs-icon
            icon="location_on"
            size="small"
            color="primary"
          />
        </span>
        <span class="pl-2">{{ location |truncate(38) }}</span>
      </div>
    </vx-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({ name: 'VenueCard' })
export default class extends Vue {
    @Prop() private uid!: string
    @Prop() private img?: string
    @Prop() private name!: string
    @Prop() private description!: string
    @Prop() private location!: string
}
</script>
