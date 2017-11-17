/* eslint-disable import/prefer-default-export */

import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export const paths = ({ buildPath, buildDir, entryPath }) => ({
  entry: {
    runner: ['babel-polyfill', entryPath].map(require.resolve),
  },

  output: {
    filename: '[name].[chunkhash].js',
    library: ['[name]'],
    libraryTarget: 'umd',
    path: buildPath,
  },

  devServer: {
    contentBase: buildDir,
  },

  // Paths that can resolve in the require/import statements
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },

  // The context in which webpack runs. In this case,
  // it runs within the context of this package, ntux.
  context: __dirname,
});

export const plugins = ({ buildPath, chunk }) => ([

  new CleanWebpackPlugin([buildPath], { allowExternal: true, verbose: false }),

  chunk ? new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: 2,
  }) : () => {},

]);
