const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const postCss = {
  plugins: [postcssPresetEnv({ stage: 2 }), postcssFlexbugsFixes, autoprefixer],
};

const MODE = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const __PROD__ = MODE === 'production';
const __DEV__ = !__PROD__;

const config = {
  MODE,
  __DEV__,
  __PROD__,

  postCss,
};

module.exports = config;
module.exports.default = config;

// export default config;
