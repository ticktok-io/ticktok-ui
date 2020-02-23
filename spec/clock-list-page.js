const browser = require('./browser')

const clockNamed = async(name) => {
  const row = await browser.page().$x(`//tr[td//text()[contains(., '${name}')]]`)

  return browser.page().evaluate(row => {
    const tds = [...row.getElementsByTagName('td')]
    return { name: tds[0].textContent, schedule: tds[1].textContent }
  }, row[0])
}

module.exports = {
  clockNamed
}
