var devnull = require('dev-null');
var fs = require('fs');
var readline = require('readline');


var lineMatcher = new RegExp(process.env.NODE_LOG_FILTER || '');
var isNotMatched = false;
if (process.env.NODE_LOG_FILTER_NOT) {
  lineMatcher = new RegExp(process.env.NODE_LOG_FILTER_NOT);
  isNotMatched = true;
}


module.exports = function logFilter() {
  var rl = readline.createInterface({
    input: process.stdin,
    output: devnull()
  });

  rl.on('line', function(line) {
    var matched = lineMatcher.test(line);
    if (
      !isNotMatched && matched ||
      isNotMatched && !matched
    ) {
      console.log(line);
    }
  });

  rl.on('close', function() {
    process.exit(0);
  });
};
