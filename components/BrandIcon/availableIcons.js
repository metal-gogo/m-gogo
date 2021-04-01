import availableCategories from '@/utils/dictionary/categoriesDictionary/availableCategories'

const categoryIcons = availableCategories.map(
  (category) => `categories/${category}`
)

const availableIcons = [
  'brand/logo',
  ...categoryIcons,
  'social/facebook',
  'social/github',
  'social/instagram',
  'social/linkedin',
  'social/twitter',
  'utilities/arrow',
  'utilities/avatar',
  'utilities/burgerMenu',
  'utilities/cart',
  'utilities/chats',
  'utilities/checkmark',
  'utilities/chevron',
  'utilities/cross',
  'utilities/dots',
  'utilities/exclamation',
  'utilities/filter',
  'utilities/find',
  'utilities/flag',
  'utilities/heart',
  'utilities/link',
  'utilities/maintenance',
  'utilities/minus',
  'utilities/permalink',
  'utilities/pin',
  'utilities/plus',
  'utilities/question',
  'utilities/settings',
  'utilities/share',
  'utilities/star',
  'utilities/sunAndMoon',
  'utilities/thunder',
]

export default availableIcons
