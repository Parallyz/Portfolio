const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  assets: "assets/",
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  mode: "development",
  entry: ["@babel/polyfill", `${PATHS.src}/index.tsx`],

  output: {
    filename: "bundle.js",
    path: PATHS.dist,
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "~": PATHS.src, // Example: import Dog from "~/assets/img/dog.jpg"
      "@": `${PATHS.src}/js`, // Example: import Sort from "@/utils/sort.js"
    },
  },

  plugins: [
    new HtmlWebpackPlugin({ template: `${PATHS.src}/index.html` }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.src}/${PATHS.assets}img`,
          to: `${PATHS.assets}img`,
        },

        {
          from: `${PATHS.src}/${PATHS.assets}fonts`,
          to: `${PATHS.assets}fonts`,
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],

  //devServer: {
  //  port: 4000,
  //  historyApiFallback: true,
  //  static: {
  //    directory: path.join(__dirname, "img"),
  //    publicPath: "./src/img/",
  //  },
  //},
  devServer: {
    static: {
      directory: PATHS.dist,
    },
    historyApiFallback: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["file-loader"],
      },
    ],
  },
};
