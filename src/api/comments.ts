import request from '@/utils/request'

export const getComments = (model: 'venue' | 'event' | 'performer', uid: string) =>
  request({
    url: `/comments/${model}/${uid}`,
    method: 'get'
  })

export const createComment = (model: 'venue' | 'event' | 'performer', uid: string, data: any) =>
  request({
    url: `/comments/${model}/${uid}`,
    method: 'post',
    data
  })

export const getComment = (model: 'venue' | 'event' | 'performer', uid: string, commentUid: string) =>
  request({
    url: `/comments/${model}/${uid}/${commentUid}`,
    method: 'get'
  })

export const createCommentReply = (model: 'venue' | 'event' | 'performer', uid: string, commentUid: string, data: any) =>
  request({
    url: `/comments/${model}/${uid}/${commentUid}`,
    method: 'post',
    data
  })

export const deleteComment = (model: 'venue' | 'event' | 'performer', uid: string, commentUid: string) =>
  request({
    url: `/comments/${model}/${uid}/${commentUid}`,
    method: 'delete'
  })

export const updateComment = (model: 'venue' | 'event' | 'performer', uid: string, commentUid: string, data: any) =>
  request({
    url: `/comments/${model}/${uid}/${commentUid}/edit`,
    method: 'post',
    data
  })

export const getCommentLikes = (model: 'venue' | 'event' | 'performer', uid: string, commentUid: string) =>
  request({
    url: `/comments/${model}/${uid}/${commentUid}/likes`,
    method: 'get'
  })

export const addCommentLike = (model: 'venue' | 'event' | 'performer', uid: string, commentUid: string) =>
  request({
    url: `/comments/${model}/${uid}/${commentUid}/like`,
    method: 'post'
  })
