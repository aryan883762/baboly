<template>
  <div class="mx-auto">
    <vs-button
      to="/venues"
      class="text-accent ml-2"
      type="line"
      color="dark"
      line-origin="center"
    >
      Venues
    </vs-button>
    <vs-button
      to="/events"
      line-origin="center"
      class="text-accent ml-2"
      type="line"
      color="dark"
    >
      Events
    </vs-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'MenuItems',
    components: {}
  })
export default class MenuItems extends Vue {
}
</script>
