
export interface TicketTypeMap {
  [key:number]: string
}
export const ticketTypesMap: TicketTypeMap = {
  0: 'No Ticket',
  1: 'Internal',
  2: 'Rsvp',
  3: 'External'
}

export interface TicketSetting {

  ticketType:number,
  ticketUrl:string,
  currency:string,
  currencySign:string,
  country:string,
  isFree:string,
  showRemaining:string,
  extraCharge:string,
  extraChargeType:string,
  saleStartAt:string,
  saleEndAt:string,
  saleStartAtUtc:string,
  saleEndAtUtc:string,
  lowestPrice:string,
  highestPrice:string,
}

export interface Ticket {
  title: string,
  price: number,
  quantity: number,
  description: string,
  fee: number,
  feeAbsorbed: number,
  salesPrice: number,
}

export function emptyTicket (): Ticket {
  return {
    title: '',
    price: 0,
    quantity: 0,
    description: '',
    fee: 0,
    feeAbsorbed: 0,
    salesPrice: 0
  }
}
