import { createDecorator } from 'vue-class-component'
import store from '@/store'
import { getModule, VuexModule } from 'vuex-module-decorators'

declare type ConstructorOf<C> = new(...args: any[]) => C;

export function Getter<M extends VuexModule> (module: ConstructorOf<M>, getter: string) {
  return createDecorator((options, key) => {
    if (!options.computed) {
      options.computed = {}
    }

    const notRealNamespace = module.name + '/' + getter
    const leModule = getModule(module, store)
    const leGetter = Object.getOwnPropertyDescriptor(leModule, getter)

    if (leGetter !== undefined) {
      // @ts-ignore
      options.computed[key] = () => leGetter.get()
    } else {
      throw new Error('vuex decorator error in component: ' + options.name + '!' +
        ' Getter was not defined: ' + notRealNamespace + '')
    }
  })
}

export function Action<M extends VuexModule> (module: ConstructorOf<M>, action: string) {
  return createDecorator((options, key) => {
    if (!options.computed) {
      options.computed = {}
    }

    const notRealNamespace = module.name + '/' + action
    const leModule = getModule(module, store)
    // @ts-ignore
    const leAction = leModule[action]

    if (leAction !== undefined) {
      options.computed[key] = () => leAction
    } else {
      throw new Error('vuex decorator error in component: ' + options.name + '!' +
        ' Action was not defined: ' + notRealNamespace + '')
    }
  })
}

export function State<M extends VuexModule> (module: ConstructorOf<M>) {
  return createDecorator((options, key) => {
    if (!options.computed) {
      options.computed = {}
    }

    const leModule = getModule(module, store)

    if (leModule !== undefined) {
      // @ts-ignore
      options.computed[key] = () => leModule
    } else {
      throw new Error('vuex decorator error in component: ' + options.name + '!' +
        ' State could not be accessed for module: ' + module.name)
    }
  })
}
