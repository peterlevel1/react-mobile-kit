module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "loose": true,
        "modules": false
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "babel-plugin-transform-async-to-promises",
    "./babel-transform-less-to-css"
  ],
  "ignore": ["**/demos"],
  "env": {
    "test": {
      // bugfix: jest cannot use es6 import syntax
      // https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export/52224329
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
