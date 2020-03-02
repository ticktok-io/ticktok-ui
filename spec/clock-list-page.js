const browser = require('./browser')
const assert = require('assert')

const clockNamed = (name) => {
  return new ClockRow(name)
}

class ClockRow {
  constructor(name) {
    this.name = name
  }

  async schedule() {
    const row = await this.rowElement()
    return browser.page().evaluate(row => {
      const tds = [...row.getElementsByTagName('td')]
      return tds[1].textContent
    }, row)
  }

  async rowElement() {
    return browser.page().waitForXPath(`//tr[td//text()[contains(., '${this.name}')]]`)
  }

  async click(button) {
    const row = await this.rowElement()
    const buttonElement = await row.$(`button[name='${button}']`)
    assert(buttonElement != null, `Button '${button}' not found`)
    return buttonElement.click()
  }

  async hasAction(actionName) {
    return browser.page().waitForXPath(
      `//tr[td//text()[contains(., '${this.name}')] and td//button[@name='${actionName}']]`)
  }
}

module.exports = {
  clockNamed
}
