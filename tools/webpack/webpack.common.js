const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              // extractCSS: process.env.NODE_ENV === 'production',
              loaders: {
                sass:
                  'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
                scss: 'vue-style-loader!css-loader!sass-loader',
                less: 'vue-style-loader!css-loader!less-loader'
              }
            }
          },
          {
            loader: 'iview-loader',
            options: {
              prefix: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      // {
      //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //     use: {
      //         loader: 'url-loader',
      //         query: {
      //             limit: 10000,
      //             name: 'imgs/[name]--[folder].[ext]'
      //         }
      //     }
      // },
      // {
      //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //     loader: 'url-loader',
      //     options: {
      //         limit: 10000,
      //         name: 'media/[name]--[folder].[ext]'
      //     }
      // },
      // {
      //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //     use: {
      //         loader: 'url-loader',
      //         query: {
      //             limit: 10000,
      //             name: 'fonts/[name]--[folder].[ext]'
      //         }
      //     }
      // },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // 使用url-loader来替换
      // {
      //     test: /\.(png|jpg|gif|svg)$/,
      //     loader: 'file-loader',
      //     options: {
      //         name: '[path][name].[ext]?[hash]',
      //         useRelativePath: false,
      //         // TODO(vtxf): 这里还有问题
      //         outputPath: function(url){//返回最终的资源相对路径
      //             // console.log('url:' + url);
      //             var path = url.replace(/Demos\/.*?\//g, './');
      //             return path;
      //         },
      //         emitFile: false
      //     }
      // },
      {
        test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf|topojson|ktx)$/,
        loader: 'url-loader',
        options: {
          limit: 819200,
          name: '[name].[hash].[ext]',
          useRelativePath: false, // 如果是true，会自带引入的路径，这样不好
          outputPath: './Demos/static/assets', // dist目录下的输出路径
          publicPath: '../static/assets', // html文件改写的路径
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
    ]
  },
  plugins: [
      // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      'index.html',
      {
        from: process.env.XBSJ_IMPORT !== 'external' ? './node_modules/earthsdk/dist/XbsjCesium' : 'Static/XbsjCesium',
        to: 'XbsjCesium',
        toType: 'dir'
      },
      {
        from: process.env.XBSJ_IMPORT !== 'external' ? './node_modules/earthsdk/dist/XbsjEarth' : 'Static/XbsjEarth',
        to: 'XbsjEarth',
        toType: 'dir'
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // 如果不使用模板的话，不需要这样引入
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../../dist')
  }
};