var escapeRegExp = require('escape-regexp');
var minimist = require('minimist');


/**
 * Generate line-matcher from process.argv.slice(2)
 *
 * @param {Array} argv
 * @return {Function}
 */
module.exports = function lineMatcherGenerator(argv) {
  var commandOptions = minimist(argv, {
    'default': {
      contain: '',
      not: false,
      match: ''
    },
    alias: {
      contain: 'c',
      not: 'n',
      match: 'm'
    }
  });

  var matcher = undefined;
  if (commandOptions.match) {
    matcher = new RegExp(commandOptions.match);
  } else {
    matcher = new RegExp(escapeRegExp(commandOptions.contain));
  }

  return function(line) {
    return !commandOptions.not && matcher.test(line) ||
      commandOptions.not && !matcher.test(line);
  };
};
