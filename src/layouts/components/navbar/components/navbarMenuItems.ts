const navbarMenuItems = [
  {
    url: null,
    name: 'Profile',
    icon: 'HomeIcon',
    i18n: 'Profile',
    submenu: [
      {
        url: '/account',
        name: 'Profile',
        slug: 'profile',
        i18n: 'Profile'
      },
      {
        url: '/account/notifications',
        name: 'Notifications',
        slug: 'notifications',
        i18n: 'Notifications'
      },
      {
        url: '/account/security',
        name: 'Security',
        slug: 'account-security',
        i18n: 'Security'
      },
      {
        url: '/account/balance',
        name: 'Balance',
        slug: 'account-balance',
        i18n: 'Balance'
      },
      {
        url: '/account/billing',
        name: 'Billing',
        slug: 'billing',
        i18n: 'Billing'
      }
    ]
  },
  {
    url: null,
    name: 'Events',
    icon: 'CalendarIcon',
    i18n: 'Events',
    submenu: [
      {
        url: '/account/events/calendar',
        name: 'Calendar',
        slug: 'calendar-simple-calendar',
        icon: 'CalendarIcon',
        tagColor: 'success',
        i18n: 'Calendar'
      },
      {
        url: '/account/events',
        name: 'Events',
        slug: 'events'
      },
      {
        url: '/account/tickets',
        name: 'Tickets',
        slug: 'tickets',
        icon: 'HomeIcon'
      }
    ]
  }
]

export default navbarMenuItems
