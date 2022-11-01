const fs = require('fs')
const express = require('express')
const app = express()
process.setMaxListeners(0)

app.use(express.json())

const puppeteer = require('puppeteer-core')

async function getLyrics(n) {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
    ],
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  })

  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(0)
  await page.goto('https://sasyabook.com/hymns/', {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })
  await page.waitForSelector('.toast-message')

  await page.type('input[type=number]', n.toString())
  await page.click('input[type=submit]')
  await page.waitForSelector('#hymn_area')

  let data = await page.evaluate((n) => {
    var lyrics = { stanzas: [] }
    const li = document.querySelectorAll('#hymn_area>li')
    for (let i = 0; i < li.length; i++) {
      lyrics.stanzas.push(li[i].textContent.replace(/\n/g, ' '))
    }
    const author = document.querySelector('#author_cell').textContent
    const title = document.querySelector('#hymn_title').textContent

    return { ...lyrics, author, title, hymnno: n, tune: '' }
  }, n)
  return data
}

const allSongsDetails = []
for (let i = 225; i <= 228; i++) {
  getLyrics(i)
    .then((details) => {
      allSongsDetails.push(details)
    })
    .then(() => {
      fs.writeFileSync('./hymnDetails.json', JSON.stringify(allSongsDetails))
    })
}

// songDetails.then((ly) => {
//   fs.writeFileSync('./hymnDetails.json', JSON.stringify(ly))
// })
app.listen(3008, () => {
  console.log('Server started')
})
