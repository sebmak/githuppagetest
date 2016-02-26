var path = require('path');

module.exports = {
    output: {
        filename: 'Bundle.js',
        libraryTarget: 'var',
        library: 'Bundle'
    },
    resolve: {
        root: [
            path.resolve('./lib')
        ],
        moduleDirectories: ["node_modules"]
    },
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/,
                loaders: ['babel']
            }
        ]
    }
}
