export interface Theme {
  disableCustomizer: boolean // options[Boolean] : true, false(default)
  disableThemeTour: boolean // options[Boolean] : true, false(default)
  footerType: string // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: boolean // options[Boolean] : true, false(default)
  mainLayoutType: string // options[String]  : vertical(default) / horizontal
  navbarColor: string // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: string // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: string // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  rtl: boolean // options[Boolean] : true, false(default)
  sidebarCollapsed: boolean // options[Boolean] : true, false(default)
  theme: string // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: any
}

export const defaultThemeConfigs: Theme = {
  disableCustomizer: true, // options[Boolean] : true, false(default)
  disableThemeTour: true, // options[Boolean] : true, false(default)
  footerType: 'static', // options[String]  : static(default) / sticky / hidden
  hideScrollToTop: false, // options[Boolean] : true, false(default)
  mainLayoutType: 'horizontal', // options[String]  : vertical(default) / horizontal
  navbarColor: '#fff', // options[String]  : HEX color / rgb / rgba / Valid HTML Color name - (default: #fff)
  navbarType: 'sticky', // options[String]  : floating(default) / static / sticky / hidden
  routerTransition: 'zoom-fade', // options[String]  : zoom-fade / slide-fade / fade-bottom / fade / zoom-out / none(default)
  rtl: false, // options[Boolean] : true, false(default)
  sidebarCollapsed: false, // options[Boolean] : true, false(default)
  theme: 'light', // options[String]  : "light"(default), "dark", "semi-dark"

  // Not required yet - WIP
  userInfoLocalStorageKey: 'userInfo'

  // NOTE: themeTour will be disabled in screens < 1200. Please refer docs for more info.
}

export interface ThemeColors {
  primary: string
  success: string
  danger: string
  warning: string
  dark: string
}

export const defaultThemeColors: ThemeColors = {
  primary: '#7367F0',
  success: '#28C76F',
  danger: '#EA5455',
  warning: '#FF9F43',
  dark: '#1E1E1E'
}
