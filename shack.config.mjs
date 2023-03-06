import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

export default {
  entry: './web/index.tsx',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(m|c)?(t|j)sx?$/,
        exclude: /(node_modules|bower_components).*(?<!shack-get-routes\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
            ]
          }
        }
      },
      {
        test: /shack-get-routes\.js$/,
        use: {
          loader: '@shack-js/auto-routes-loader',
          options: {
            folder: 'web/pages'
          }
        }
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my-react',
      template: join(dirname(fileURLToPath(import.meta.url)), 'web', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    }),
  ],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', 'web'),
    filename: '[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    historyApiFallback: true
  }
}