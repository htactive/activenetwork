module.exports = {
  entry: {
    login: ['./src/login.jsx'],
    recoverpassword: ['./src/recoverpassword.jsx'],
    app: ['./src/app.jsx']
  },
  output: {
    path: __dirname + "/dist/application",
    publicPath: "/src/dist/application",
    filename: "[name].js"
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        {from: /^\//, to: '/app.html'},
        {from: /^\/login.html\//, to: '/login.html'},
         {from: /^\/recoverpassword.html\//, to: '/recoverpassword.html'}
      ]
    },
    contentBase: "../",
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2016', 'react']
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