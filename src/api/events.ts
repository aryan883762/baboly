import request from '@/utils/request'

export const getMyEvents = () =>
  request({
    url: '/me/events',
    method: 'get'
  })

export const getEvents = () =>
  request({
    url: '/events',
    method: 'get'
  })

export const getEvent = (eventUid: string) =>
  request({
    url: '/events/' + eventUid,
    method: 'get'
  })

export const getEventGuests = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/guests',
    method: 'get'
  })

export const getEventInvitees = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/invitees',
    method: 'get'
  })

export const getEventFriends = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/friends',
    method: 'get'
  })

export const getEventInterests = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/interests',
    method: 'get'
  })

export const getEventAttendees = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/attendees',
    method: 'get'
  })

export const createEvent = (data: any) =>
  request({
    url: '/events',
    method: 'post',
    data
  })

export const updateEvent = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid,
    method: 'post',
    data
  })

export const sendEventInvitation = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/invite',
    method: 'post',
    data
  })

export const sendEventInterestStatus = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/interests',
    method: 'post',
    data
  })

export const updateEventRsvpStatus = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/rsvp',
    method: 'post',
    data
  })

// Albums and Images
export const getEventCoverImage = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/cover-image',
    method: 'get'
  })

export const getEventAlbums = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/albums',
    method: 'get'
  })

export const getEventAlbum = (eventUid: string, albumUid: string) =>
  request({
    url: '/events/' + eventUid + '/albums/' + albumUid,
    method: 'get'
  })

export const createEventAlbum = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/albums',
    method: 'post',
    data
  })

export const updateEventCoverImage = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/cover-image',
    method: 'post',
    data
  })

export const updateEventAlbum = (eventUid: string, albumUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/albums/' + albumUid,
    method: 'post',
    data
  })

export const updateEventImage = (eventUid: string, albumUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/albums/' + albumUid + '/images',
    method: 'post',
    data
  })

export const deleteEventImage = (eventUid: string, albumUid: string, imageUid: string) =>
  request({
    url: '/events/' + eventUid + '/albums/' + albumUid + '/images/' + imageUid,
    method: 'delete'
  })
