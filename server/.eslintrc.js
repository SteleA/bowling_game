module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
      "_": true,
      "beforeEach": true,
      "Blob": true,
      "DEBUG": true,
      "describe": true,
      "DEV": true,
      "document": true,
      "expect": true,
      "FileReader": true,
      "FormData": true,
      "google": true,
      "it": true,
      "jest": true,
      "module": true,
      "moment": true,
      "NODE_ENV": true,
      "process": true,
      "React": true,
      "require": true,
      "required": true,
      "window": true
    }
};
