const HTmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: 'development',
	output: {
		clean: true,
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
		]
	},

	optimization: {},

	plugins: [
		new HTmlWebpackPlugin({
			title: 'Mi webpack App',
			template: './src/index.html',
			filename: './index.html',
		}),

		new MiniCssExtractPlugin({
			filename: '[name].css',
			ignoreOrder: false,
		}),

		new CopyPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' },
      ],
    }),
				
	]
}
