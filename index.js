var fs = require('fs');
var readline = require('readline');


var NODE_LOG_FILTER = process.env.NODE_LOG_FILTER || '';
var lineMatcher = new RegExp(NODE_LOG_FILTER);
var devnullStream = fs.createReadStream('/dev/null');


module.exports = function logFilter() {
  var readlineStream = readline.createInterface({
    input: process.stdin,
    output: devnullStream
  });

  readlineStream.on('line', function(line) {
    if (lineMatcher.test(line)) {
      console.log(line);
    }
  });
};
