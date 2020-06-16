<!-- =========================================================================================
    File Name: ChatLog.vue
    Description: Chat Application - Log of chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    v-if="chatData"
    id="component-chat-log"
    class="m-8"
  >
    <div
      v-for="(msg, index) in chatData.msg"
      :key="index"
      class="msg-grp-container"
    >
      <!-- If previous msg is older than current time -->
      <template v-if="chatData.msg[index-1]">
        <vs-divider
          v-if="!isSameDay(msg.time, chatData.msg[index-1].time)"
          class="msg-time"
        >
          <span>{{ toDate(msg.time) }}</span>
        </vs-divider>
        <div
          v-if="!hasSentPreviousMsg(chatData.msg[index-1].isSent, msg.isSent)"
          class="spacer mt-8"
        />
      </template>

      <div
        class="flex items-start"
        :class="[{'flex-row-reverse' : msg.isSent}]"
      >
        <template v-if="chatData.msg[index-1]">
          <template
            v-if="(!hasSentPreviousMsg(chatData.msg[index-1].isSent, msg.isSent) || !isSameDay(msg.time, chatData.msg[index-1].time))"
          >
            <vs-avatar
              size="40px"
              class="border-2 shadow border-solid border-white m-0 flex-shrink-0"
              :class="msg.isSent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
              :src="senderImg(msg.isSent)"
            />
          </template>
        </template>

        <template v-if="index === 0">
          <vs-avatar
            size="40px"
            class="border-2 shadow border-solid border-white m-0 flex-shrink-0"
            :class="msg.isSent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
            :src="senderImg(msg.isSent)"
          />
        </template>

        <template v-if="chatData.msg[index-1]">
          <div
            v-if="!(!hasSentPreviousMsg(chatData.msg[index-1].isSent, msg.isSent) || !isSameDay(msg.time, chatData.msg[index-1].time))"
            class="mr-16"
          />
        </template>

        <div
          class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm"
          :class="{'bg-primary-gradient text-white': msg.isSent, 'border border-solid border-transparent bg-white': !msg.isSent}"
        >
          <span>{{ msg.textContent }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  computed: {
    chatData () {
      return this.$store.getters['chat/chatDataOfUser'](this.userId)
    },
    activeUserImg () {
      return this.$store.state.AppActiveUser.photoURL
    },
    senderImg () {
      return (isSentByActiveUser) => {
        if (isSentByActiveUser) return this.$store.state.AppActiveUser.photoURL
        else return this.$store.getters['chat/contact'](this.userId).photoURL
      }
    },
    hasSentPreviousMsg () {
      return (lastSender, currentSender) => lastSender === currentSender
    }
  },
  updated () {
    this.scrollToBottom()
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    isSameDay (timeTo, timeFrom) {
      const dateTimeTo = new Date(Date.parse(timeTo))
      const dateTimeFrom = new Date(Date.parse(timeFrom))
      return dateTimeTo.getFullYear() === dateTimeFrom.getFullYear() &&
          dateTimeTo.getMonth() === dateTimeFrom.getMonth() &&
          dateTimeTo.getDate() === dateTimeFrom.getDate()
    },
    toDate (time) {
      const locale = 'en-us'
      const dateObject = new Date(Date.parse(time))
      const monthName = dateObject.toLocaleString(locale, {
        month: 'short'
      })
      return dateObject.getDate() + ' ' + monthName
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
      })
    }
  }
}
</script>
