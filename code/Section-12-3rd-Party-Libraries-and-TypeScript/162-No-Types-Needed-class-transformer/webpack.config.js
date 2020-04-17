const path = require('path');

module.exports = {
    mode: 'development', // tell webpack we are building for development
    entry: './src/app.ts',  // root entry file of project
    output: {
        filename: 'bundle.js',  // output file that webpack creates
        path: path.resolve(__dirname),  // path to output file (must be a full path)
    },
    devtool: 'inline-source-map',  // tells webpack to use the source map files for debugging
    module: {  // how to deal with modules (files)
        rules: [  // rules for dealing with modules
            {
                test: /\.ts$/,  // test to apply for this rule (look for files ending in .ts)
                use: 'ts-loader',  // handle these files with the ts-loader (will transpile)
                exclude: '/node_modules/',  // exclude node_modules directory
            }
        ]
    },
    resolve: {  // specifies how to resolve module imports
        extensions: ['.ts', '.js']  // file extensions to bundle together
    }
};