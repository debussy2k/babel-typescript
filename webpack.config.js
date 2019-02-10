const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
	mode: "development",
	// target: 'node',	// require('fs')등을 무시 하지 않도록 함.
	entry: {
		"mylib": './src/entry.ts'
	},
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',   // https://webpack.js.org/configuration/output/#module-definition-systems
								// 'umd'설정은 AMD, COMMONJS, global variables 모두 제공함.
		library: 'M1Lib'    // name of the global var: "M1Lib"
	},
	module: {		
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},			
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader" ,
					options: { 
						plugins: ["@babel/transform-runtime"]
					}					
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
	],
	devtool: "inline-source-map",  // source map 생성
};