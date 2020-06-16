import request from '@/utils/request'

export const getEventTickets = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/tickets',
    method: 'get'
  })

export const getEventTicket = (eventUid: string, ticketUid: string) =>
  request({
    url: '/events/' + eventUid + '/tickets/' + ticketUid,
    method: 'get'
  })

export const getEventTicketSettings = (eventUid: string) =>
  request({
    url: '/events/' + eventUid + '/ticket-settings',
    method: 'get'
  })

export const updateEventTicketSettings = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/ticket-settings',
    method: 'post',
    data
  })

export const createEventTicket = (eventUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/tickets',
    method: 'post',
    data
  })

export const updateEventTicket = (eventUid: string, ticketUid: string, data: any) =>
  request({
    url: '/events/' + eventUid + '/tickets/' + ticketUid,
    method: 'post',
    data
  })

export const deleteEventTicket = (eventUid: string, ticketUid: string) =>
  request({
    url: '/events/' + eventUid + '/tickets/' + ticketUid,
    method: 'delete'
  })
