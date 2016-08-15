module.exports = {
  "extends": "airbnb",
  "installedESLint": true,
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
  ],
  "rules": {
    "semi": 0,
    "indent": 2,
    "no-shadow": 1,
    "no-multi-spaces": ["error", { exceptions: { "VariableDeclarator": true } }],
  }
};
