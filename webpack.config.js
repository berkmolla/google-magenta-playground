  const path = require('path');

  module.exports = {
    mode: 'development',
    entry: './index.js',
    devServer: {
        contentBase: './dist'
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.(mid)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                    name: 'example.mid'
                }
              }
            ]
          },
          {
              test: /\.(js)$/,
              use: [
                  {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                  }
              ],
              exclude: /node_modules/
          }
        ]
      }
}