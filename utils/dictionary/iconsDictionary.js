import { assocPath, mergeDeepRight } from 'ramda'

import availableIcons from '@/components/BrandIcon/availableIcons'

const getIconsDictionary = (icons) => {
  icons.reduce((accumulatedIcons, icon) => {
    const objectIconReference = assocPath(icon.split('/'), icon, {})
    return mergeDeepRight(accumulatedIcons, objectIconReference)
  }, {})
}

const iconsDictionary = getIconsDictionary(availableIcons)

export default iconsDictionary
