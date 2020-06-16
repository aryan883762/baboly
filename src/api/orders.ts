import request from '@/utils/request'

export const getMyTicketOrders = () =>
  request({
    url: '/me/ticket-orders',
    method: 'get'
  })

export const getMySingleTicketOrder = (ticketOrder: string) =>
  request({
    url: '/me/ticket-orders/' + ticketOrder,
    method: 'get'
  })

export const createTicketOrders = (data: any) =>
  request({
    url: '/ticket-orders',
    method: 'post',
    data
  })

export const updateTicketOrders = (data: any) =>
  request({
    url: '/ticket-orders/' + data.ticketOrderUid,
    method: 'post',
    data
  })

export const submitTicketOrder = (data: any) =>
  request({
    url: '/ticket-orders/' + data.ticketOrderUid + '/submit',
    method: 'post',
    data
  })

export const checkinTicket = (data: any) =>
  request({
    url: '/ticket-orders/' + data.ticketOrderUid + '/check-in',
    method: 'post',
    data
  })

export const checkinBarcode = (data: any) =>
  request({
    url: '/ticket-orders/barcode-check-in',
    method: 'post',
    data
  })
