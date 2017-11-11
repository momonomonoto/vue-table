module.exports = {
  entry: './main.js',
  output: {
    path: `${__dirname}/docs/build/`,
    publicPath: 'build/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: { css: 'vue-style-loader!css-loader' },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /docs/],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  resolve: {
    alias: { vue$: 'vue/dist/vue.esm.js' },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    contentBase: 'docs',
    port: '8090',
  },
};
