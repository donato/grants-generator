let yaml = require('yamljs')

let input = process.argv[2];
let j = require(input);
console.log(yaml.stringify(j, 10))
