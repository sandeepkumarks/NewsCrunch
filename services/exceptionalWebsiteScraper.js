const $         = require('cheerio');
const puppeteer = require('puppeteer');
const selectors = [
  {
    source  : 'cricbuzz',
    selector: 'section[itemprop="articleBody"]'
  }
];

const exceptionalWebsiteScraper = async (article) => {
  let description    = '';
  var responseObject = {
    code   : null,
    message: '',
    data   : {}
  }
  let   index         = selectors.findIndex(each => each.source === article.source.toLowerCase());
  let   articleObject = selectors[index];
  const browser       = await puppeteer.launch();
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
    await page.goto(article.link, { timeout: 0, waitUntil: 'networkidle2' });
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    const html = await page.content();
    await $(articleObject.selector, html).each(function () {
      let ptags = $(this).children("p");
      ptags.each(function () {
        let text = $(this).text();
        if (text.length) {
          description += text;
        }
      });
      description += '\n\n';
    });
    let image = await $('meta[property="og:image"]', html).attr('content');
    await browser.close();
    responseObject.code             = 200;
    responseObject.data.image       = image;
    responseObject.data.description = description;
    return responseObject;
  }
  catch (error) {
    await browser.close();
    responseObject.code    = 500;
    responseObject.message = error;
    return responseObject;
  }
}

module.exports = exceptionalWebsiteScraper;
