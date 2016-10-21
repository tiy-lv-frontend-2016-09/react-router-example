var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtractCSS = new ExtractTextPlugin('styles.css');
var HtmlWebpack = new HtmlWebpackPlugin({template: './src/assets/html/index.html'});

module.exports = {
  entry: path.resolve('./src/app.js'),
  output: {
    path: path.resolve('./dist'),
    filename: "bundle.js",
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  plugins: [
    // the index.html file is generated below
    HtmlWebpack,
    ExtractCSS
  ],
  resolve: {
    root: path.resolve('./src/')
  },
  module: {
    loaders: [
      // js and jsx
      {
        test: /\.jsx?$/i, 
        loader: 'babel',
        include: /src/,
        exclude: /(node_modules|bower_components|dist)/,
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      
      // sass
      {
        test: /\.s?css$/i,
        loader: ExtractCSS.extract(['css', 'sass'])
      },

      // fonts
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url',
        query: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url',
        query: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/font-woff2'
        }
      },
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url',
        query: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?.*)?$/,
        loader: 'file',
        query: {
          prefix: 'fonts/',
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.svg(\?.*)?$/,
        loader: 'url',
        query: {
          prefix: 'fonts/',
          name: '[path][name].[ext]',
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
      },

      // imgs
      {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
          limit: 8192
        }
      },

      // json
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
}
