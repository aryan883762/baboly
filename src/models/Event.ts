import { Category } from '@/models/Category'
import { Tag } from '@/models/Tag'

export interface Event {
  uid: string,
  title: string,
  description: string,
  coverImage:string,
  timezoneId: string,
  startTime: string,
  endTime: string,
  startTimeUtc: string,
  endTimeUtc: string,
  isPublished: number,
  createdAt: string,
  deletedAt: string,
  hasEndTime: number,
  distance: number,
  isOwner: number,
  url: string,
  canShare: number,
  hasAccess: number,
  isPrivate: number,
  guestListEnabled: number,
  canInvite: number,
  category: Category,
  tags: Tag[],
}

export const emptyEvent: Event = {
  uid: '',
  title: '',
  description: '',
  coverImage: '',
  timezoneId: '',
  startTime: '',
  endTime: '',
  startTimeUtc: '',
  endTimeUtc: '',
  isPublished: 0,
  createdAt: '',
  deletedAt: '',
  hasEndTime: 0,
  distance: 0,
  isOwner: 0,
  url: '',
  canShare: 0,
  hasAccess: 0,
  isPrivate: 0,
  guestListEnabled: 0,
  canInvite: 0,
  category: null,
  tags: []

}
export interface frmEvent {
  token: string;
  category: string;
  title: string;
  description: string;
  timezoneId: string;
  startTime: string;
  tags: string;
  eventUrl: string;
  facebookUrl: string;
}
