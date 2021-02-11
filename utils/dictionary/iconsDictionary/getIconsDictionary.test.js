import getIconsDictionary from './getIconsDictionary'

describe('@/utils/dictionary/iconsDictionary/getIconsDictionary', () => {
  it('creates a nested object from a list of strings separated by "/"', () => {
    const stringSeparatedBySlashes = 'some/nested/element'
    const result = getIconsDictionary([stringSeparatedBySlashes])
    const expectedResult = {
      some: {
        nested: {
          element: stringSeparatedBySlashes,
        },
      },
    }
    expect(result).toEqual(expectedResult)
  })
})
