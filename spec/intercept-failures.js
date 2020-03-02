const browser = require('./browser')

afterEach(function() {
  if (this.currentTest.state === 'failed') {
    return browser.takeScreenshot(this.currentTest.title)
  }
})
