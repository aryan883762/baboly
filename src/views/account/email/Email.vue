<template>
  <div
    id="email-app"
    class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      v-model="isEmailSidebarActive"
      class="items-no-padding"
      parent="#email-app"
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
    >
      <email-sidebar
        :email-tags="emailTags"
        :mail-filter="mailFilter"
        @closeSidebar="toggleEmailSidebar"
      />
    </vs-sidebar>

    <div
      :class="{'sidebar-spacer': clickNotClose}"
      class="no-scroll-content border border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0"
    >
      <!-- SEARCH BAR -->
      <div class="flex border d-theme-dark-bg items-center">
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleEmailSidebar(true)"
        />
        <vs-input
          v-model="searchQuery"
          icon-no-border
          icon="icon-search"
          size="large"
          icon-pack="feather"
          placeholder="Search Mail"
          class="vs-input-no-border vs-input-no-shdow-focus w-full"
        />
      </div>

      <!-- EMAIL ACTION BAR -->
      <div
        class="email__actions flex items-center flex-wrap justify-between p-4 border border-r-0 border-l-0 border-solid d-theme-border-grey-light"
      >
        <div class="flex items-center">
          <vs-checkbox
            v-model="selectAllCheckBox"
            icon-pack="feather"
            :icon="selectAllIcon"
            class="select-all-chexkbox ml-0"
          >
            Select All
          </vs-checkbox>
        </div>
        <div class="flex">
          <vs-dropdown
            v-if="mailFilter !== 'sent'"
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <feather-icon
              icon="FolderIcon"
              class="cursor-pointer"
              svg-classes="h-6 w-6"
            />

            <vs-dropdown-menu>
              <vs-dropdown-item
                v-if="mailFilter !== 'inbox'"
                @click="moveTo('inbox')"
              >
                <span class="flex items-center">
                  <feather-icon
                    icon="MailIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2"
                  />
                  <span>Inbox</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item
                v-if="mailFilter !== 'draft'"
                @click="moveTo('draft')"
              >
                <span class="flex items-center">
                  <feather-icon
                    icon="Edit2Icon"
                    svg-classes="h-4 w-4"
                    class="mr-2"
                  />
                  <span>Draft</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item
                v-if="mailFilter !== 'spam'"
                @click="moveTo('spam')"
              >
                <span class="flex items-center">
                  <feather-icon
                    icon="InfoIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2"
                  />
                  <span>Spam</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item
                v-if="mailFilter !== 'trash'"
                @click="moveTo('trash')"
              >
                <span class="flex items-center">
                  <feather-icon
                    icon="TrashIcon"
                    svg-classes="h-4 w-4"
                    class="mr-2"
                  />
                  <span>Trash</span>
                </span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <feather-icon
              icon="TagIcon"
              class="cursor-pointer ml-5"
              svg-classes="h-6 w-6"
            />

            <vs-dropdown-menu>
              <vs-dropdown-item
                v-for="(label, index) in emailTags"
                :key="index"
                class="whitespace-no-wrap"
                @click="updateLabels(label.value)"
              >
                <div
                  class="h-3 w-3 inline-block rounded-full mr-3"
                  :class="'bg-' + label.color"
                />
                <span>{{ label.text }}</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <feather-icon
            icon="MailIcon"
            class="ml-5 cursor-pointer"
            svg-classes="h-6 w-6"
            @click="updateMarkUnread"
          />

          <feather-icon
            v-if="mailFilter !== 'trash'"
            icon="TrashIcon"
            class="cursor-pointer ml-5"
            svg-classes="h-6 w-6"
            @click="moveTo('trash')"
          />
        </div>
      </div>

      <!-- EMAILS LIST -->
      <component
        :is="scrollbarTag"
        ref="mailListPS"
        :key="$vs.rtl"
        class="email-content-scroll-area"
        :settings="settings"
      >
        <transition-group
          name="list-enter-up"
          class="email__mails"
          tag="ul"
          appear
        >
          <li
            v-for="(mail, index) in mails"
            :key="String(mailFilter) + String(mail.id)"
            class="cursor-pointer email__mail-item"
            :style="{transitionDelay: (index * 0.1) + 's'}"
            @click="updateOpenMail(mail.id)"
          >
            <mail-item
              :mail="mail"
              :is-selected="isMailSelected(mail.id)"
              @addToSelected="addToSelectedMails"
              @removeSelected="removeSelectedMail"
            />
          </li>
        </transition-group>
      </component>
    </div>

    <!-- EMAIL VIEW SIDEBAR -->
    <email-view
      :email-tags="emailTags"
      :open-mail-id="openMailId"
      :is-sidebar-active="isSidebarActive"
      :mail-filter="mailFilter"
      @markUnread="updateSingleMarkUnread"
      @removeMail="removeOpenMail"
      @previousMail="previousMail"
      @nextMail="nextMail"
      @moveTo="moveCurrentTo"
      @closeSidebar="closeMailViewSidebar"
    />
  </div>
</template>

<script>
import EmailSidebar from './EmailSidebar.vue'
import MailItem from './MailItem.vue'
import EmailView from './EmailView.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { EmailModule } from '@/store/modules/emailModule'

