module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "react-app"
  ],
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off"
  }
}