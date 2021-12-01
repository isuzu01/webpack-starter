const HTmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	mode: 'production',
	output: {
		clean: true,
		filename: 'main.[contenthash].js'
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false,
					minimize: false
				},
			},
			{
        test: /\.css$/,
				exclude: /style.css$/i,
        use: [
					{loader:"style-loader"}, 
					{loader:"css-loader"}
				],
      },
			{
				test: /style.css$/i,
				use: [ MiniCssExtractPlugin.loader,'css-loader' ],
			},
			{
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
			{
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
			}
		]
	},

	optimization: {
		minimize: true,
    minimizer: [
			new TerserPlugin(),
			new CssMinimizerPlugin(),
		],
	},

	plugins: [
		new HTmlWebpackPlugin({
			title: 'Mi webpack App',
			template: './src/index.html',
			filename: './index.html',
		}),

		new MiniCssExtractPlugin({
			filename: '[name].[fullhash].css',
			ignoreOrder: false,
		}),

		new CopyPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' },
      ],
    }),
				
	]
}
