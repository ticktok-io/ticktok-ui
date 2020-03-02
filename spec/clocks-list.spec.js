const chai = require('chai')
const ticktok = require('ticktok')
const { clockNamed } = require('./clock-list-page')
const browser = require('./browser')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
const expect = chai.expect

describe('Clock list', () => {
  before('start browser', async() => {
    await browser.open('/?api_key=ticktok-zY3wpR')
    this.ticktok = ticktok('http://localhost:9643', 'ticktok-zY3wpR')
  })

  it('should show configured clocks', async() => {
    await this.ticktok.schedule({ name: 'row1', schedule: 'every.911.seconds' }, () => {})
    await this.ticktok.schedule({ name: 'row2', schedule: 'every.888.seconds' }, () => {})
    await expect(clockNamed('row1').schedule()).to.eventually.eq('every.911.seconds')
    await expect(clockNamed('row2').schedule()).to.eventually.eq('every.888.seconds')
  })

  it('should pause a clock', async() => {
    const clockName = 'to be paused'
    try {
      await this.ticktok.schedule({ name: clockName, schedule: 'every.10.seconds' }, () => {})
      await clockNamed(clockName).click('pause')
      await clockNamed(clockName).hasAction('resume')
    } finally {
      await clockNamed(clockName).click('resume') // Restoring clock state
    }
  })

  it('should manually tick a clock', (done) => {
    this.ticktok.schedule({ name: 'manual clock', schedule: '@never' }, () => { done() })
    clockNamed('manual clock').click('tick')
  })

  after('close browser', async() => {
    this.ticktok.disconnect()
    await browser.close()
  })
})
