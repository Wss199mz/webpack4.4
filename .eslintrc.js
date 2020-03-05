module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'import', 'vue'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    // "space-before-function-paren": 0,
    // 'arrow-parens': 0,
    // allow async-await
    // 'generator-star-spacing': 0,
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
    "semi": [0], //关闭语句强制分号结尾
    "quotes": [0, "single"],//引号类型
    "no-console": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "eol-last": 0,
    'linebreak-style': [0, 'windows'], //换行风格
    'no-multi-spaces': 1, //禁止用多余的空格
    'no-multi-str': 1, //字符串不能用\换行
    // "spaced-comment": 0,//注释风格要不要有空格
    // "eqeqeq": [0, "always"],
    "space-before-function-paren": 0,
    // 空行最多不能超过100行
    "no-multiple-empty-lines": [0, {
      "max": 100
    }]
    // "no-var": 0, //禁用var，用let和const代替
  }
}
