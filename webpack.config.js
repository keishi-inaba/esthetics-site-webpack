// 'production'か'development'を指定
const MODE = "development";
// ソースマップの利用有無
const enabledSourceMap = MODE === "development";

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: MODE,
  entry: `./src/index.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js"
  },
  devServer: {
    static: "dist",
    open: true
  },
  module: {
    rules: [
      // Sassファイルの読み込みとコンパイル
      {
        // 対象をなるファイルの拡張子
        test: /\.scss/,
        // ローダー名
        use: [
          // linkタグに出力するローダー
          "style-loader",
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     esModule: false,
          //   },
          // },
          {
            // CSSをバンドルするための設定
            loader: "css-loader",
            options: {
              // オプションでCSS内のURL ()メソッドを取り込む
              url: true,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            // Sassをバンドルする為の設定
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jag|svg)$/,
        // 画像をBase64として取り込む
        type: "asset/inline",
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]"
        },
      },
    ],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: "style.css",
    // }),
  ],
  target: ["web", "es5"],
};
