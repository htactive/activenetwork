module.exports = {
  entry: {
    login: ['./src/login.jsx'],
    app: ['./src/app.jsx']
  },
  output: {
    path: __dirname + "/dist/application",
    publicPath: "/dist/application",
    filename: "[name].js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        {from: /^\/app.html\//, to: '/app.html'},
        {from: /^\/login.html\//, to: '/login.html'}
      ]
    },
    contentBase: "./public",
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],

  },
  devtool: "source-map",
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};