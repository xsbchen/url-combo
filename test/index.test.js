var assert = require('assert');
var Combo = require('../index')
var fs = require('fs')

var reTags = {
  script: /<(script)([^>]*)>((?:.|\r\n)*?)<\/script>/g,
  link: /<(link)([^>]*?)\/?>/g
}
/**
 * 获取匹配指定正则表达式的TAG列表
 * @param {String} rawHtml 待匹配的HTML源
 * @param {Regexp} reTag 指定的正则表达式
 * @returns {Array} 匹配的TAG列表
 */
function getTags(rawHtml, reTag) {
  var result = [];
  var match;

  while (match = reTag.exec(rawHtml)) {
    result.push(match[0]);
  }
  return result;
}

// 生成文件测试
/*
var combo = new Combo({maxlength: 500})
fs.readFile('source.html', 'utf8', function (err, data) {
  fs.writeFile('target.html', combo.process(data), 'utf8')
})
*/

describe('combo all script src', function() {
  var combo = new Combo()

  it('count the source file script tags', function(done) {
    fs.readFile('source.html', 'utf8', function (err, data) {
      if (err) {
        done(err) 
      } else {
        assert.equal(getTags(data, reTags.script).length, 22) 
        done()
      }
    })
  })

  it('should combo all script src into one', function(done) {
    fs.readFile('source.html', 'utf8', function (err, data) {
      if (err) {
        done(err) 
      } else {
        assert.equal(getTags(combo.process(data), reTags.script).length, 1)
        done()
      }
    })
  })

})


describe('combo script src with maxlength', function() {
  var combo = new Combo({maxlength: 500})

  it('combo script src should have more than one script tag', function(done) {
    fs.readFile('source.html', 'utf8', function (err, data) {
      if (err) {
        done(err) 
      } else {
        assert.notEqual(getTags(combo.process(data), reTags.script).length, 1)
        done()
      }
    })
  })

})

