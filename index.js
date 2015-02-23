var fs = require('fs');
var readline = require('readline');


var lineMatcher = new RegExp(process.env.NODE_LOG_FILTER || '');
var isNotMatched = false;
if (process.env.NODE_LOG_FILTER_NOT) {
  lineMatcher = new RegExp(process.env.NODE_LOG_FILTER_NOT);
  isNotMatched = true;
}
var devnullStream = fs.createReadStream('/dev/null');


module.exports = function logFilter() {
  var readlineStream = readline.createInterface({
    input: process.stdin,
    output: devnullStream
  });

  readlineStream.on('line', function(line) {
    var matched = lineMatcher.test(line);
    if (
      !isNotMatched && matched ||
      isNotMatched && !matched
    ) {
      console.log(line);
    }
  });
};
