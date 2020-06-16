export interface MenuItem {
  name: string,
  slug?: string,
  url: string,
  i18n?: string,
  icon?:string,
  iconPack?:string,
  submenu?:SubMenuItem[],

}

export interface SubMenuItem {
  name: string
  slug?: string,
  url: string,
  i18n?: string,
  icon?:string,
  tagColor?:string,

}

export const loginMenuItems :MenuItem [] = [
  {
    url: '/login',
    name: 'Login',
    icon: 'LogInIcon',
    i18n: 'Login'
  }

]

export const publicNavMenuItems :MenuItem [] = [
  {
    url: '/events',
    name: 'Events List',
    icon: 'CalendarIcon',
    i18n: 'Events'
  },
  {
    url: '/events/create',
    name: 'Create Event',
    icon: 'babooly/calendar-add',
    iconPack: 'svg',
    i18n: 'Create Events'
  },
  {
    url: '/venues',
    name: 'Venues List',
    icon: 'MapPinIcon',
    i18n: 'Venues'
  }

]

export const profileMenuItems :MenuItem [] = [
  {
    url: '/',
    name: 'Home',
    icon: 'HomeIcon',
    i18n: 'Home'
  },
  {
    url: '/account/settings',
    name: 'Profile',
    icon: 'UserIcon',
    i18n: 'Profile'
  },
  {
    url: '/events/create',
    name: 'Create Event',
    slug: 'create-event',
    icon: 'CalendarIcon',
    i18n: 'Create Event'
  },
  {
    url: null,
    name: 'Events',
    icon: 'CalendarIcon',
    i18n: 'Events',
    submenu: [
      {
        url: '/account/events',
        name: 'Events',
        slug: 'events',
        tagColor: 'secondary',
        i18n: 'Events'
      },
      {
        url: '/account/events/calendar',
        name: 'Calendar',
        slug: 'events-simple-calendar',
        icon: 'CalendarIcon',
        tagColor: 'secondary',
        i18n: 'Calendar'
      }
    ]
  },
  {
    url: '/account/tickets',
    name: 'Tickets',
    slug: 'tickets',
    icon: 'babooly/ticket',
    iconPack: 'svg'
  },
  {
    url: '/account/orders',
    name: 'Orders',
    icon: 'FileTextIcon',
    slug: 'account-orders',
    i18n: 'Orders'
  },
  {
    url: '/account/notifications',
    icon: 'BellIcon',
    name: 'Notifications',
    slug: 'notifications',
    i18n: 'Notifications'
  },
  {
    url: '/account/email',
    name: 'Emails',
    slug: 'email',
    icon: 'MailIcon',
    i18n: 'Emails'
  },
  {
    url: '/account/chat',
    name: 'Chats',
    slug: 'chat',
    icon: 'MessageSquareIcon',
    i18n: 'Chats'
  }
]

export const adminMenuItems = [
  {
    url: '/admin/events',
    name: 'Events List',
    icon: 'CalendarIcon',
    i18n: 'Events'
  },
  {
    url: '/admin/venues',
    name: 'Venues List',
    icon: 'MapPinIcon',
    i18n: 'Venues'
  },
  {
    url: '/admin/account/settings',
    name: 'Profile & Settings',
    icon: 'UserIcon',
    i18n: 'Profile'
  },
  {
    url: '/admin/notifications',
    icon: 'BellIcon',
    name: 'Notifications',
    slug: 'notifications',
    i18n: 'Notifications'
  },
  {
    url: '/admin/orders',
    name: 'Orders',
    icon: 'FileTextIcon',
    slug: 'account-orders',
    i18n: 'Orders'
  },
  {
    url: null,
    name: 'Events',
    icon: 'CalendarIcon',
    i18n: 'Events',
    submenu: [
      {
        url: '/admin/events/create',
        name: 'Create Event',
        slug: 'create-event',
        icon: 'CalendarIcon',
        tagColor: 'success',
        i18n: 'Create Event'
      },
      {
        url: '/admin/calendar',
        name: 'Calendar',
        slug: 'calendar-simple-calendar',
        icon: 'CalendarIcon',
        tagColor: 'success',
        i18n: 'Calendar'
      },
      {
        url: '/admin/tickets',
        name: 'Tickets',
        slug: 'tickets',
        icon: 'HomeIcon'
      }
    ]
  },
  {
    url: '/admin/email',
    name: 'Email',
    slug: 'email',
    icon: 'MailIcon',
    i18n: 'Email'
  },
  {
    url: '/admin/chat',
    name: 'Chat',
    slug: 'chat',
    icon: 'MessageSquareIcon',
    i18n: 'Chat'
  }
]
