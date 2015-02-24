var assert = require('assert');

var lineMatcherGenerator = require('../lib/line-matcher-generator');


describe('line-matcher-generator module', function() {

  it('no options', function() {
    var matcher = lineMatcherGenerator([]);
    assert(matcher(''));
    assert(matcher('abc'));
  });

  it('--contain foo', function() {
    var matcher = lineMatcherGenerator(['--contain', 'foo']);
    assert(matcher('foo'));
    assert(matcher('afooc'));
    assert(matcher('afoco') === false);
  });

  it('--contain [abc]', function() {
    var matcher = lineMatcherGenerator(['--contain', '[abc]']);
    assert(matcher('[abc]'));
    assert(matcher('a') === false);
  });

  it('--contain foo --not', function() {
    var matcher = lineMatcherGenerator(['--contain', 'foo', '--not']);
    assert(matcher(''));
    assert(matcher('foo') === false);
    assert(matcher('afoob') === false);
    assert(matcher('afobo'));
  });

  it('--match [abc]', function() {
    var matcher = lineMatcherGenerator(['--match', '[abc]']);
    assert(matcher('a'));
    assert(matcher('b'));
    assert(matcher('c'));
    assert(matcher('d') === false);
    assert(matcher('xxaxx'));
    assert(matcher('') === false);
  });

  it('--match [abc] --not', function() {
    var matcher = lineMatcherGenerator(['--match', '[abc]', '--not']);
    assert(matcher(''));
    assert(matcher('a') === false);
  });

  it('aliases', function() {
    assert(lineMatcherGenerator(['-c', 'foo'])('foo'));
    assert(lineMatcherGenerator(['-c', 'foo'])('oo') === false);
    assert(lineMatcherGenerator(['-c', 'foo', '-n'])('oo'));
    assert(lineMatcherGenerator(['-m', '[abc]'])('a'));
    assert(lineMatcherGenerator(['-m', '[abc]'])('d') === false);
  });

  it('--match is priority than --contain', function() {
    assert(lineMatcherGenerator(['-c', 'foo', '-m', '[abc]'])('a'));
  });
});
