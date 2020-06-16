import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { getVenue, getVenues } from '@/api/venues'

export interface IVenueState {
  venues: Venue[]
}

@Module({ dynamic: true, store, name: 'venue' })
class Venue extends VuexModule {
  // @ts-ignore
  @Action()
  public async getVenues () {
    const response = await getVenues()
    if (response && response.data && response.data.venues.data) {
      return Object.values(response.data.venues.data)
    }
    return []
  }

  // @ts-ignore
  @Action()
  public async getVenue (uid) {
    const response = await getVenue(uid)
    if (response && response.data) {
      console.log('venue ', response.data.venue)
      return response.data.venue
    }
    return []
  }
}

export const VenueModule = getModule(Venue)
