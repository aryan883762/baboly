import { User } from '@/models/User'

export interface App {
  AppActiveUser: User
  bodyOverlay: boolean,
  isVerticalNavMenuActive: boolean,
  isTouchDevice: boolean,
  mainLayoutType: string,
  navbarSearchAndPinList: {},
  reduceButton: boolean
  verticalNavMenuWidth: string,
  verticalNavMenuItemsMin: boolean,
  scrollY: number,
  starredPages: {},
  theme: string,
  themePrimaryColor: boolean,
  windowWidth: null | number
}
