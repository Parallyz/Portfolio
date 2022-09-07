const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {

   mode: "development",
   entry: ["@babel/polyfill","./src/index.jsx"],

   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
   },

   resolve: {
      extensions: ['.js', '.jsx'],
   },

   plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new CleanWebpackPlugin()
   ],

   devServer: {
      port: 4000,
      historyApiFallback:true
   },

   module: {

      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", 'css-loader', "sass-loader"]
         },
         {
            test: /\.(jpg|jpeg|png|svg)/,
            use: ['file-loader']
         } ,
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-react", '@babel/preset-env']
               }
            }
         },
      ]
   }
}