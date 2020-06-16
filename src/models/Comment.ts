import { User } from './User'

export class Comment {
  uid: string
  body: string
  mediaUrl?: string
  createdAt: string
  parentUid?: string
  repliesCount?: number
  ownerUid: string
  ownerName: string
  likesCount: number
  likes: Array<Like>
  isLiked: number
  commentsCount: number
  comments?: Array<Comment>
  author: string
  img: string
  time: Date
}

export type Like = Pick<User, 'firstName' | 'lastName' | 'uid' | 'avatar'>
