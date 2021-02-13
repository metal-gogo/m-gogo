import { assocPath, mergeDeepRight } from 'ramda'

const getIconsDictionary = (icons) => {
  return icons.reduce((accumulatedIcons, icon) => {
    const objectIconReference = assocPath(icon.split('/'), icon, {})
    return mergeDeepRight(accumulatedIcons, objectIconReference)
  }, {})
}

export default getIconsDictionary
