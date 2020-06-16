import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ActiveUserModule } from '@/store/modules/activeUserModule'
import { Comment } from '@/models/Comment'
import { createComment, getComments, deleteComment, getComment, createCommentReply, addCommentLike } from '@/api/comments'
import store from '@/store'
import { userAvatar } from '@/api/users'

export type Post = Comment & {
  media: Array<{ img: string }>
}

export type CommentGetPayload = {
  uid: string,
  model: 'event' | 'venue'
  commentUid?: string
}

export type CommentPayload = {
  data: Comment | Post
  uid: string,
  model: 'event' | 'venue'
}
@Module({ dynamic: true, store, name: 'comments' })
class Comments extends VuexModule {
  // @ts-ignore
  @Action()
  public async getComments ({ model, uid, commentUid: postUid }: CommentGetPayload): Promise<Array<Comment>> {
    const response = await (postUid ? getComment(model, uid, postUid) : getComments('event', uid))
    const comments: Array<Comment> = (response && response.data && response.data.comments && response.data.comments.data) || []
    return Promise.all(
      comments
        .map(async comment =>
          ({
            ...comment,
            likes: await Promise.all((comment.likes || []).map(async like => ({ ...like, avatar: (await userAvatar(like.uid)) }))),
            img: (await userAvatar(comment.ownerUid))
          })
        )
    )
  }

  // @ts-ignore
  @Action()
  public async postComment (payload: CommentPayload): Promise<Array<Comment>> {
    // TODO
    // * Need Id to get comments from posts.
    // * Put comment on store and return the new data.
    const owner = ActiveUserModule.activeUserInfo
    const img = owner.avatar
    const comment: Comment = {
      ...payload.data,
      ownerUid: owner.uid,
      author: owner.name,
      img: img,
      time: new Date()
    } as Comment

    if (payload.data.parentUid) await createCommentReply('event', payload.uid, payload.data.parentUid, comment)
    else await createComment('event', payload.uid, comment)

    const response = await (payload.data.parentUid ? getComment('event', payload.uid, payload.data.parentUid) : getComments('event', payload.uid))
    const comments = (response && response.data && response.data.comments && response.data.comments.data) || []
    return comments
  }

  // @ts-ignore
  @Action()
  public async updateComment (payload: CommentPayload): Promise<Array<Comment>> {
    // TODO
    // * Need Id to get comments from posts.
    // * Put comment on store and return the new data.
    console.log('data', payload)
    const owner = ActiveUserModule.activeUserInfo
    const img = owner.avatar
    const comment: Comment = {
      ...payload.data,
      ownerUid: owner.uid,
      author: owner.name,
      img: img,
      time: new Date()
    } as Comment
    const response = payload.data.parentUid ? await getComment('event', payload.uid, payload.data.parentUid) : await getComments('event', payload.uid)
    const comments = (response && response.data && response.data.comments && response.data.comments.data) || []
    return comments
  }

  // @ts-ignore
  @Action()
  public async deleteComment (payload: CommentPayload): Promise<Array<Comment>> {
    // TODO
    // * Need Id to get comments from posts.
    // * Put comment on store and return the new data.
    console.log('data', payload)
    await deleteComment(payload.model, payload.uid, payload.data.uid)
    const response = await (payload.data.parentUid ? getComment('event', payload.uid, payload.data.parentUid) : getComments('event', payload.uid))
    return (response && response.data) || []
  }

  // @ts-ignore
  @Action()
  public async addLike ({ model, uid, data }: CommentPayload): Promise<Array<Comment>> {
    // TODO
    // * Need Id to get add like to a post.
    await addCommentLike(model, uid, data.uid)
    const response = data.parentUid ? await getComment('event', uid, data.parentUid) : await getComments('event', uid)
    const comments = (response && response.data && response.data.comments && response.data.comments.data) || []
    return comments
  }
}

export const CommentModule = getModule(Comments)
