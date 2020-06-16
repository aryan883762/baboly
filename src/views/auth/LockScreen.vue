<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center items-center">
    <div class="vx-col sm:w-3/5 md:w-3/5 lg:w-1/3 xl:w-1/4 mx-auto self-center">
      <vx-card>
        <div
          slot="no-body"
          class="full-page-bg-color"
        >
          <div class="vx-row no-gutter">
            <div class="vx-col sm:w-full md:w-full  mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">
                    Your Session is locked
                  </h4>
                </div>
                <vs-input
                  v-model="value1"
                  icon-no-border
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Username"
                  class="w-full mb-6"
                />
                <vs-input
                  v-model="value2"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  type="password"
                  label-placeholder="Password"
                  class="w-full mb-6"
                />

                <div class="flex justify-between flex-wrap">
                  <router-link
                    to="/login"
                    class="mb-4"
                  >
                    Are you not John Doe?
                  </router-link>
                  <vs-button class="ml-2">
                    Unlock
                  </vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: ''
    }
  }
}
</script>
