import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import TheFooterAcknowledgments from '@/components/TheFooterAcknowledgments'
import TheFooter from './index.vue'

describe('@/components/TheFooter', () => {
  const wrapperFactory = wrapperFactoryBuilder(TheFooter)
  const rootTag = 'FOOTER'
  const rootClass = 'the-footer'

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

  it(`must have TheFooterAcknowledgments`, () => {
    const NuxtLinkComponent = wrapper.findComponent(TheFooterAcknowledgments)
    expect(NuxtLinkComponent.exists()).toBe(true)
  })
})
