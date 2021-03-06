<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <!-- Avatar Row -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img
            :src="data.avatar"
            class="mr-8 rounded h-24 w-24"
          >
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">
              {{ data.name }}
            </p>
            <input
              ref="update_avatar_input"
              type="file"
              class="hidden"
              accept="image/*"
              @change="update_avatar"
            >

            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
            <vs-button class="mr-4 mb-4">
              Change Avatar
            </vs-button>
            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->

            <vs-button
              type="border"
              color="danger"
            >
              Remove Avatar
            </vs-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input
          v-model="data_local.username"
          v-validate="'required|alpha_num'"
          class="w-full mt-4"
          label="Username"
          name="username"
        />
        <span
          v-show="errors.has('username')"
          class="text-danger text-sm"
        >{{ errors.first('username') }}</span>

        <vs-input
          v-model="data_local.name"
          v-validate="'required|alpha_spaces'"
          class="w-full mt-4"
          label="Name"
          name="name"
        />
        <span
          v-show="errors.has('name')"
          class="text-danger text-sm"
        >{{ errors.first('name') }}</span>

        <vs-input
          v-model="data_local.email"
          v-validate="'required|email'"
          class="w-full mt-4"
          label="Email"
          type="email"
          name="email"
        />
        <span
          v-show="errors.has('email')"
          class="text-danger text-sm"
        >{{ errors.first('email') }}</span>
      </div>

      <div class="vx-col md:w-1/2 w-full">
        <div class="mt-4">
          <label class="vs-input--label">Status</label>
          <v-select
            v-model="status_local"
            v-validate="'required'"
            :clearable="false"
            :options="statusOptions"
            name="status"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span
            v-show="errors.has('status')"
            class="text-danger text-sm"
          >{{ errors.first('status') }}</span>
        </div>

        <div class="mt-4">
          <label class="vs-input--label">Role</label>
          <v-select
            v-model="role_local"
            v-validate="'required'"
            :clearable="false"
            :options="roleOptions"
            name="role"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
          />
          <span
            v-show="errors.has('role')"
            class="text-danger text-sm"
          >{{ errors.first('role') }}</span>
        </div>

        <vs-input
          v-model="data_local.company"
          v-validate="'alpha_spaces'"
          class="w-full mt-4"
          label="Company"
          name="company"
        />
        <span
          v-show="errors.has('company')"
          class="text-danger text-sm"
        >{{ errors.first('company') }}</span>
      </div>
    </div>

    <!-- Permissions -->
    <vx-card
      class="mt-base"
      no-shadow
      card-border
    >
      <div class="vx-row">
        <div class="vx-col w-full">
          <div class="flex items-end px-3">
            <feather-icon
              svg-classes="w-6 h-6"
              icon="LockIcon"
              class="mr-2"
            />
            <span class="font-medium text-lg leading-none">Permissions</span>
          </div>
          <vs-divider />
        </div>
      </div>

      <div class="block overflow-x-auto">
        <table class="w-full">
          <tr>
            <!--
              You can also use `Object.keys(Object.values(data_local.permissions)[0])` this logic if you consider,
              our data structure. You just have to loop over above variable to get table headers.
              Below we made it simple. So, everyone can understand.
             -->
            <th
              v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']"
              :key="heading"
              class="font-semibold text-base text-left px-3 py-2"
            >
              {{ heading }}
            </th>
          </tr>

          <tr
            v-for="(val, name) in data_local.permissions"
            :key="name"
          >
            <td class="px-3 py-2">
              {{ name }}
            </td>
            <td
              v-for="(permission, name) in val"
              :key="name+permission"
              class="px-3 py-2"
            >
              <vs-checkbox v-model="val[name]" />
            </td>
          </tr>
        </table>
      </div>
    </vx-card>

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
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),

      statusOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Blocked', value: 'blocked' },
        { label: 'Deactivated', value: 'deactivated' }
      ],
      roleOptions: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Staff', value: 'staff' }
      ]
    }
  },
  computed: {
    status_local: {
      get () {
        return { label: this.capitalize(this.data_local.status), value: this.data_local.status }
      },
      set (obj) {
        this.data_local.status = obj.value
      }
    },
    role_local: {
      get () {
        return { label: this.capitalize(this.data_local.role), value: this.data_local.role }
      },
      set (obj) {
        this.data_local.role = obj.value
      }
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    capitalize (str) {
      return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
    },
    save_changes () {
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"
    },
    reset_data () {
      this.data_local = JSON.parse(JSON.stringify(this.data))
    },
    update_avatar () {
      // You can update avatar Here
      // For reference you can check dataList example
      // We haven't integrated it here, because data isn't saved in DB
    }
  }
}
</script>
