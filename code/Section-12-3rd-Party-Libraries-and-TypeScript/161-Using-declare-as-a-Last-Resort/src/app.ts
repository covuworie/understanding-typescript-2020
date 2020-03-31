import _ from 'lodash';

// Let TypeScript know that this variable really does exist
declare var GLOBAL: string;

console.log(_.shuffle([1, 2, 3]));

console.log(GLOBAL);