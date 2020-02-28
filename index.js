const {url, SCKEY, text, desp} = require('./config')
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
  interval(page, browser)
}

const interval = async (page, browser, num = 0) => {
  if (num) {
    await page.reload({waitUntil: 'networkidle0'})
  } else {
    await page.goto(url, {waitUntil: 'networkidle0'})
  }
  const className = await page.$eval('.Z_name .status', el => el.className)
  if (className && className.indexOf('iconicon_release') === -1) {
    console.log('房源状态变更')
    wechatServerCall()
    await browser.close()
  } else {
    console.log(`查询第${num + 1}次: 房源待释放`)
    interval(page, browser, num + 1)
  }
}

const wechatServerCall = async () => {
  await axios.get(`https://sc.ftqq.com/${SCKEY}.send?text=${encodeURIComponent(text)}&desp=${encodeURIComponent(desp)}`)
}

initMonitor()
