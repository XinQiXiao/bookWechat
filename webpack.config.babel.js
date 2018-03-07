
require("babel-polyfill")
import {resolve} from 'path'
const CopyWebpackPlugin = require('copy-webpack-plugin');
import { DefinePlugin, EnvironmentPlugin, IgnorePlugin, optimize } from 'webpack'
import WXAppWebpackPlugin, { Targets } from 'wxapp-webpack-plugin'

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production'

const relativeFileLoader = (ext = '[ext]') => [
  {
    loader: 'file-loader',
    options: {
      useRelativePath: true,
      name: `[name].${ext}`,
      emitFile: false,
    },
  },
  {
    loader: 'file-loader',
    options: {
      context: resolve('src'),
      name: `[path][name].${ext}`,
    },
  },
];

export default (env = {}) =>  {
  // 引入 `app.js`
  return {
    entry: {
      app: [
        './src/app.js',
      ],
    },

    output: {
      filename: '[name].js',
      path: resolve(__dirname, '../', isDev ? 'build/tf-rehb-dev' : 'build/tf-rehb-prd'),
    },

    plugins: [
      // 引入插件
      new EnvironmentPlugin({
        NODE_ENV: 'development',
      }),
      new WXAppWebpackPlugin({
        clear: !isDev,
      }),
      new CopyWebpackPlugin([
        // { from: resolve(__dirname, 'src/template'), to: 'template'},
        { from: resolve(__dirname, 'src/sources'), to: 'sources'},
        { from: resolve(__dirname, 'src/components'), to: 'components'},
      ]),
      new optimize.ModuleConcatenationPlugin(),
    ],
    module: {
      rules: [
        { 
          test: require.resolve('./src/config'),
          use: "imports-loader?DEBUG=>"+( isDev )
        },
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.less$/,
          include: /src/,
          use:[
            ...relativeFileLoader('wxss'),
            {
              loader: "less-loader", 
              options:{
                includePaths: [
                  resolve('src', 'styles'),
                  resolve('src'),
                ],
              },
           }
          ],
        },
        {
          test: /\.wxml$/,
          include: resolve('src'),
          use: [
            ...relativeFileLoader('wxml'),
            {
              loader: 'wxml-loader',
              options: {
                root: resolve('src'),
              },
            },
          ],
        },
        {
          test:  /\.(json|png|jpg|gif|wxss)$/,
          include: /src/,
          use: relativeFileLoader(),
        },
      ],
    },
    devtool: isDev ? 'source-map' : false,// 在开发时，推荐使用 `source-map` 辅助调试
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },
  }
}