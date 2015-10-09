var path = require('path');

module.exports = {
    entry: {
        main: [
            path.resolve(__dirname, 'app/main')]
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: '[name].js',
    },
    module: {
        loaders: [
            { 
                test: /\.jsx?$/, 
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    }
};