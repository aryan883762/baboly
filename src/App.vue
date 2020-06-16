<template>
  <div
    id="app"
    :class="vueAppClasses"
  >
    <router-view @setAppClasses="setAppClasses" />
  </div>
</template>
})
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/appModule'
import { defaultThemeConfigs } from '@/models/Theme'

  @Component({
    name: 'App',
    components: {}
  })

export default class App extends Vue {
    private vueAppClasses: any[] = []

    private toggleClassInBody (className) {
      if (className === 'dark') {
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      } else if (className === 'semi-dark') {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      } else {
        if (document.body.className.match('theme-dark')) document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark')) document.body.classList.remove('theme-semi-dark')
      }
    }

    private setAppClasses (classesStr) {
      this.vueAppClasses.push(classesStr)
    }

    private handleWindowResize () {
      AppModule.UPDATE_WINDOW_WIDTH(window.innerWidth)

      // Set --vh property
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    }

    private handleScroll () {
      AppModule.UPDATE_WINDOW_SCROLL_Y(window.scrollY)
    }

    private mounted () {
      this.toggleClassInBody(defaultThemeConfigs.theme)
      AppModule.UPDATE_WINDOW_WIDTH(window.innerWidth)

      let vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    private async created () {
      // jwt
      // jwt.init()

      let dir = this.$vs.rtl ? 'rtl' : 'ltr'
      document.documentElement.setAttribute('dir', dir)

      window.addEventListener('resize', this.handleWindowResize)
      window.addEventListener('scroll', this.handleScroll)

      // Auth0
      try {
        // await this.$auth.renewTokens()
      } catch (e) {
        console.error(e)
      }
    }

    private destroyed () {
      window.removeEventListener('resize', this.handleWindowResize)
      window.removeEventListener('scroll', this.handleScroll)
    }
}

</script>
