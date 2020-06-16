<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center">
    <div class="container">
      <div class="vx-col lg:w-1/2 xl:w-1/2 mx-auto self-center">
        <vx-card>
          <div
            slot="no-body"
          >
            <div class="vx-row no-gutter">
              <div class="vx-col sm:w-full md:w-full mx-auto self-center  d-theme-dark-bg">
                <div class="px-8 pt-8 register-tabs-container">
                  <div class="vx-card__title mb-4">
                    <h4 class="mb-4">
                      Create Account
                    </h4>
                    <p>Fill the below form to create a new account.</p>
                  </div>
                  <div class="pt-3">
                    <register-firebase />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>

import RegisterFirebase from './RegisterFirebase.vue'

export default {
  components: {
    RegisterFirebase
  }
}
</script>

<style lang="scss">
  .register-tabs-container {
    min-height: 517px;

    .con-tab {
      padding-bottom: 23px;
    }
  }
</style>
