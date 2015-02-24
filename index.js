var devnull = require('dev-null');
var fs = require('fs');
var readline = require('readline');

var lineMatcherGenerator = require('./lib/line-matcher-generator');


module.exports = function logFilter() {

  var lineMatcher = lineMatcherGenerator(process.argv.slice(2));

  var rl = readline.createInterface({
    input: process.stdin,
    output: devnull()
  });

  rl.on('line', function(line) {
    if (lineMatcher(line)) {
      console.log(line);
    }
  });

  rl.on('close', function() {
    process.exit(0);
  });
};
