module.exports = {
  entry: './src/game/src/index.js',
  output: {
    path: __dirname + '/dist/assets/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ],
    postLoaders: [
      { loader: "transform?brfs" }
    ]
  }
};
