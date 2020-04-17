// We had to:
// 1. Comment out the "rootDir" key in the tsconfig.json as webpack determines this.
// 2. Remove the .js extension from all module imports as webpack will create the
// javascript files
// 3. Create this configuration file for webpack

const path = require('path');

module.exports = {
    entry: './src/app.ts',  // root entry file of project
    output: {
        filename: 'bundle.js',  // output file that webpack creates
        path: path.resolve(__dirname, 'dist')  // path to output file (must be a full path)
    }
};