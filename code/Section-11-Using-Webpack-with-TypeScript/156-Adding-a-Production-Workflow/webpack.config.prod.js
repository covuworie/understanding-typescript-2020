// We had to:
// 1. Copy the webpack.config.js file and rename it to a name of our choosing.
// 2. Set the "mode" key and value "production" to tell webpack we are building for production so it optimizes for production.
// 3. Remove the "publicPath" key and value "dist" below as we are no longer running the webpack-dev-server 
// 4. Set the key "devtool" to "none" so that webpack does not generate any source maps for debugging.
// 5. At the terminal run "npm install --save-dev clean-webpack-plugin" to cleanup the "dist" folder whenever we rebuild the project.
// 6. Import the "clean-webpack-plugin at the top of the file using `require`".
// 7. Instantiate the plugin in the plugins section at the bottom of the file.
// 8. Amend the "build" value under "scripts" in the package.json file to read this config file instead of the default.
// 9. Move the index.html and app.css files to this directory (and change where the "script src" points to in the html file) to prevent webpack from deleting them.
// 10. At the terminal run "npm run build" to build the application for production.
// 11. Go to http://localhost:8080/ to see the running application.

const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production', // tell webpack we are building for production
    entry: './src/app.ts',  // root entry file of project
    output: {
        filename: 'bundle.js',  // output file that webpack creates
        path: path.resolve(__dirname, 'dist'),  // path to output file (must be a full path)
    },
    devtool: 'none',  // tells webpack to not generate the source map files for debugging
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
    },
    plugins: [  // additional functionality to add to the whole project
        new CleanPlugin.CleanWebpackPlugin()
    ]
};