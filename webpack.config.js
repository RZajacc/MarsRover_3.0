const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    navbar: './src/navbar.ts',
    content: './src/content.ts',
    contact: './src/contact.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    compress: true
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
      // {
      //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //   type: 'asset/resource'
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      chunks: ['navbar'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './public/content.html',
      inject: true,
      chunks: ['navbar', 'content'],
      filename: 'content.html'
    }),
    new HtmlWebpackPlugin({
      template: './public/contact.html',
      inject: true,
      chunks: ['navbar', 'contact'],
      filename: 'contact.html'
    }),
    new HtmlWebpackPlugin({
      template: './public/credits.html',
      inject: true,
      chunks: ['navbar'],
      filename: 'credits.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
}
