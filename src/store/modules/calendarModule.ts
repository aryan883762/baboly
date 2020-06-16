import { Action, getModule, Module, Mutation, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { Timezone } from '@/models/Calendar'
import { getTimezones } from '@/api/general'

export interface ICalendarState {
  timezones: Timezone[]
  hoursList: string[]

}

const getHours = () => {
  const quarterHours = ['00', '15', '30', '45']
  const amPm = ['AM', 'PM']
  const times = []
  for (let l = 0; l < 2; l++) {
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 4; j++) {
        let n = i === 0 ? 12 : i
        times.push(('0' + n).slice(-2) + ':' + quarterHours[j] + ' ' + amPm[l])
      }
    }
  }

  return times
}

@Module({
  dynamic: true,
  store,
  name: 'calendar'
})
class Calendar extends VuexModule implements ICalendarState {
  public timezones: Timezone[] = []
  public hoursList: string[] = getHours()

  // @ts-ignore
  @MutationAction({
    rawError: true,
    mutate: ['timezones']
  })
  public async getTimezones () {
    try {
      const response = await getTimezones()
      if (response && response.data && response.data) {
        return { 'timezones': response.data }
      }
      return []
    } catch (e) {
      throw new Error('Timezones not found')
    }
  }
}

export const CalendarModule = getModule(Calendar)
