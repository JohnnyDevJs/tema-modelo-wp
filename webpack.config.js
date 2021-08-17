/**
 * Webpack configuration.
 */

'use strict'

const webpack = require( 'webpack' )
const autoprefixer = require( 'autoprefixer' )
const AssetsPlugin = require( 'assets-webpack-plugin' )
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' )
const TerserPlugin = require( 'terser-webpack-plugin' )
const FriendlyErrorsPlugin = require( 'friendly-errors-webpack-plugin' )
const OptimizeCSSAssetsPlugin = require( 'optimize-css-assets-webpack-plugin' )
const CopyPlugin = require( 'copy-webpack-plugin' )
const path = require( 'path' )

const JS_DIR = path.resolve( __dirname, 'src/js' )
const IMG_DIR = path.resolve( __dirname, 'src/img' )
const BUILD_DIR = path.resolve( __dirname, 'assets/build' )

const entry = {
  app: JS_DIR + '/app.js',
}

const output = {
  path: BUILD_DIR,
  filename: 'js/[name].js'
}

/**
  * Note: argv.mode will return 'development' or 'production'.
  */
 
const DEV = process.env.NODE_ENV === 'development'

const plugins = [
  !DEV && new CopyPlugin( {
    patterns: [
      { from: IMG_DIR, to: BUILD_DIR + '/img' }
    ]
  } ),
  !DEV && new CleanWebpackPlugin( { cleanAfterEveryBuildPatterns: ['build'] } ),
  new MiniCssExtractPlugin( {
    filename: DEV ? 'css/app.css' : 'css/app.css'
  } ),
  new webpack.EnvironmentPlugin( {
    NODE_ENV: 'development',
    DEBUG: false
  } ),
  new AssetsPlugin( {
    path: BUILD_DIR,
    filename: 'assets.json'
  } ),
  DEV &&
    new FriendlyErrorsPlugin( {
      clearConsole: false
    } ),
  DEV &&
    new BrowserSyncPlugin( {
      notify: false,
      host: 'localhost',
      port: 2020,
      logLevel: 'silent',
      files: ['./**/*.php'],
      proxy: 'http://localhost:8080'
    } )
].filter( Boolean )

const rules = [
  { parser: { requireEnsure: false } },

  {
    test: /\.js?$/,
    loader: 'babel-loader',
    include: JS_DIR
  },
  {
    test: /\.s?[ac]ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            autoprefixer( {
              overrideBrowserslist: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9'
              ]
            } )
          ]
        }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.(png|jpg|svg|jpeg|gif|ico)$/,
    use: {
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]',
        publicPath: 'production' === process.env.NODE_ENV ? '/assets/build' : 'assets/build'
      }
    }
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: [ IMG_DIR, /node_modules/ ],
    use: [
      {
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/'
        }
      }
    ]
  }
]

/**
  * Since you may have to disambiguate in your webpack.config.js between development and production builds,
  * you can export a function from your webpack configuration instead of exporting an object
  *
  * @param {string} env environment ( See the environment options CLI documentation for syntax examples. https://webpack.js.org/api/cli/#environment-options )
  * @param argv options map ( This describes the options passed to webpack, with keys such as output-filename and optimize-minimize )
  * @return {{output: *, devtool: string, entry: *, optimization: {minimizer: [*, *]}, plugins: *, module: {rules: *}, externals: {jquery: string}}}
  *
  * @see https://webpack.js.org/configuration/configuration-types/#exporting-a-function
  */

module.exports = {
  bail: !DEV,
  mode: DEV ? 'development' : 'production',
  target: 'web',
  devtool: DEV ? 'cheap-eval-source-map' : 'source-map',
  entry: entry,
  node: {
    fs: 'empty'
  },
  output: output,
  module: {
    rules: rules
  },
  optimization: {
    minimize: !DEV,
    minimizer: [
      new OptimizeCSSAssetsPlugin( {
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true
          }
        }
      } ),
      new TerserPlugin( {
        terserOptions: {
          compress: {
            warnings: false
          },
          output: {
            comments: false
          }
        },
        sourceMap: true
      } )
    ]
  },
  plugins: plugins,
  externals: {
    jquery: 'jQuery'
  }
}
