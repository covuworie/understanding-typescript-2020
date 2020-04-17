// We had to:
// 1. Add "start" key and "webpack-dev-server" value to the "scripts" object in package.json.
// 2. Add the "publicPath" key and value "dist" below to tell webpack where to output the in-memory bundle.js file
// 3. Set the "mode" key and value "development" to tell webpack we are building for development so it optimizes for development
// 4. Execute the command "npm start" which starts a development server at http://localhost:8080/ which we can navigate to in the browser.
// 5. Go to http://localhost:8080/dist/ to see the running application.

const path = require('path');

module.exports = {
    mode: 'development', // tell webpack we are building for development
    entry: './src/app.ts',  // root entry file of project
    output: {
        filename: 'bundle.js',  // output file that webpack creates
        path: path.resolve(__dirname, 'dist'),  // path to output file (must be a full path)
        publicPath: 'dist' // path to create output file in when running webpack-dev-server
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