<!-- =========================================================================================
  File Name: UserEditTabSocial.vue
  Description: User Edit Social Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <!-- Col 1 -->
      <div class="vx-col w-full md:w-1/2">
        <vs-input
          v-model="data_local.social_links.twitter"
          v-validate="'url:require_protocol'"
          class="w-full"
          icon-pack="feather"
          icon="icon-twitter"
          label="Twitter"
          icon-no-border
          name="twitter"
        />
        <span
          v-show="errors.has('twitter')"
          class="text-danger text-sm"
        >{{ errors.first('twitter') }}</span>

        <vs-input
          v-model="data_local.social_links.facebook"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-facebook"
          label="Facebook"
          icon-no-border
          name="facebook"
        />
        <span
          v-show="errors.has('facebook')"
          class="text-danger text-sm"
        >{{ errors.first('facebook') }}</span>

        <vs-input
          v-model="data_local.social_links.instagram"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-instagram"
          label="Instagram"
          icon-no-border
          name="instagram"
        />
        <span
          v-show="errors.has('instagram')"
          class="text-danger text-sm"
        >{{ errors.first('instagram') }}</span>
      </div>

      <!-- Col 2 -->
      <div class="vx-col w-full md:w-1/2">
        <vs-input
          v-model="data_local.social_links.github"
          v-validate="'url:require_protocol'"
          class="w-full mt-4 md:mt-0"
          icon-pack="feather"
          icon="icon-github"
          label="GitHub"
          icon-no-border
          name="github"
        />
        <span
          v-show="errors.has('github')"
          class="text-danger text-sm"
        >{{ errors.first('github') }}</span>

        <vs-input
          v-model="data_local.social_links.codepen"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-codepen"
          label="CodePen"
          icon-no-border
          name="codepen"
        />
        <span
          v-show="errors.has('codepen')"
          class="text-danger text-sm"
        >{{ errors.first('codepen') }}</span>

        <vs-input
          v-model="data_local.social_links.slack"
          v-validate="'url:require_protocol'"
          class="w-full mt-4"
          icon-pack="feather"
          icon="icon-slack"
          label="Slack"
          icon-no-border
          name="slack"
        />
        <span
          v-show="errors.has('slack')"
          class="text-danger text-sm"
        >{{ errors.first('slack') }}</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button
            class="ml-auto mt-2"
            :disabled="!validateForm"
            @click="save_changes"
          >
            Save Changes
          </vs-button>
          <vs-button
            class="ml-4 mt-2"
            type="border"
            color="warning"
            @click="reset_data"
          >
            Reset
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data_local: JSON.parse(JSON.stringify(this.data))
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    save_changes () {
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"
    },
    reset_data () {
      this.data_local = Object.assign({}, this.data)
    }
  }
}
</script>
