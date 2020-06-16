<template functional>
  <footer
    class="bg-primary"
    :class="classes"
  >
    <div
      class="container flex justify-between  mx-auto flex flex-wrap flex-col md:flex-row items-center p-10 text-white"
    >
      <div class="flex items-center">
        <a
          class="text-white"
          href="/terms"
        >Terms</a>&nbsp;/&nbsp;
        <a
          class="text-white"
          href="/privacy"
        >Privacy</a>&nbsp;/&nbsp;
        <a
          class="text-white"
          href="/about-us"
        >About Us</a>&nbsp;/&nbsp;
        <a
          class="text-white"
          href="/careers"
        >Careers</a>&nbsp;/&nbsp;
        <a
          class="text-white"
          href="/faq"
        >FAQ</a> /&nbsp;
        <a
          class="text-white"
          href="mailto:support@babooly.com"
        >Contact</a>
      </div>

      <div class="flex items-center">
        <span>COPYRIGHT &copy;</span>
        <span>{{ new Date().getFullYear() }} </span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component({
    name: 'TheFooter'
  })
export default class TheFooter extends Vue {
    @Prop() private classes!: string;
}

</script>
