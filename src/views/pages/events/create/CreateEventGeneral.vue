<template>
  <div class="p-5">
    <p class="text-lg font-medium">
      Your Email
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <vs-input
        v-model="email"
        v-validate="'required|email'"
        label=""
        class="w-full"
        name="email"
      />
      <span class="text-danger">{{ errors.first('email') }}</span>
    </vs-row>

    <p class="text-lg font-medium">
      Event Title
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <p class="text-sm">
        Write a short, snappy title for your event
      </p>
      <vs-input
        v-model="event.title"
        v-validate="'required|alpha_spaces'"
        label=""
        class="w-full"
        name="title"
      />
      <span class="text-danger">{{ errors.first('step-2.title') }}</span>
    </vs-row>

    <p class="text-lg font-medium">
      Event Time
    </p>
    <vs-divider />
    <TimeSelector
      class="mb-10"
      :event="event"
    />

    <p class="text-lg font-medium">
      Event Description
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <p class="text-sm pb-5">
        For a good description, Make it easy to read and explain your agendas, sessions, activities
      </p>

      <div class="w-full mb-10">
        <quill-editor
          v-model="event.description"
          class="h-64 "
          :options="editorOption"
        />
        <span class="text-dan2ger">{{ errors.first('step-2.description') }}</span>
      </div>
    </vs-row>

    <p class="text-lg font-medium">
      Event Cover Image
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <div class="centerx w-full">
        <vs-upload
          automatic
          single-upload
          limit="1"
          accept="['PNG','JPG']"
          text="Upload coverimage"
          action="https://jsonplaceholder.typicode.com/posts/"
          @on-success="uploadComplete()"
        />
      </div>

      <span class="text-danger">{{ errors.first('step-2.coverimage') }}</span>
    </vs-row>

    <!-- TAGS SELECTOR -->
    <p class="text-lg font-medium">
      Event Tags
    </p>
    <vs-divider />
    <vs-row class="mb-10">
      <vs-chips
        v-model="tags"
        v-validate="'required'"
        name="tags"
        color="rgb(145, 32, 159)"
        class="w-full"
        placeholder="Add Tags"
      >
        <vs-chip
          v-for="tag in tags"
          :key="tag"
          class="p-1 m-1"
          color="secondary"
          closable
          @click="deleteTag(tag)"
        >
          #{{ tag }}
        </vs-chip>
      </vs-chips>
      <span class="text-danger">{{ errors.first('step-2.tags') }}</span>
    </vs-row>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Event } from '@/models/Event'
// import TimeSelector from './TimeSelector.vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import TimeSelector from '@/views/pages/events/create/TimeSelector.vue'

  @Component({
    name: 'CreateEventGeneral',
    components: {
      quillEditor,
      TimeSelector
    }
  })
export default class CreateEventGeneral extends Vue {
    @Prop() private event!: Event
    private tags: string [] = []
    private counterDanger: boolean = false
    private editorOption: any = {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'font': [] }]
        ]
      },
      placeholder: 'Message'
    }
    private uploadComplete () {
      this.event.coverImage = 'https://picsum.photos/seed/coverImage/200/300'
      this.$vs.notify({
        title: 'Okay',
        text: 'Upload Complete!',
        color: 'success' // (response.code === 200) ? 'success' : 'danger'
      })
    }

    private deleteTag (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
}

</script>

<style lang="scss">
  .con-input-upload {
    width: 100%;
  }

  .con-img-upload .img-upload {

    width: 100% !important;
  }
</style>
