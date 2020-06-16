import request from '@/utils/request'

export const me = () =>
  request({
    url: '/me',
    method: 'get'
  })

export const myInvitations = () =>
  request({
    url: '/me/invitations',
    method: 'get'
  })

export const loginUser = (data: any) =>
  request({
    url: '/auth',
    method: 'post',
    data
  })

export const loginUserByProvider = (data: any) =>
  request({
    url: '/auth/provider',
    method: 'post',
    data
  })

export const registerUser = (data: any) =>
  request({
    url: '/register',
    method: 'post',
    data
  })

export const resetPassword = (data: any) =>
  request({
    url: '/auth/reset',
    method: 'post',
    data
  })

export const updateEmail = (data: any) =>
  request({
    url: '/auth/email',
    method: 'post',
    data
  })

export const updateName = (data: any) =>
  request({
    url: '/auth/name',
    method: 'post',
    data
  })
export const updatePassword = (data: any) =>
  request({
    url: '/auth/password',
    method: 'post',
    data
  })

export const sendResetPasswordLink = (data: any) =>
  request({
    url: '/auth/reset-password',
    method: 'post',
    data
  })

export const getFollowers = () =>
  request({
    url: '/followers',
    method: 'get'
  })

export const responseFollowingRequest = (data: any) =>
  request({
    url: '/followers-response',
    method: 'post',
    data
  })

export const followingRequest = (data: any) =>
  request({
    url: '/follow-request',
    method: 'post',
    data
  })

export const updateInvitation = (invitationUid: string, data: any) =>
  request({
    url: '/invitation/' + invitationUid,
    method: 'post',
    data
  })

export const responseInvitation = (invitationUid: string, data: any) =>
  request({
    url: '/invitation/' + invitationUid + '/rsvp',
    method: 'post',
    data
  })

const bufferToBase64 = (buf) =>
  btoa(
    Array.prototype.map.call(buf, function (ch) {
      return String.fromCharCode(ch)
    }).join('')
  )

// Albums and Images
export const userAvatar = async (userUid: string) =>
  `data:image/png;base64,${
    bufferToBase64(
      (await request({
        url: '/avatar/' + userUid,
        method: 'get'
      }) || {}).data
    )
  }`

export const userCoverImage = () =>
  request({
    url: '/cover-image',
    method: 'get'
  })

export const userAlbums = () =>
  request({
    url: '/albums',
    method: 'get'
  })

export const userAlbum = (albumUid: string) =>
  request({
    url: '/albums/' + albumUid,
    method: 'get'
  })

export const createUserAlbum = (data: any) =>
  request({
    url: '/albums',
    method: 'post',
    data
  })

export const updateUserCoverImage = (data: any) =>
  request({
    url: '/cover-image',
    method: 'post',
    data
  })

export const updateUserAlbum = (albumUid: string, data: any) =>
  request({
    url: '/albums/' + albumUid,
    method: 'post',
    data
  })
export const updateUserImage = (albumUid: string, data: any) =>
  request({
    url: '/albums/' + albumUid + '/images',
    method: 'post',
    data
  })

export const deleteUserImage = (imageUid: string, albumUid: string) =>
  request({
    url: '/albums/' + albumUid + '/images/' + imageUid,
    method: 'delete'
  })