export default {
  components: {
    MailItem,
    EmailSidebar,
    EmailView,
    VuePerfectScrollbar
  },
  data () {
    return {
      openMailId: null,
      selectedMails: [],
      isSidebarActive: false,
      showThread: false,
      clickNotClose: true,
      isEmailSidebarActive: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      }
    }
  },
  computed: {
    mailFilter () {
      return this.$route.params.filter
    },
    emailTags () {
      return this.$store.state.email.mailTags
    },
    searchQuery: {
      get () {
        return this.$store.state.email.mailSearchQuery
      },
      set (val) {
        this.$store.dispatch('email/setEmailSearchQuery', val)
      }
    },
    selectAllCheckBox: {
      get () {
        return this.selectedMails.length
      },
      set (value) {
        value ? this.selectedMails = this.mails.map(mail => mail.id) : this.selectedMails = []
      }
    },
    mails () {
      return this.$store.getters['email/filteredMails']
    },
    selectAllIcon () {
      return this.selectedMails.length === this.mails.length ? 'icon-check' : 'icon-minus'
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    },
    isMailSelected () {
      return (mailId) => this.selectedMails.indexOf(mailId) !== -1
    },
    windowWidth () {
      return this.$store.state.windowWidth
    }
  },
  watch: {
    isSidebarActive (value) {
      if (!value) this.showThread = false
    },
    mailFilter () {
      this.selectedMails = []

      const scrollElement = this.$refs.mailListPS.$el || this.$refs.mailListPS
      scrollElement.scrollTop = 0

      this.$store.commit('email/UPDATE_MAIL_FILTER', this.$route.params.filter)
      this.$store.dispatch('email/fetchEmails', { filter: this.$route.params.filter })
      this.toggleEmailSidebar()
    },
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  created () {
    this.$store.registerModule('email', EmailModule)
    this.setSidebarWidth()

    this.$store.commit('email/UPDATE_MAIL_FILTER', this.$route.params.filter) // Update Mail Filter
    this.$store.dispatch('email/fetchEmails', { filter: this.$route.params.filter }) // Fetch Emails From API
    this.$store.dispatch('email/fetchMeta') // Fetch Unread Mails
    this.$store.dispatch('email/fetchTags') // Fetch Mail Tags
  },
  beforeDestroy: function () {
    this.$store.unregisterModule('email')
  },
  mounted () {
    this.$store.dispatch('email/setEmailSearchQuery', '')
  },
  methods: {
    updateOpenMail (mailId) {
      this.openMailId = mailId
      this.isSidebarActive = true
    },
    addToSelectedMails (mailId) {
      if (this.selectedMails.indexOf(mailId) === -1) this.selectedMails.push(mailId)
    },
    removeSelectedMail (mailId) {
      const mailIndex = this.selectedMails.indexOf(mailId)
      if (mailIndex !== -1) this.selectedMails.splice(mailIndex, 1)
    },
    moveTo (to) {
      const payload = { emailIds: this.selectedMails, to: to }
      this.$store.dispatch('email/moveMailsTo', payload)
        .catch((error) => {
          console.error(error)
        })
      this.selectedMails = []
    },
    moveCurrentTo (to) {
      this.selectedMails = [this.openMailId]
      this.moveTo(to)
    },
    updateMarkUnread () {
      const payload = { emailIds: this.selectedMails, unreadFlag: true }
      this.$store.dispatch('email/setUnread', payload)
      this.selectedMails = []
    },
    removeOpenMail () {
      this.selectedMails = [this.openMailId]
      this.moveTo('trashed')
      this.isSidebarActive = false
    },
    toggleIsStarred () {
      const payload = { mailId: this.currentMail.id, value: !this.currentMail.isStarred }
      this.$store.dispatch('email/toggleIsMailStarred', payload)
    },
    nextMail () {
      const currentMailIndex = this.mails.findIndex((mail) => mail.id === this.openMailId)
      if (this.mails[currentMailIndex + 1]) this.openMailId = this.mails[currentMailIndex + 1].id
    },
    previousMail () {
      const currentMailIndex = this.mails.findIndex((mail) => mail.id === this.openMailId)
      if (this.mails[currentMailIndex - 1]) this.openMailId = this.mails[currentMailIndex - 1].id
    },
    updateSingleMarkUnread () {
      this.selectedMails = [this.openMailId]
      this.updateMarkUnread()
      this.isSidebarActive = false
    },
    updateLabels (label) {
      this.$store.dispatch('email/updateLabels', { mails: this.selectedMails, label: label })
      this.selectedMails = []
    },
    closeMailViewSidebar () {
      this.isSidebarActive = false
    },
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isEmailSidebarActive = this.clickNotClose = false
      } else {
        this.isEmailSidebarActive = this.clickNotClose = true
      }
    },
    toggleEmailSidebar (value = false) {
      if (!value) {
        this.closeMailViewSidebar()
        if (this.clickNotClose) {
          return
        }
      }
      this.isEmailSidebarActive = value
    }
  }
}

</script>

<style lang="scss">
  @import "@/assets/scss/vuexy/apps/email.scss";
</style>
