// We had to:
// 1. Comment out the "rootDir" key in the tsconfig.json as webpack determines this.
// 2. Remove the .js extension from all module imports as webpack will create the
// javascript file
// 3. Create this configuration file for webpack
// 4. Set "sourceMap" to true in tsconfig.json to help with debugging
// 5. Add "build" key and "webpack" value to the "scripts" object in package.json
// 6. Execute the command "npm run build"
// 7. Change the "src" attribute of the "script" tag in index.html to point at the bundle.js file

const path = require('path');

module.exports = {
    entry: './src/app.ts',  // root entry file of project
    output: {
        filename: 'bundle.js',  // output file that webpack creates
        path: path.resolve(__dirname, 'dist')  // path to output file (must be a full path)
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