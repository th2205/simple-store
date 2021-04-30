const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',

  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  output: {
    filename: 'simple-store.js',
    library: {
      name: 'Store',
      type: 'umd',
      export: 'default'
    }
  }
};
