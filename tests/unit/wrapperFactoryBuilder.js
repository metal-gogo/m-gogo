import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'

import CldImageStub from '@/tests/unit/stubs/CldImageStub'

const { localVue } = global

function handleComponentInRouteGuards(component, wrapper) {
  if (!component.beforeRouteEnter) return

  const to = {}
  const from = {}
  const next = (fn = jest.fn()) => fn(wrapper.vm)
  component.beforeRouteEnter.call(wrapper.vm, to, from, next)
}

function wrapperFactoryBuilder(
  component,
  {
    store: defaultStore,
    data: defaultData,
    slots: defaultSlots,
    props: defaultProps,
    listeners: defaultListeners,
    provide: defaultProvide,
    methods: defaultMethods,
    mocks: defaultMocks,
    stubs: defaultStubs,
    shallow: defaultShallow = false,
  } = {}
) {
  return function innerHandler({
    store = defaultStore,
    slots,
    data,
    props,
    listeners,
    provide,
    methods,
    mocks,
    stubs,
    shallow = defaultShallow,
  } = {}) {
    const mounter = shallow ? shallowMount : mount
    const wrapper = mounter(component, {
      localVue,
      store,
      data: () => ({
        ...defaultData,
        ...data,
      }),
      slots: {
        ...defaultSlots,
        ...slots,
      },
      propsData: {
        ...defaultProps,
        ...props,
      },
      listeners: {
        ...defaultListeners,
        ...listeners,
      },
      provide: {
        ...defaultProvide,
        ...provide,
      },
      methods: {
        ...defaultMethods,
        ...methods,
      },
      mocks: {
        ...defaultMocks,
        ...mocks,
      },
      stubs: {
        NuxtLink: RouterLinkStub,
        'cld-image': CldImageStub,
        'cld-placeholder': true,
        'client-only': true,
        'nuxt-content': true,
        'svg-icon': true,
        ...defaultStubs,
        ...stubs,
      },
    })

    handleComponentInRouteGuards(component, wrapper)

    return wrapper
  }
}

export default wrapperFactoryBuilder
