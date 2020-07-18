const path = require('path');
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const postcssNormalize = require('postcss-normalize');

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
        sourceMap: true,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true,
      },
    });
  }
  return loaders;
};


// Export a function. Accept the base config as the only param.
module.exports = {
  resolve: {
    extensions: ['.ts', '.json', '.tsx', '.min.css', '.css', '.scss', '.module.scss'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.[tj]sx?$/,
            use: {
              loader: 'ts-loader',
            },
            exclude: /node_modules/,
          },

          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true,
            }),
            sideEffects: true,
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true,
              modules: true,
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: true,
              },
              'sass-loader'
            ),
            sideEffects: true,
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: true,
                modules: true,
              },
              'sass-loader'
            ),
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader',
            options: {
              name: '/fonts/[name].[ext]'
            }
          },
        ],
      },
    ],
  },
};
