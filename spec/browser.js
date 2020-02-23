const puppeteer = require('puppeteer')

const headless = process.env.HEADLESS || false
const slowMo = process.env.SLOW_MO || 5
const host = process.env.HOST || 'http://localhost:3000'

const driver = puppeteer
let browser = null
let currentPage = null

const open = async() => {
  return visitHomePage()
}

const visitHomePage = async() => {
  await launchIfNeeded()
  currentPage = await browser.newPage()
  await currentPage.setViewport({ width: 1280, height: 1024 })
  return visit('/')
}

const launchIfNeeded = async() => {
  if (!browser) {
    browser = await driver.launch(
      { headless, slowMo, args: ['--no-sandbox', '--single-process', '--disable-gpu'] })
  }
}

const visit = (path) => {
  const url = host + path + '?api_key=ticktok-zY3wpR'
  return currentPage.goto(url, {
    waitUntil: 'networkidle0'
  })
}

const page = () => {
  return currentPage
}

const close = async() => {
  await currentPage.close()
  await browser.close()
}

module.exports = {
  open,
  visitHomePage,
  visit,
  page,
  close
}
