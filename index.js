const {url, time, SCKEY, text, desp} = require('./config')
const axios = require('axios')
const puppeteer = require('puppeteer');
/* 
  iconicon_sign 可签约, 可立即入住
  iconicon_presign 可预签
  iconicon_release 待释放
  iconicon_turn 自如客转租
  iconicon_book 未知
*/

const initMonitor =  async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']})
  const page = await browser.newPage()
  await page.goto(url)

  const interval = setInterval(async () => {
    const className = await page.$eval('.Z_name .status', el => el.className)
    if (className.indexOf('iconicon_release') > -1) {
      console.log('房源待释放')
    } else {
      console.log('房源状态变更')
      wechatServerCall()
      overMonitor(interval, browser)
    }
  }, time)
}

const wechatServerCall = async () => {
  await axios.get(`https://sc.ftqq.com/${SCKEY}.send?text=${encodeURIComponent(text)}&desp=${encodeURIComponent(desp)}`)
}

const overMonitor = async (interval, browser) => {
  clearInterval(interval)
  await browser.close()
}

initMonitor()
