const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'core.util': path.resolve("./src/shared/util"),
      'core.types': path.resolve("./src/shared/types")
    },
    fallback: {
      fs: false
    },
    extensions: ['.js']
  },
  entry: './src/beeline.js',
  output: {
    filename: 'beeline.js',
    path: path.resolve('./dist'),
    library: "BeelineJS"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/
      }]
  }
};
