const word = '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*'
const block = word
const element = `(?:__${word})?`
const modifier = `(?:--${word})?`
const bemPattern = `^${block}${element}${modifier}$`

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-config-prettier',
    'stylelint-config-recess-order',
  ],
  // extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'max-nesting-depth': 3,
    'selector-class-pattern': bemPattern,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'],
      },
    ],
    'order/properties-alphabetical-order': null,
  },
}
