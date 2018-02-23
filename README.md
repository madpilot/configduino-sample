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
