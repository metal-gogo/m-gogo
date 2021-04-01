import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import TheFooterAcknowledgments from './index.vue'
import acknowledgments from './acknowledgments'

describe('@/components/TheFooter/TheFooterAcknowledgments', () => {
  const wrapperFactory = wrapperFactoryBuilder(TheFooterAcknowledgments)
  const rootTag = 'SECTION'
  const rootClass = 'the-footer-acknowledgments'

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

  it('has all the acknowledments rendered', () => {
    const text = wrapper.text()
    acknowledgments.forEach((acknowledgment) => {
      const link = wrapper.find(`a[href="${acknowledgment.link}"]`)
      expect(link.exists()).toBe(true)
      expect(text).toContain(acknowledgment.element)
      expect(text).toContain(acknowledgment.company)
    })
  })
})
