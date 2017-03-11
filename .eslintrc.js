module.exports = {
  "parser": "babel-eslint",
  "parser-options": {
    "presets": ["es2015", "react"],
    "plugins": ["transform-object-rest-spread", "transform-decorators-legacy", "transform-class-properties"]
  },
  "env": {
    "browser": true
  },
  "rules": {
    "react/require-default-props": "off"
  }
}
