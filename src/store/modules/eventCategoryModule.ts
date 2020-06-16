import { getModule, Module, MutationAction, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { Category } from '@/models/Category'
import { getCategories } from '@/api/general'

export interface IEventCategoryState {
  categories: Category[]
}

// export const EVENT_CATEGORIES_MODULE_NAME = 'eventCategory'

@Module({
  namespaced: true,
  dynamic: true,
  store,
  name: 'eventCategory'
})
class EventCategory extends VuexModule implements IEventCategoryState {
  public categories:Category[] = []

  // @ts-ignore
  @MutationAction({
    rawError: true,
    mutate: ['categories']
  })
  public async getCategories () {
    try {
      const response = await getCategories()
      if (response && response.data && response.data.categories) {
        console.log(response.data.categories)
        return response.data
      }
      return []
    } catch (e) {
      throw new Error('Categories not found')
    }
  }
}

export const EventCategoryModule = getModule(EventCategory)
