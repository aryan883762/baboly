<template>
  <div
    id="page-login"
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div class="container">
      <div class="vx-col sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mx-auto self-center">
        <vx-card>
          <div
            slot="no-body"
          >
            <div class="vx-row no-gutter justify-center items-center">
              <div class="vx-col sm:w-full md:w-full   d-theme-dark-bg">
                <div class="px-8 pt-8 login-tabs-container">
                  <div class="vx-card__title mb-4">
                    <h4 class="mb-4">
                      Login
                    </h4>
                    <p>Welcome back, please login to your account.</p>
                  </div>

                  <div class="pt-5">
                    <login-firebase />
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
import LoginFirebase from './LoginFirebase.vue'

export default {
  components: {
    LoginFirebase
  }
}
</script>

<style lang="scss">
  .login-tabs-container {
    min-height: 505px;

    .con-tab {
      padding-bottom: 14px;
    }

    .con-slot-tabs {
      margin-top: 1rem;
    }
  }
</style>
