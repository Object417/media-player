const { resolve } = require("path")
const { inspect } = require("util")

const { SourceMapDevToolPlugin, ProvidePlugin } = require("webpack")
const { default: merge, mergeWithRules } = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// Ha-ha, it doesn't work anymore
// Maybe, I broke something because I swear it worked!
// const isProd = process.argv[process.argv.indexOf("--mode") + 1] === "production"

const cfgCommon = {
  entry: resolve(__dirname, "src/index"),
  output: {
    filename: (pathData) =>
      pathData.chunk.name === "main"
        ? "[name].[contenthash].js"
        : "vendors/[name].js",
    path: resolve(__dirname, "dist/"),
    // publicPath: "auto",
    assetModuleFilename: "assets/[contenthash][ext][query]",
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  resolve: {
    extensions: ["", ".js", ".mjs", ".jsx", ".wasm", ".json"],
    alias: {
      Assets: resolve(__dirname, "src/assets"),
      Components: resolve(__dirname, "src/components"),
      Store: resolve(__dirname, "src/store")
    },
    // It doesn't work, but ProvidePlugin does
    fallback: {
      // buffer: require.resolve("buffer/"),
      // process: require.resolve("process/"),
      // util: require.resolve("util/")
    }
  },
  devServer: {
    compress: true,
    port: 3000,
    // Enabled HotModuleReplacement. Automatically pushes the plugin
    hot: true,
    // magicHtml: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
      reconnect: 2
    },
    // Allows Webpack to detect changes in index.html and reload the page
    watchFiles: [resolve(__dirname, "index.html")]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
      favicon: resolve(__dirname, "src/assets/icons/favicon16x.png")
    }),
    // Makes these libraries available in any module
    new ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer/", "Buffer"] // import { Buffer } from "buffer/"
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]]
              }
            }
          },
          "resolve-url-loader", // This magic module fixes url imports
          {
            loader: "sass-loader",
            options: { sourceMap: true } // And it requires sourceMap to be on
          }
        ]
      },
      {
        test: /\.(m?js|jsx?)$/i,
        exclude: /node_modules/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.(png|svg|jpe?g|webp|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/imgs/[contenthash][ext][query]"
        }
      },
      {
        test: /\.(woff2?|eot|otf|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash][ext][query]"
        }
      }
    ]
  }
}

const cfgDev = {
  mode: "development",
  devtool: false,
  plugins: [new SourceMapDevToolPlugin()],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader"]
      }
    ]
  }
}

const cfgProd = {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: (pathData) =>
        pathData.chunk.name === "main"
          ? "[name].[contenthash].css"
          : "styles/[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader]
      }
    ]
  }
}

module.exports = (env, argv) => {
  let res

  switch (argv.mode) {
    case "development":
      res = mergeWithRules({
        module: { rules: { test: "match", use: "prepend" } }
      })(cfgCommon, cfgDev)

      // console.log(inspect(res, false, 10, true))

      return res
    case "production":
      res = mergeWithRules({
        module: { rules: { test: "match", use: "prepend" } }
      })(cfgCommon, cfgProd)

      // console.log(inspect(res, false, 10, true))

      return res
    default:
      throw new Error(
        `Unknown mode: ${argv.mode}. Mode must be "development" or "production".`
      )
  }
}
