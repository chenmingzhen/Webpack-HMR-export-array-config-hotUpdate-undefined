const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type import('webpack').Configuration) */
module.exports = [
  /** for style */
  {
    /** 打包成main */
    entry: [
      path.resolve(__dirname, "style.ts"),
      path.resolve(__dirname, "index.less"),
    ],
    optimization: {
      runtimeChunk: "single",
    },
    output: {
      publicPath: "http://localhost:4000/",
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "esbuild-loader",
              options: {
                loader: "tsx",
                target: "es2015",
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
  },

  /** for ts */
  {
    entry: {
      app: path.resolve(__dirname, "index.tsx"),
    },
    output: {
      filename: "app.js",
      publicPath: "http://localhost:4000/",
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "esbuild-loader",
              options: {
                loader: "tsx",
                target: "es2015",
              },
            },
          ],
        },
      ],
    },
  },
];
