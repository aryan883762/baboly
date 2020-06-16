import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import navbarSearchAndPinList from '@/layouts/components/navbar/navbarSearchAndPinList'
import { defaultThemeColors, defaultThemeConfigs } from '@/models/Theme'
import { ActiveUserModule } from '@/store/modules/activeUserModule'
import { User } from '@/models/User'
import { adminMenuItems, loginMenuItems, MenuItem, profileMenuItems, publicNavMenuItems } from '@/models/Menu'

export interface IAppState {
  appName: string,
  activeUser: User,
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
  themePrimaryColor: string,
  windowWidth: null | number,
  ticketServiceCharge:any,
  ticketPaymentGetawayFee:any,
  navMenuItems :MenuItem[],

}

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const isTouchDevice = () => {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  var mq = function (query: any) {
    return window.matchMedia(query).matches
  }
  // @ts-ignore
  if (('ontouchstart' in window) || window.DocumentTouch) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public appName = process.env.VUE_APP_NAME
  public activeUser = ActiveUserModule.activeUserInfo
  public bodyOverlay = false
  public isVerticalNavMenuActive = true
  public isTouchDevice = isTouchDevice()
  public mainLayoutType = defaultThemeConfigs.mainLayoutType || 'vertical'
  public navbarSearchAndPinList = navbarSearchAndPinList
  public reduceButton = defaultThemeConfigs.sidebarCollapsed
  public verticalNavMenuWidth = 'default'
  public verticalNavMenuItemsMin = false
  public scrollY = 0
  public starredPages = navbarSearchAndPinList.pages.data.filter((page: any) => page.is_bookmarked)
  public theme = defaultThemeConfigs.theme || 'light'
  public themePrimaryColor = defaultThemeColors.primary
  public windowWidth = 0
  public ticketServiceCharge = { fix: 2, variable: 0 }
  public ticketPaymentGetawayFee = { fix: 0.30, variable: 0.03 }
  public navMenuItems = publicNavMenuItems

  @Mutation
  private CHANGE_WINDOW_BREAK_POINT (windowWidth: number) {
    if (windowWidth >= 1200) return 'xl'
    else if (windowWidth >= 992) return 'lg'
    else if (windowWidth >= 768) return 'md'
    else if (windowWidth >= 576) return 'sm'
    else return 'xs'
  }

  // Vertical NavMenu
  @Mutation
  public TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE (value: boolean) {
    this.isVerticalNavMenuActive = value
  }

  @Mutation
  public TOGGLE_REDUCE_BUTTON (val: boolean) {
    this.reduceButton = val
  }

  @Mutation
  public UPDATE_MAIN_LAYOUT_TYPE (val: string) {
    this.mainLayoutType = val
  }

  @Mutation
  public UPDATE_VERTICAL_NAV_MENU_ITEMS_MIN (val: boolean) {
    this.verticalNavMenuItemsMin = val
  }

  @Mutation
  public UPDATE_VERTICAL_NAV_MENU_WIDTH (width: string) {
    this.verticalNavMenuWidth = width
  }

  // VxAutoSuggest
  @Mutation
  public UPDATE_STARRED_PAGE (payload: any) {
    // find item index in search list this
    const index = this.navbarSearchAndPinList['pages'].data.findIndex((item: any) => item.url === payload.url)

    // update the main list
    this.navbarSearchAndPinList['pages'].data[index].is_bookmarked = payload.val

    // if val is true add it to starred else remove
    if (payload.val) {
      this.starredPages.push(this.navbarSearchAndPinList['pages'].data[index])
    } else {
      // find item index from starred pages
      const index = this.starredPages.findIndex((item: any) => item.url === payload.url)

      // remove item using index
      this.starredPages.splice(index, 1)
    }
  }

  @Mutation
  public ARRANGE_STARRED_PAGES_LIMITED (list: any) {
    const starredPagesMore = this.starredPages.slice(10)
    this.starredPages = list.concat(starredPagesMore)
  }

  @Mutation
  private ARRANGE_STARRED_PAGES_MORE (list: any) {
    let downToUp = false
    let lastItemInStarredLimited = this.starredPages[10]
    const starredPagesLimited = this.starredPages.slice(0, 10)
    this.starredPages = starredPagesLimited.concat(list)

    this.starredPages.slice(0, 10).map((i: any) => {
      if (list.indexOf(i) > -1) downToUp = true
    })

    if (!downToUp) {
      this.starredPages.splice(10, 0, lastItemInStarredLimited)
    }
  }

  @Mutation
  private UPDATE_THEME (val: string) {
    this.theme = val
  }

  @Mutation
  public TOGGLE_CONTENT_OVERLAY (val: boolean) {
    this.bodyOverlay = val
  }

  @Mutation
  private UPDATE_PRIMARY_COLOR (val: string) {
    this.themePrimaryColor = val
  }

  @Mutation
  public UPDATE_WINDOW_WIDTH (width: number) {
    this.windowWidth = width
  }

  @Mutation
  public UPDATE_WINDOW_SCROLL_Y (val: number) {
    this.scrollY = val
  }

  @Mutation
  public setActiveUser (activeUser: User) {
    this.activeUser = activeUser
  }

  // @ts-ignore
  @MutationAction({
    rawError: true,
    mutate: ['navMenuItems']
  })
  public updateNavMenuItems (user :User) {
    let navMenuItems = [...publicNavMenuItems]
    if (!user) {
      navMenuItems = [...navMenuItems, ...loginMenuItems]
    } else {
      navMenuItems = [...navMenuItems, ...profileMenuItems]
    }
    return { 'navMenuItems': navMenuItems }
  }

  // Vertical NavMenu
  @Action
  public updateVerticalNavMenuWidth (width: string) {
    this.UPDATE_VERTICAL_NAV_MENU_WIDTH(width)
  }

  // VxAutoSuggest

  @Action
  public updateStarredPage (payload: any) {
    this.UPDATE_STARRED_PAGE(payload)
  }

  // The navbar

  @Action
  public arrangeStarredPagesLimited (list: any) {
    this.ARRANGE_STARRED_PAGES_LIMITED(list)
  }

  @Action
  public arrangeStarredPagesMore (list: any) {
    this.ARRANGE_STARRED_PAGES_MORE(list)
  }

  @Action
  public ChangeWindowBreakPoint (windowWidth: number) {
    this.CHANGE_WINDOW_BREAK_POINT(windowWidth)
  }

  @Action
  public toggleContentOverlay (val: boolean) {
    this.TOGGLE_CONTENT_OVERLAY(val)
  }

  @Action
  public updateTheme (theme: string) {
    this.UPDATE_THEME(theme)
  }

  get scrollbarTag (): string {
    return this.isTouchDevice ? 'div' : 'VuePerfectScrollbar'
  }
}

export const AppModule = getModule(App)
