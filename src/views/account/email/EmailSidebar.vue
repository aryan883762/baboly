<!-- =========================================================================================
    File Name: EmailSidebar.vue
    Description: Email Application Sidebar(Filter) (Inbox)
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="email__email-sidebar h-full">
    <div class="m-6 clearfix">
      <vs-button
        class="bg-primary-gradient w-full"
        icon-pack="feather"
        icon="icon-edit"
        @click="activePrompt = true"
      >
        Compose
      </vs-button>
    </div>

    <!-- compose email -->
    <vs-prompt
      class="email-compose"
      title="New Message"
      accept-text="Send"
      :is-valid="validateForm"
      :active.sync="activePrompt"
      @cancel="clearFields"
      @accept="sendMail"
      @close="clearFields"
    >
      <component
        :is="scrollbarTag"
        :key="$vs.rtl"
        class="scroll-area p-4"
        :settings="settings"
      >
        <form @submit.prevent>
          <vs-input
            v-model="mailTo"
            v-validate="'required|email'"
            name="mailTo"
            label-placeholder="To"
            class="w-full mb-6"
            :danger="!validateForm && mailTo !== ''"
            val-icon-danger="clear"
            :success="validateForm"
            val-icon-success="done"
            :color="validateForm ? 'success' : 'danger'"
          />
          <vs-input
            v-model="mailSubject"
            name="mailSubject"
            label-placeholder="Subject"
            class="w-full mb-6"
          />
          <vs-input
            v-model="mailCC"
            name="mailCC"
            label-placeholder="CC"
            class="w-full mb-6"
          />
          <vs-input
            v-model="mailBCC"
            name="mailBCC"
            label-placeholder="BCC"
            class="w-full mb-6"
          />
          <quill-editor
            v-model="mailMessage"
            :options="editorOption"
          />
          <vs-upload
            multiple
            text="Attachments"
            :show-upload-button="false"
            class="compose-mail-attachment"
          />
        </form>
      </component>
    </vs-prompt>

    <component
      :is="scrollbarTag"
      :key="$vs.rtl"
      class="email-filter-scroll-area"
      :settings="settings"
    >
      <div class="px-6 pb-2 flex flex-col">
        <!-- inbox -->
        <router-link
          tag="span"
          :to="`${baseUrl}/inbox`"
          class="flex justify-between items-center cursor-pointer"
          :class="{'text-primary': mailFilter === 'inbox'}"
        >
          <div class="flex items-center mb-2">
            <feather-icon
              icon="MailIcon"
              :svg-classes="[{'text-primary stroke-current': mailFilter === 'inbox'}, 'h-6 w-6']"
            />
            <span class="text-lg ml-3">Inbox</span>
          </div>
          <template v-if="emailMeta.unreadMails">
            <vs-chip
              v-if="emailMeta.unreadMails.folder.inbox.length > 0"
              class="number"
              color="primary"
            >
              {{ emailMeta.unreadMails.folder.inbox.length }}
            </vs-chip>
          </template>
        </router-link>

        <!-- sent -->
        <router-link
          tag="span"
          :to="`${baseUrl}/sent`"
          class="flex items-center mt-4 mb-2 cursor-pointer"
          :class="{'text-primary': mailFilter === 'sent'}"
        >
          <feather-icon
            icon="SendIcon"
            :svg-classes="[{'text-primary stroke-current': mailFilter === 'sent'}, 'h-6 w-6']"
          />
          <span class="text-lg ml-3">Sent</span>
        </router-link>

        <!-- draft -->
        <router-link
          tag="span"
          :to="`${baseUrl}/draft`"
          class="flex justify-between items-center mt-4 cursor-pointer"
          :class="{'text-primary': mailFilter === 'draft'}"
        >
          <div class="flex items-center mb-2">
            <feather-icon
              icon="Edit2Icon"
              :svg-classes="[{'text-primary stroke-current': mailFilter === 'draft'}, 'h-6 w-6']"
            />
            <span class="text-lg ml-3">Draft</span>
          </div>
          <template v-if="emailMeta.draftMails">
            <vs-chip
              v-if="emailMeta.draftMails.length > 0"
              class="number"
              color="warning"
            >
              {{ emailMeta.draftMails.length }}
            </vs-chip>
          </template>
        </router-link>

        <!-- starred -->
        <router-link
          tag="span"
          :to="`${baseUrl}/starred`"
          class="flex items-center mt-4 mb-2 cursor-pointer"
          :class="{'text-primary': mailFilter === 'starred'}"
        >
          <feather-icon
            icon="StarIcon"
            :svg-classes="[{'text-primary stroke-current': mailFilter === 'starred'}, 'h-6 w-6']"
          />
          <span class="text-lg ml-3">Starred</span>
        </router-link>

        <!-- spam -->
        <router-link
          tag="span"
          :to="`${baseUrl}/spam`"
          class="flex items-center justify-between items-center mt-4 cursor-pointer"
          :class="{'text-primary': mailFilter === 'spam'}"
        >
          <div class="flex items-center mb-2">
            <feather-icon
              icon="InfoIcon"
              :svg-classes="[{'text-primary stroke-current': mailFilter === 'spam'}, 'h-6 w-6']"
            />
            <span class="text-lg ml-3">Spam</span>
          </div>
          <template v-if="emailMeta.unreadMails">
            <vs-chip
              v-if="emailMeta.unreadMails.folder.spam.length > 0"
              class="number"
              color="danger"
            >
              {{ emailMeta.unreadMails.folder.spam.length }}
            </vs-chip>
          </template>
        </router-link>

        <!-- trash -->
        <router-link
          tag="span"
          :to="`${baseUrl}/trash`"
          class="flex items-center mt-4 mb-2 cursor-pointer"
          :class="{'text-primary': mailFilter === 'trash'}"
        >
          <feather-icon
            icon="TrashIcon"
            :svg-classes="[{'text-primary stroke-current': mailFilter === 'trash'}, 'h-6 w-6']"
          />
          <span class="text-lg ml-3">Trash</span>
        </router-link>
      </div>
      <vs-divider />
      <div class="email__labels px-6 py-4">
        <h5 class="mb-8">
          Labels
        </h5>
        <div class="email__lables-list">
          <router-link
            v-for="(tag, index) in emailTags"
            :key="index"
            tag="span"
            class="email__label flex items-center mb-4 cursor-pointer"
            :to="`${baseUrl}/${tag.value}`"
          >
            <div
              class="ml-1 h-3 w-3 rounded-full mr-4"
              :class="'border-2 border-solid border-' + tag.color"
            />
            <span
              class="text-lg"
              :class="{'text-primary': mailFilter === tag.value}"
            >{{ tag.text }}</span>
          </router-link>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    quillEditor,
    VuePerfectScrollbar
  },
  props: {
    emailTags: {
      type: Array,
      required: true
    },
    mailFilter: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      activePrompt: false,
      mailTo: '',
      mailSubject: '',
      mailCC: '',
      mailBCC: '',
      mailMessage: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'font': [] }]
          ]
        },
        placeholder: 'Message'
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      }
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.mailTo !== ''
    },
    baseUrl () {
      const path = this.$route.path
      return path.slice(0, path.lastIndexOf('/'))
    },
    emailMeta () {
      return this.$store.state.email.meta
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    }
  },
  methods: {
    clearFields () {
      this.$nextTick(() => {
        this.mailTo = ''
        this.mailSubject = ''
        this.mailCC = ''
        this.mailBCC = ''
        this.mailMessage = ''
      })
    },
    sendMail () {
      this.clearFields()
    }
  }
}

</script>
