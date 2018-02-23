# Configduino

This is a sample project that can act as a skeleton for a [configduino](https://github.com/madpilot/configduino) web app.

Cloning it as using it as a starting point is a valid strategy, but if you want to understand what is actually needed, see below:

# Setup

## Packages

First things first, install preact as a runtime dependency

```
yarn add preact
```

And configduino as a dev dependency

```
yarn add --dev configduino

```

For this sample project, I'll use webpack as a packager.

```
yarn add --dev webpack
```

We'll need babel to deal with ES6 and the transformation of the preact JSX

```
yarn add --dev babel-cli
yarn add --dev babel-preset-env
yarn add --dev babel-plugin-transform-react-jsx
```

So webpack knows how load different files, we add babel-loader (so ```import``` works), style-loader and css-loader gives use CSS module support.

```
yarn add --dev babel-loader
yarn add --dev style-loader
yarn add --dev css-loader
```

The Extract Text Webpack plugin allows use to output a real CSS file

```
yarn add --dev extract-text-webpack-plugin
```

The HTML plugin will generate a HTML file that includes references to the generated CSS and JS files

```
yarn add --dev html-webpack-plugin
```

Finally, we user HTML Webpack Inline Source to mash the three files together into a single HTML file that we can deliver via the Arduino.

```
yarn add --dev html-webpack-inline-source-plugin
```

## Webpack file

Import webpack, and the plugins we need

```
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import path from 'path';
```

```
const ENV = process.env.NODE_ENV || 'development';
module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: './index.js',
```

Set the JavaScript output file to bundle.js in the build directory

```
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: 'bundle.js'
  },
```

Tell webpack where to find include files

```
  resolve: {
    extensions: ['.jsx', '.js' ],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      'node_modules'
    ]
  },
```

Tell Webpack to use babel-loader for .js and .jsx files, and css-loader for .css files

css-loader is configured to user css modules, and to use short class names in production.

```
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?modules&localIdentName=" + (ENV == 'production' ? "[hash:base64:4]" : "[name]__[local]___[hash:base64:5]")
        })
      },
    ]
  },
```

Tell Extract Text Plugin to output all compiled CSS to style.css, and tell the HTML plugin to compile index.ejs

Finally, inline the CSS and JS into the HTML file.

```
	plugins: ([
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true, disable: ENV !== 'production' }),
    new HtmlWebpackPlugin({
			template: './index.ejs',
			minify: { collapseWhitespace: true },
      inlineSource: '(.js|.css)$'
		}),
    new HtmlWebpackInlineSourcePlugin()
  ]),
```

```
	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	}
};
