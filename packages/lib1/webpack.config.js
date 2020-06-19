const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    before: function (app, server, compiler) {
      app.get('*', (req, res, next) => {
        setTimeout(() => {
          console.log('slowing down 1sec');
          next();
        }, 1000);
      });
    },
    port: 3002,
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'lib1',
      library: { type: 'var', name: 'lib1' },
      filename: 'remoteEntry.js',
      exposes: {
        Button: './src/Button',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};
