const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = ({ NODE_ENV }) => ({
  mode: NODE_ENV || 'development',
  devtool: NODE_ENV === 'production' ? false : 'source-map',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.sass'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html',
      minify: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(sass)$/i,
        use: [
          'style-loader',
          'css-loader?modules',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
  },
});
