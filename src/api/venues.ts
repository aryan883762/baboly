import request from '@/utils/request'

export const getVenues = () =>
  request({
    url: '/venues',
    method: 'get'
  })

export const getVenue = (venueUid: string) =>
  request({
    url: '/venues/' + venueUid,
    method: 'get'
  })

export const getVenueEvents = (venueUid: string) =>
  request({
    url: '/venues/' + venueUid + '/events',
    method: 'get'
  })

export const getVenueFollowers = (venueUid: string) =>
  request({
    url: '/venues/' + venueUid + '/followers',
    method: 'get'
  })

export const createVenue = (data: any) =>
  request({
    url: '/venues',
    method: 'post',
    data
  })

export const updateVenue = (venueUid: string, data: any) =>
  request({
    url: '/venues/' + venueUid,
    method: 'post',
    data
  })

export const followVenue = (venueUid: string, data: any) =>
  request({
    url: '/venues/' + venueUid + '/follow',
    method: 'post',
    data
  })

// Albums and Images
export const getVenueCoverImage = (venueUid: string) =>
  request({
    url: '/venues/' + venueUid + '/cover-image',
    method: 'get'
  })

export const getVenueAlbums = (venueUid: string) =>
  request({
    url: '/venues/' + venueUid + '/albums',
    method: 'get'
  })

export const getVenueAlbum = (venueUid: string, albumUid: string) =>
  request({
    url: '/venues/' + venueUid + '/albums/' + albumUid,
    method: 'get'
  })

export const createVenueAlbum = (venueUid: string, data: any) =>
  request({
    url: '/venues/' + venueUid + '/albums',
    method: 'post',
    data
  })

export const updateVenueCoverImage = (venueUid: string, data: any) =>
  request({
    url: '/venues/' + venueUid + '/cover-image',
    method: 'post',
    data
  })

export const updateVenueAlbum = (venueUid: string, albumUid: string, data: any) =>
  request({
    url: '/venues/' + venueUid + '/albums/' + albumUid,
    method: 'post',
    data
  })

export const updateVenueImage = (venueUid: string, albumUid: string, data: any) =>
  request({
    url: '/venues/' + venueUid + '/albums/' + albumUid + '/images',
    method: 'post',
    data
  })

export const deleteVenueImage = (venueUid: string, albumUid: string, imageUid: string) =>
  request({
    url: '/venues/' + venueUid + '/albums/' + albumUid + '/images/' + imageUid,
    method: 'delete'
  })
