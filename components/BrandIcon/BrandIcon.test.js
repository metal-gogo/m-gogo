import wrapperFactoryBuilder from '@/tests/unit/wrapperFactoryBuilder.js'

import BrandIcon from './index.vue'
import availableIcons from './availableIcons'

describe('@/components/BrandIcon', () => {
  const sampleProps = {
    name: 'categories/tech',
    title: 'Title of the icon',
    desc: 'Description of the icon',
  }
  const wrapperFactory = wrapperFactoryBuilder(BrandIcon, {
    props: sampleProps,
  })
  const rootTag = 'SVG-ICON-STUB'
  const rootClass = 'brand-icon'

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

  describe('props', () => {
    it('must render a svg-icon with the "name" passed as prop', () => {
      expect(wrapper.props('name')).toBe(sampleProps.name)
    })

    it('must render a svg-icon with the "title" passed as prop', () => {
      expect(wrapper.props('title')).toBe(sampleProps.title)
    })

    it('must render a svg-icon with the "desc" passed as prop', () => {
      expect(wrapper.props('desc')).toBe(sampleProps.desc)
    })

    it('must render a svg-icon with the "width" passed as prop', async () => {
      expect(wrapper.props('width')).toBeTruthy()

      const width = 16
      await wrapper.setProps({ width })

      expect(wrapper.props('width')).toBe(width)
    })

    it('must render a svg-icon with the "height" passed as prop', async () => {
      expect(wrapper.props('height')).toBeTruthy()

      const height = 16
      await wrapper.setProps({ height })

      expect(wrapper.props('height')).toBe(height)
    })

    it('it accepts only the values defined in the "availableIcons.js" for the "name" props', () => {
      const validator = BrandIcon.props.name.validator
      availableIcons.forEach((availableIcon) =>
        expect(validator(availableIcon)).toBe(true)
      )
      expect(validator('not-a-valid-icon-name-example')).toBe(false)
    })
  })

  describe('accessibility', () => {
    it('must have a "aria-labelledby" attribute', () => {
      expect(wrapper.attributes('aria-labelledby')).toBeTruthy()
    })

    it('must have a "aria-describedby" attribute', () => {
      expect(wrapper.attributes('aria-describedby')).toBeTruthy()
    })
  })
})
