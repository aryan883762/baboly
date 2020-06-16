import Vue from 'vue'
import Router from 'vue-router'
import firebase, { auth } from 'firebase/app'
import 'firebase/auth'
import { AuthModule } from '@/store/modules/authModule'
import { ActiveUserModule } from '@/store/modules/activeUserModule'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "redirect" */ '@/layouts/FullPage.vue'),
      children: [
        {
          path: '/',
          component: () => import('@/views/pages/Home.vue'),
          meta: {
            pageTitle: 'Home',
            rule: 'public'

          }
        }
      ]
    },
    {
      // =============================================================================
      // Dashboatrd LAYOUT ROUTES
      // =============================================================================
      path: '/account',
      component: () => import(/* webpackChunkName: "redirect" */ '@/layouts/Account.vue'),
      meta: {
        rule: 'customer',
        requiresAuth: true
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          redirect: '/account/settings',
          meta: {
            rule: 'customer'
          }
        },
        {
          path: 'settings',
          component: () => import('@/views/account/settings/UserSettings.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Profile' },
              { title: 'Account Settings', active: true }
            ],
            pageTitle: 'Account Settings',
            rule: 'customer'
          }
        },
        {
          path: 'orders',
          component: () => import('@/views/account/Orders.vue'),
          meta: {
            rule: 'customer'
          }
        },
        {
          path: 'payment-methods',
          component: () => import('@/views/account/PaymentMethods.vue'),
          meta: {
            rule: 'customer'
          }
        },
        {
          path: 'notifications',
          component: () => import('@/views/account/Notifications.vue'),
          meta: {
            rule: 'customer'
          }
        },
        {
          path: 'events',
          component: () => import('@/views/account/events/EventsListView.vue'),
          meta: {
            pageTitle: 'Account Settings',
            rule: 'customer'
          },
          children: [
            {
              path: 'calendar',
              component: () => import('@/views/account/events/SimpleCalendar.vue'),
              meta: {
                rule: 'customer'
              }
            },
            {
              path: ':uid',
              component: () => import('@/views/account/events/EventView.vue'),
              children: [
                {
                  path: 'edit',
                  component: () => import('@/views/account/events/EventEdit.vue'),
                  meta: {
                    rule: 'customer'
                  }
                }
              ]
            }
          ]
        },
        {
          path: 'tickets',
          component: () => import('@/views/account/tickets/TicketsListView.vue'),
          meta: {
            rule: 'customer'
          },
          children: [
            {
              path: ':uid',
              component: () => import('@/views/account/tickets/TicketView.vue'),
              meta: {
                rule: 'customer'
              }
            }
          ]
        },
        {
          path: 'email',
          redirect: 'email/inbox',
          name: 'email',
          meta: {
            rule: 'customer'
          }
        },
        {
          path: 'email/:filter',
          component: () => import('@/views/account/email/Email.vue'),
          meta: {
            rule: 'customer',
            parent: 'email',
            no_scroll: true
          }
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/views/account/chat/Chat.vue'),
          meta: {
            rule: 'customer',
            no_scroll: true
          }
        }
      ]
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import(/* webpackChunkName: "redirect" */ '@/layouts/MainLayout.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/events/create',
          name: 'create-event',
          component: () => import('@/views/pages/events/create/CreateEvent.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/events',
          component: () => import('@/views/pages/events/Events.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/events/:uid/:slug?',
          name: 'event-details',
          component: () => import('@/views/pages/events/EventDetails.vue'),
          props: true,
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/venues',
          component: () => import('@/views/pages/venues/Venues.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Venues', active: true }
            ],
            pageTitle: 'Venues',
            rule: 'public'
          }
        },
        {
          path: '/venues/:uid/:slug?',
          name: 'venue-details',
          component: () => import('@/views/pages/venues/VenueDetails.vue'),
          props: true,
          meta: {
            rule: 'public'
          },
          children: [
            {
              path: 'overview',
              name: 'venue-overview',
              component: () => import('@/views/pages/venues/components/Overview.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: 'events',
              name: 'venue-events',
              component: () => import('@/views/pages/venues/components/Events.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: 'booking',
              name: 'venue-booking',
              component: () => import('@/views/pages/venues/components/Booking.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: 'images',
              name: 'venue-images',
              component: () => import('@/views/pages/venues/components/Images.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: 'comments',
              name: 'venue-comments',
              component: () => import('@/views/pages/venues/components/Comments.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: 'reviews',
              name: 'venue-reviews',
              component: () => import('@/views/pages/venues/components/Reviews.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: 'q&a',
              name: 'venue-qa',
              component: () => import('@/views/pages/venues/components/Q&A.vue'),
              props: true,
              meta: {
                rule: 'public'
              }
            },
            {
              path: '',
              redirect: 'overview'
            }

          ]
        }
      ]
    },
    // =============================================================================
    // Admin ROUTES
    // =============================================================================
    {
      path: '/admin',
      component: () => import(/* webpackChunkName: "redirect" */ '@/layouts/Account.vue'),
      meta: {
        rule: 'admin'
        // requiresAuth: true,
        // adminAuth: true,
        // customerAuth: false
      },
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/Dashboard.vue'),
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          // =============================================================================
          // Dashboatrd LAYOUT ROUTES
          // =============================================================================
          path: 'account/settings',
          component: () => import('@/views/account/settings/UserSettings.vue'),
          meta: {
            pageTitle: 'Account Settings',
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'calendar',
          component: () => import('@/views/account/events/SimpleCalendar.vue'),
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'tickets',
          component: () => import('@/views/account/tickets/TicketsListView.vue'),
          meta: {
            rule: 'admin',
            requiresAuth: true,
            adminAuth: true,
            customerAuth: false
          }
        },
        {
          path: 'tickets/:uid',
          component: () => import('@/views/account/tickets/TicketView.vue'),
          meta: {
            rule: 'admin',
            requiresAuth: true,
            adminAuth: true,
            customerAuth: false
          }
        },
        {
          path: 'events',
          component: () => import('@/views/pages/events/Events.vue'),
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'notifications',
          component: () => import('@/views/account/Notifications.vue'),
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'orders',
          component: () => import('@/views/account/Orders.vue'),
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'events/:uid/:slug?',
          name: 'event-details',
          component: () => import('@/views/pages/events/EventDetails.vue'),
          props: true,
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'events/create',
          name: 'create-event',
          component: () => import('@/views/pages/events/create/CreateEvent.vue'),
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'venues',
          component: () => import('@/views/pages/venues/Venues.vue'),
          meta: {
            pageTitle: 'Venues',
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'venues/:uid/:slug?',
          name: 'venue-details',
          component: () => import('@/views/pages/venues/VenueDetails.vue'),
          props: true,
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'email',
          redirect: 'email/inbox',
          name: 'email',
          meta: {
            rule: 'admin'
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false
          }
        },
        {
          path: 'email/:filter',
          component: () => import('@/views/account/email/Email.vue'),
          meta: {
            rule: 'admin',
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false,
            parent: 'email',
            no_scroll: true
          }
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/views/account/chat/Chat.vue'),
          meta: {
            rule: 'admin',
            // requiresAuth: true,
            // adminAuth: true,
            // customerAuth: false,
            no_scroll: true
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '/full',
      component: () => import('@/layouts/FullPage.vue'),
      children: [
        //   // =============================================================================
        //   // PAGES
        //   // =============================================================================
        //   {
        //     path: '/callback',
        //     name: 'auth-callback',
        //     component: () => import('@/views/Callback.vue'),
        //     meta: {
        //       rule: 'public'
        //     }
        //   },
        {
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/auth/login/Login.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/register',
          name: 'page-register',
          component: () => import('@/views/auth/register/Register.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/auth/ForgotPassword.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/password/reset/:token',
          name: 'page-reset-password',
          component: () => import('@/views/auth/ResetPassword.vue'),
          props: true,
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/lock-screen',
          name: 'page-lock-screen',
          component: () => import('@/views/auth/LockScreen.vue'),
          meta: {
            rule: 'public'
          }
        },
        // {
        //   path: '/pages/comingsoon',
        //   name: 'page-coming-soon',
        //   component: () => import('@/views/pages/ComingSoon.vue'),
        //   meta: {
        //     rule: 'public'
        //   }
        // },
        {
          path: '/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/auth/NotAuthorized.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/auth/Maintenance.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/errors/404.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/error-500',
          name: 'page-error-500',
          component: () => import('@/views/errors/500.vue'),
          meta: {
            rule: 'public'
          }
        }
      ]
    },

    // =============================================================================
    // Public PAGE LAYOUTS
    // =============================================================================
    {
      path: '/full',
      component: () => import('@/layouts/PublicPage.vue'),
      children: [

        {
          path: '/faq',
          name: 'page-faq',
          component: () => import('@/views/pages/Faq.vue'),
          meta: {
            breadcrumb: [
              { title: 'home', url: '/' },
              { title: 'FAQ', active: true }
            ],
            pageTitle: 'FAQ',
            rule: 'public'
          }
        },
        {
          path: '/terms',
          name: 'page-terms',
          component: () => import('@/views/pages/Terms.vue'),
          meta: {
            breadcrumb: [
              { title: 'home', url: '/' },
              { title: 'Terms & Conditions', active: true }
            ],
            pageTitle: 'Terms & Conditions',
            rule: 'public'
          }
        },
        {
          path: '/privacy',
          name: 'page-privacy',
          component: () => import('@/views/pages/Privacy.vue'),
          meta: {
            breadcrumb: [
              { title: 'home', url: '/' },
              { title: 'Privacy', active: true }
            ],
            pageTitle: 'Privacy',
            rule: 'public'
          }
        },
        {
          path: '/careers',
          name: 'page-careers',
          component: () => import('@/views/pages/Careers.vue'),
          meta: {
            breadcrumb: [
              { title: 'home', url: '/' },
              { title: 'Careers', active: true }
            ],
            pageTitle: 'Careers',
            rule: 'public'
          }
        },
        {
          path: '/about-us',
          name: 'page-about-us',
          component: () => import('@/views/pages/AboutUs.vue'),
          meta: {
            breadcrumb: [
              { title: 'home', url: '/' },
              { title: 'About Us', active: true }
            ],
            pageTitle: 'About Us',
            rule: 'public'
          }
        }
      ]
    },

    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

router.beforeEach((to, from, next) => {
  if ((to.path === '/login' ||
    to.path === '/forgot-password' ||
    to.path === '/register') && ActiveUserModule.activeUserInfo) {
    router.push({ path: '/', query: { to: to.path } })
  }

  if (to.meta.requiresAuth) {
    const userInfo = JSON.parse(localStorage.getItem('roles'))
    if (!userInfo) {
      router.push({ path: '/', query: { to: to.path } })
    }
    // else if (to.meta.adminAuth) {
    //     const admin = Object.values(userInfo).filter(item => item === 'Admin')
    //     if (admin.length === 1) {
    //       next()
    //     } else {
    //       next('/account')
    //     }
    //   }
    // else if (to.meta.customerAuth) {
    //     const customer = Object.values(userInfo.roles).filter(item => item === 'Customer')
    //     const editor = Object.values(userInfo.roles).filter(item => item === 'Editor')
    //     if (customer.length === 1 || editor.length === 1) {
    //       next()
    //     } else {
    //       next('/admin')
    //     }
    //   }
  }

  // If auth required, check login. If login fails redirect to login page
  // if (to.meta.requiresAuth) {
  //   console.log('Auth required')
  //   console.log('AuthModule.isAuthenticated', AuthModule.isAuthenticated)
  //
  //   if (!AuthModule.isAuthenticated) {
  //     router.push({path: '/login', query: {to: to.path}})
  //   } else {
  //     router.push({path: '/', query: {to: to.path}})
  //   }
  // }

  firebase.auth().onAuthStateChanged(() => {
    // get firebase current user
    const firebaseCurrentUser = firebase.auth().currentUser

    if (to.path === '/error-404' ||
      to.path === '/error-500' ||
      to.path === '/callback' ||
      to.path === '/comingsoon' ||
      (ActiveUserModule.activeUserInfo || firebaseCurrentUser)
    ) {
      return next()
    }

    // If auth required, check login. If login fails redirect to login page
    if (to.meta.requiresAuth) {
      console.log('Auth required')
      if (!(ActiveUserModule.activeUserInfo || firebaseCurrentUser)) {
        router.push({ path: '/login', query: { to: to.path } })
      }
    }

    return next()
    // Specify the current path as the customState parameter, meaning it
    // will be returned to the application after auth
    // auth.login({ target: to.path });
  })
})
export default router
