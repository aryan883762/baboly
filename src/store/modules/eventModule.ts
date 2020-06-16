import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { getEvents, getEvent, createEvent } from '@/api/events'
import { frmEvent } from '@/models/Event'
export interface IEventState {
  events: Event[]
}

@Module({ namespaced: true, dynamic: true, store, name: 'event' })
class Event extends VuexModule {
  // @ts-ignore
  @Action()
  public async getEvents () {
    const response = await getEvents()
    if (response && response.data && response.data.events) {
      return response.data.events.data
    }
    return []
  }
  // @ts-ignore
  @Action()
  public async getEvent (uid) {
    const response = await getEvent(uid)
    if (response && response.data) {
      return response.data.event
    }
    return []
  }

  /**
   * createEvent
   */
  // @ts-ignore
  @Action()
  public async createEvent () {
    let formData: frmEvent = {
      token: 'TOKEN EXAMPLE',
      category: 'category EXMPLE',
      title: 'TITLE EXAMPLE',
      description: 'description EXAMPLE',
      timezoneId: 'ID TIME ZONE',
      startTime: 'START TIME STRING',
      tags: 'asd',
      eventUrl: 'URL SAMPLE',
      facebookUrl: 'facebookUrl.comrlk'

    }
    return (formData as frmEvent)
  }
}

export const EventModule = getModule(Event)
