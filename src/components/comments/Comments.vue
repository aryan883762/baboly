<template>
  <div class="comments-container mt-4">
    <div class="flex mb-3">
      <div>
        <vs-avatar
          :src="userInfo.avatar"
          size="37px"
        />
      </div>
      <div class="w-11/12 pl-3 pr-2 comment-section-textarea">
        <vs-textarea
          v-model="commentBox"
          v-validate="'required'"
          name="commentBox"
          type="email"
          class="mb-2 comment-textarea"
          placeholder="Type your comment..."
        />
        <feather-icon
          class="mr-2"
          icon="PaperclipIcon"
          svg-classes="h-5 w-5"
        />
      </div>
      <div class="w-auto send-button">
        <vs-button
          size="normal"
          color="secondary"
          type="filled"
          :disabled="!validateForm"
          @click="onNewComment"
        >
          Send
        </vs-button>
      </div>
    </div>
    <Comment
      v-for="(comment, index) in post.comments"
      :key="index"
      class="commented-user  items-center mb-4"
      :comment="comment"
      :user-info="userInfo"
      :post-uid="post.uid"
      @on-like-state-change="onLikeStateChange"
      @on-reply="postComment"
      @on-delete="onCommentDelete"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CommentModule, Post } from '@/store/modules/commentsModule'
import CommentComponent from './Comment.vue'
import moment from 'moment'
import { Comment } from '@/models/Comment'
import { User } from '@/models/User'

  @Component({
    name: 'Comments',
    components: {
      Comment: CommentComponent
    }
  })
export default class extends Vue {
    @Prop({ required: true })
    private userInfo: User
    @Prop({ default: 'event' })
    private model!: 'event' | 'venue'
    @Prop({ required: true })
    private modelUid!: string
    @Prop({ required: true })
    private post!: Post

    private counterDanger = false
    private commentBox = ''

    async created () {
      this.counterDanger = true
      await this.fetchComments()
    }

    private async postComment (data: Comment): Promise<void> {
      await this.wrapAsync(
        Promise.all([
          await CommentModule.postComment({ data, uid: this.modelUid, model: this.model })
        ]),
        'Comment posted !',
        'Error on post comment !'
      )
      await this.fetchComments()
    }

    async onLikeStateChange (comment: Comment) {
      await CommentModule.addLike(({ data: comment, uid: this.modelUid, model: this.model }))
      await this.fetchComments()
    }

    async onNewComment () {
      const newComment = {
        parentUid: this.post.uid,
        body: this.commentBox,
        img: this.userInfo.avatar,
        mediaUrl: this.userInfo.avatar
      } as Comment
      await this.postComment(newComment)
      this.commentBox = ''
    }

    async onCommentDelete (comment: Comment): Promise<void> {
      await this.wrapAsync(
        CommentModule.deleteComment({ data: comment, uid: this.modelUid, model: this.model }),
        'Coment deleted !',
        'Error on delete comment !'
      )
      await this.fetchComments()
    }

    async wrapAsync (promise: Promise<any>, successMessage: string, errorMessage: string) {
      return promise.then(response => {
        this.$vs.notify({
          title: 'Okay',
          text: successMessage,
          color: 'success'
        })
        return response
      })
        .catch(() =>
          this.$vs.notify({
            title: 'Error',
            text: errorMessage,
            color: 'danger'
          })
        )
    }

    async fetchComments () {
      this.post.comments = (await CommentModule.getComments({ model: this.model, uid: this.modelUid, commentUid: this.post.uid }))
        .sort(({ createdAt: createdAtA }, { createdAt: createdAtB }) =>
          new Date(createdAtB).getTime() - new Date(createdAtA).getTime()
        )
    }

    get validateForm () {
      // @ts-ignore
      return !this.errors.any() && this.commentBox !== ''
    }
}
</script>
