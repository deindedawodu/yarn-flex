// webpack v4
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');
module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "[name].[chunkhash].js"
    filename:"bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // test: /\.css$/
        test:/\.(css|scss|css)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      },   {
        test:/\.html$/,
        use:['html-loader']
     },   
      {
      test:/\.(jpg|png)$/,
      use:[
          {
              loader:'file-loader',
              options:{
                  name:'[name].[ext]',
                  outputPath:'img/',
                  publicPath:'img/'
              }
            }
      ]
  },
      {
        test:/\.html$/,
        use:[
            {
                loader:'file-loader',
                options:{
                    name:'[name].[ext]'
                }
              }
        ],
        exclude: path.resolve(__dirname,'src/index.html')
        
    }

    
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      // filename: "style.[contenthash].css"
      filename: "[name]-styles.css",
    chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      // inject:true,
      //  hash: true, for some reason this is causing css not to be injected keep commented out!!!
      template: "./src/index.html",
      filename: "index.html"
      
    }),
    new webpack.ProvidePlugin({
      $:'jquery', 
      jQuery:'jquery'
    })
    // new WebpackMd5Hash()
  ]
};
