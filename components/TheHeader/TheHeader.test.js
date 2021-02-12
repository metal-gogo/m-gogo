import { RouterLinkStub } from '@vue/test-utils'

import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import TheHeader from './index.vue'

describe('@/components/TheHeader', () => {
  const wrapperFactory = wrapperFactoryBuilder(TheHeader)
  const rootTag = 'HEADER'
  const rootClass = 'the-header'

  let wrapper

  beforeEach(() => {
    wrapper = wrapperFactory()
  })

  it(`must be wrapped on a "<${rootTag.toLowerCase()}>" tag`, () => {
    expect(wrapper.element.tagName).toEqual(rootTag)
  })

  it(`the wrapper tag must have a "${rootClass}" class`, () => {
    expect(wrapper.classes()).toContain(rootClass)
  })

  it(`must have a link to the homepage`, () => {
    const NuxtLinkComponent = wrapper.findComponent(RouterLinkStub)
    expect(NuxtLinkComponent.exists()).toBe(true)
    expect(NuxtLinkComponent.props('to')).toBe('/')
  })
})
