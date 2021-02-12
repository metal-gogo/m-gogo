import { createLocalVue } from '@vue/test-utils'

import globalComponents from './globalComponents'

const Vue = createLocalVue()

// We need to setup all our components here until this gets fixed: https://github.com/nuxt/components/issues/58
globalComponents.forEach((path) => {
  const name = path.substring(path.lastIndexOf('/') + 1)
  Vue.component(name, require(`../../${path}/index.vue`).default)
})

global.localVue = Vue
