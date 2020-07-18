const path = require("path");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const postcssNormalize = require("postcss-normalize");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: require.resolve("css-loader"),
      options: cssOptions,
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        ident: "postcss",
        plugins: () => [
          require("postcss-flexbugs-fixes"),
          require("postcss-preset-env")({
            autoprefixer: {
              flexbox: "no-2009",
            },
            stage: 3,
          }),
          postcssNormalize(),
        ],
        sourceMap: true,
      },
    },
  ];
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

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputDir: "fonts",
        },
      },
      {
        test: /\.[tj]sx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },

      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: ExtractTextPlugin.extract({
          use: getStyleLoaders({
            importLoaders: 2,
            sourceMap: true,
          }),
        }),
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: ExtractTextPlugin.extract({
          use: getStyleLoaders({
            importLoaders: 2,
            sourceMap: true,
            modules: true,
          }),
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: ExtractTextPlugin.extract({
          use: getStyleLoaders(
            {
              importLoaders: 2,
              sourceMap: true,
            },
            "sass-loader"
          ),
        }),
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: ExtractTextPlugin.extract({
          use: getStyleLoaders(
            {
              importLoaders: 2,
              sourceMap: true,
              modules: true,
            },
            "sass-loader"
          ),
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              name: "[name][md5:hash].[ext]",
              outputPath: "assets/",
              publicPath: "/assets/",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      assets: path.resolve(__dirname, "assets"),
    },
  },
  plugins: [new ExtractTextPlugin("css/[name].css")],
  externals: {
    // Don't bundle react or react-dom
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM",
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "component-lib",
    libraryTarget: "umd",
    publicPath: "/dist/",
    umdNamedDefine: true,
  },
};
