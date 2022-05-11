const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sass = require('sass');
const postcss = require('postcss');

const projectConfig = require('../scripts/config');

const loaders = {
  postCss: () => ({
    loader: 'postcss-loader',
    options: {
      implementation: postcss,
      postcssOptions: {
        plugins: projectConfig.postCss.plugins,
      },
    },
  }),
  sass: () => ({
    loader: 'sass-loader',
    options: {
      sourceMap: projectConfig.__DEV__,
      implementation: sass,
    },
  }),
  css: () => ({
    loader: 'css-loader',
    options: {
      sourceMap: projectConfig.__DEV__,
      importLoaders: 2,
    },
  }),
  cssModules: () => ({
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      esModule: true,
      modules: {
        localIdentName: projectConfig.__DEV__ ? '[local]--[folder]--[hash:base64:3]' : '[hash:base64:6]',
      },
      sourceMap: projectConfig.__DEV__,
    },
  }),
  styleOrExtractCss: () => (projectConfig.__DEV__ ? { loader: 'style-loader' } : MiniCssExtractPlugin.loader),
};

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },

  // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  webpackFinal: async (config) => {
    config.mode = projectConfig.MODE;

    config.module.rules = config.module.rules.concat([
      // sass files
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [loaders.styleOrExtractCss(), loaders.css(), loaders.postCss(), loaders.sass()],
      },
      // // sass modules
      {
        test: /\.module\.s[ac]ss$/i,
        use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss(), loaders.sass()],
      },
      // // css modules
      {
        test: /\.module\.css$/i,
        use: [loaders.styleOrExtractCss(), loaders.cssModules(), loaders.postCss()],
      },
      // svg
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
          '@svgr/webpack',
          {
            loader: 'url-loader',
            options: {
              limit: 3000,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ]);

    if (projectConfig.__PROD__) {
      config.plugins.push(new MiniCssExtractPlugin({ filename: '[contenthash].css' }));
    }

    return config;
  },
};
