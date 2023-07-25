const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'core.util': path.resolve("./shared/util"),
      'core.types': path.resolve("./shared/types")
    },
    fallback: {
      fs: false
    },
    extensions: ['.js']
  },
  entry: './beeline.js',
  output: {
    filename: 'beeline.js',
    path: path.resolve('../dist'),
    library: "BeelineJS"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/
      }]
  }
};
