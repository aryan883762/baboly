<template>
  <div class="commented-user items-center">
    <div class="flex">
      <div class="mr-3">
        <vs-avatar
          :src="comment.img"
          size="37px"
        />
      </div>
      <div class="flex flex-col w-full">
        <div class="leading-tight">
          <feather-icon
            v-show="isMyComment && !showCommentOptions"
            class="horizontalIcon cursor-pointer"
            icon="MoreHorizontalIcon"
            svg-classes="h-5 w-5"
            @mouseover="showCommentOptions = true"
          />
          <vs-button
            v-if="isMyComment"
            v-show="showCommentOptions"
            icon="remove"
            class="horizontalIcon cursor-pointer"
            style="right: 30px"
            size="small"
            color="danger"
            radius
            @mouseleave="showCommentOptions = false"
            @click="onDelete(comment)"
          />
          <p class="author">
            {{ comment.ownerName || comment.author }} <span class="ml-3">{{ commentCreatedAt }}</span>
          </p>
          <span class="comment-body">{{ comment.body }}</span>
          <div class="ml-auto">
            <div class="like-count">
              <feather-icon
                icon="HeartIcon"
                svg-classes="h-4 w-4"
                class="mr-2 ml-2 mt-1 cursor-pointer"
              />
              <span class="text-count mt-1">{{ comment.likes && comment.likes.length || 0 }}</span>
            </div>
          </div>
        </div>
        <div class="action-like-reply font-medium text-black ml-3 mt-3">
          <span
            class="cursor-pointer"
            @click="onLikeStateChange(comment)"
          >
            {{ iveLiked(comment) ? 'Dislike' : 'Like' }}</span>
          <span
            v-if="allowReply"
            :id="comment.uid"
            class="ml-5 cursor-pointer"
            @click="replyToId=comment.uid"
          >
            Reply</span>
        </div>
      </div>
    </div>
    <div
      v-if="allowReply"
      class="comments-container mt-4"
      style="padding-left: 35px"
    >
      <div
        v-if="comment.uid === replyToId"
        class="flex mb-3 mt-2"
      >
        <div>
          <vs-avatar
            :src="userInfo.avatar"
            size="37px"
          />
        </div>
        <div class="w-11/12 pl-3 pr-2 comment-section-textarea">
          <vs-textarea
            v-model="replyBody"
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
            @click="onCommentReply"
          >
            Send
          </vs-button>
        </div>
      </div>
      <Comment
        v-for="(reply, index) in orderedComments"
        :key="index"
        :post-uid="postUid"
        :comment="reply"
        :user-info="userInfo"
        @on-reply="onReply"
        @on-delete="onChildDelete(index)"
        @on-like-state-change="onLikeStateChange"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { Comment } from '@/models/Comment'
import { CommentModule } from '@/store/modules/commentsModule'
import { ActiveUserModule } from '@/store/modules/activeUserModule'
import { User } from '@/models/User'
import moment from 'moment'

@Component({
  name: 'Comment',
  components: {
    Comment: () => import('./Comment.vue')
  }
})
export default class extends Vue {
  @Prop({ required: true })
  private postUid!: string
  @Prop({ required: true })
  private comment!: Comment
  @Prop({ required: true })
  private userInfo!: User

  private showCommentOptions: boolean = false
  private replyBody: string = ''
  private replyToId: number = null

  get commentCreatedAt (): string {
    return moment(this.comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')
  }

  get allowReply (): boolean {
    return this.postUid === this.comment.parentUid
  }

  get isMyComment (): boolean {
    return this.userInfo && this.userInfo.uid === this.comment.ownerUid
  }

  get iveLiked (): (comment: Comment) => boolean {
    return comment => (
      !!((this.comment.likes || []).find(commentLiked => commentLiked.uid === this.userInfo.uid))
    )
  }

  onChildDelete (index: number) {
    return this.onDelete(this.comment.comments[index])
  }

  onCommentReply () {
    const comment = {
      parentUid: this.comment.uid,
      body: this.replyBody
    } as Comment
    this.replyBody = this.replyToId = null
    return this.onReply(comment)
  }

  @Emit()
  onReply (comment: Comment) {
    return comment
  }

  @Emit()
  onLikeStateChange (comment: Comment) {
    if (!this.iveLiked(comment)) {
      comment.likes = (this.comment.likes || []).concat({
        avatar: this.userInfo.avatar,
        uid: this.userInfo.uid,
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName
      })
    } else { comment.likes.splice(comment.likes.findIndex(elm => elm.uid === this.userInfo.uid), 1) }
    return comment
  }

  get orderedComments (): Array<Comment> {
    return this.comment.comments
      .sort(({ createdAt: createdAtA }, { createdAt: createdAtB }) =>
        new Date(createdAtB).getTime() - new Date(createdAtA).getTime()
      )
  }

  @Emit()
  onDelete (comment: Comment) {
    return comment
  }
}

</script>
