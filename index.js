var devnull = require('dev-null');
var fs = require('fs');
var readline = require('readline');


module.exports = function logFilter() {

  var lineMatcher = new RegExp(process.env.NODE_LOG_FILTER || '');
  var shouldMatch = true;
  if (process.env.NODE_LOG_FILTER_NOT) {
    lineMatcher = new RegExp(process.env.NODE_LOG_FILTER_NOT);
    shouldMatch = false;
  }

  var rl = readline.createInterface({
    input: process.stdin,
    output: devnull()
  });

  rl.on('line', function(line) {
    if (
      shouldMatch && lineMatcher.test(line) ||
      !shouldMatch && !lineMatcher.test(line)
    ) {
      console.log(line);
    }
  });

  rl.on('close', function() {
    process.exit(0);
  });
};
