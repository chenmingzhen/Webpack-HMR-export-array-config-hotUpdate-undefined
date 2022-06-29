const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/** 增加uniqueName多入口问题热更新报错的问题,不是使用runTimeChunk */
/** @see https://github.com/webpack/webpack/issues/14981 */
/** @see https://github.com/toBeTheLight/issue-20211215/blob/master/webpack5/webpack.compliers.config.js#L3 */
/** @see https://webpack.js.org/configuration/output/#outputuniquename */

/** React保留状态 */
/** @see https://github.com/pmmmwh/react-refresh-webpack-plugin */


/** @type import('webpack').Configuration)[] */
module.exports = [
  /** for style */
  {
    entry: {
      css: [
        path.resolve(__dirname, "base.less"),
        path.resolve(__dirname, "index.less"),
      ],
    },
    output: {
      uniqueName: "css",
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
      uniqueName: "app",
      filename: "app.js",
      publicPath: "http://localhost:4000/",
    },
    mode: "development",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
    },
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

    plugins: [new ReactRefreshWebpackPlugin({ overlay: { sockPort: 4001 } })],
  },
];
