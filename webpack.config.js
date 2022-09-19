const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

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
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist,
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "~": PATHS.src, // Example: import Dog from "~/assets/img/dog.jpg"
      //"@": `${PATHS.src}/js`, // Example: import Sort from "@/utils/sort.js"
      img: `${PATHS.src}/${PATHS.assets}img`,
      fnt: `${PATHS.src}/${PATHS.assets}fonts`,
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
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
};
