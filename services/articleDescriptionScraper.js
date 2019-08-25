const $         = require('cheerio');
const puppeteer = require('puppeteer');

const articleDescriptionScraper = async (url) => {
  let description    = '';
  let responseObject = {
    code   : null,
    message: '',
    data   : {}
  }
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage()
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font' || req.resourceType() === 'image' || req.resourceType() === 'video') {
        req.abort();
      }
      else {
        req.continue();
      }
    });
    await page.goto(url, { timeout: 0, waitUntil: 'networkidle2' });
    //await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    const html = await page.content();
    await $('div', html).each(function () {
      let ptags         = $(this).children("p");
      let extractedText = '';
      ptags.each(function () {
        let text = $(this).text();
        if (text.length) {
          extractedText = extractedText.length ? (extractedText + '\n\n' + text) : text;
          if (extractedText.length > description.length) {
            description = extractedText;
          }
        }
      });
    });
    let image = await $('meta[property="og:image"]', html).attr('content');
    await browser.close();
    responseObject.code             = 200;
    responseObject.data.image       = image;
    responseObject.data.description = description;
    return responseObject;
  }
  catch (error) {
    //console.log('err', error);
    await browser.close();
    responseObject.code    = 500;
    responseObject.message = error;
    return responseObject;
  }
}
module.exports = articleDescriptionScraper;
