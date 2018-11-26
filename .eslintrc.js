module.exports = {
  parser: "babel-eslint",
  rules: {
    "comma-dangle": [2, "always-multiline"],
    "no-extra-semi": 2,
    "no-unused-vars": 1,
    "no-mixed-spaces-and-tabs": 2,
    semi: [2, "never"],
    "no-var": 2,
    "prefer-const": 2,
    "no-const-assign": 2,
    eqeqeq: [2, "smart"],
    "react/prop-types": 0,
    "react/display-name": 0,
    indent: 0,
    "no-undef": 2,
    "no-console": 1,
    "no-useless-escape": 1,
    "comma-dangle": 0
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      spread: true
    }
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  globals: {
    graphql: true
  }
};
