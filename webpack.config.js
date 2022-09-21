const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  assets: "assets/",
};

module.exports = {
  mode,
  target,
  devtool,
  externals: {
    paths: PATHS,
  },
  entry: ["@babel/polyfill", `${PATHS.src}/index.tsx`],

  output: {
    filename: "[name].[contenthash].js",
    path: PATHS.dist,

    /*
      publicPath: '/' - relative path for dist folder (js,css etc)
      publicPath: './' (dot before /) - absolute path for dist folder (js,css etc)
    */
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".ts", ".tsx", ".scss"],
    alias: {
      "~": PATHS.src,
      "@": `${PATHS.src}/js`,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({ template: `${PATHS.src}/index.html` }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Images:
        {
          from: `${PATHS.src}/${PATHS.assets}img`,
          to: `${PATHS.assets}img`,
        },
        // Fonts:
        {
          from: `${PATHS.src}/${PATHS.assets}fonts`,
          to: `${PATHS.assets}fonts`,
        },
      ],
    }),
  ],
  devServer: {
    open: true,
    hot: true,
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
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
          "sass-loader",
        ],
      },

      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },

      {
        test: /\.(woff2?|ttf)?$/i,

        type: "asset/resource",
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
