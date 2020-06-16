export interface User {
  uid: string
  email:string
  authToken:string
  name: string
  firstName: string
  lastName: string
  status: string
  emailVerified: boolean
  userRole: string
  avatar: string,
  roles: string[]
}

export interface UserProviderData {
  providerUserId: string
  email: string
  token: string
  refreshToken: string
  name: string
  firstName?: string
  lastName?: string
  avatar?: string
  emailVerified: boolean
  provider: string
}
//
// export const defaultUser: User = {
//   uid: '0', // From Auth
//   email: 'john.doe@example.com',
//   name: 'John Doe', // From Auth
//   firstName: 'John',
//   lastName: 'Doe',
//   status: 'online',
//   emailVerified: false,
//   userRole: ['admin'],
//   authToken: '',
//   avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg'),
//   roles: ['admin'],
// }
//
// export const defaultUserProviderdata: UserProviderData = {
//   providerUserId: '123456',
//   email: 'saeed.pourali@gmail.com',
//   token: '2323',
//   refreshToken: '123123',
//   name: 'saeed pourali',
//   firstName: 'saeed',
//   lastName: 'pourali',
//   emailVerified: true,
//   provider: 'google'
// }
