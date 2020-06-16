import request from '@/utils/request'

export const getGenres = () =>
  request({
    url: '/genres',
    method: 'get'
  })

export const getTags = () =>
  request({
    url: '/tags',
    method: 'get'
  })

export const getCategories = () =>
  request({
    url: '/categories',
    method: 'get'
  })

export const getTimezones = () =>
  request({
    url: '/timezones',
    method: 'get'
  })

export const addTag = (data: any) =>
  request({
    url: '/tags',
    method: 'post',
    data
  })

export const addGenre = (data: any) =>
  request({
    url: '/genres',
    method: 'post',
    data
  })
