const $                       = require('cheerio');
const puppeteer               = require('puppeteer');
const googleNewsUrl           = 'https://www.news.google.com';
const countLimit              = 2;
const ignoreWebsites          = ['times of india'];
const sourceSelector          = 'div > div > a';
const headlineAndLinkSelector = 'h3 > a';


module.exports = async (category) => {
  let   articles = [];
  const browser  = await puppeteer.launch();
  try {
    const page = await browser.newPage()
    await page.goto(category.link);
    const html        = await page.content();
    let   result      = $('article', html);
    let   resultArray = Array.from(result);
    if (!resultArray.length) {
      const error      = new Error('No Articles Found');
            error.code = 404;
      throw error;
    }
    for (let i = 0; i < resultArray.length; i++) {
      let source   = $(resultArray[i]).find(sourceSelector).text();
      let headline = $(resultArray[i]).find(headlineAndLinkSelector).text();
      if (headline.length > 0 && !ignoreWebsites.includes(source.toLowerCase())) {
        articles.push({
          source     : source,
          headline   : headline,
          link       : googleNewsUrl + $(resultArray[i]).find(headlineAndLinkSelector).attr('href'),
          description: '',
          image      : '',
          timestamp  : new Date().toISOString(),
          category   : category.name
        })
        if (articles.length === countLimit) {
          break;
        }
      }
    }
    await browser.close();
    return articles;
  }
  catch (err) {
    await browser.close();
    const error      = new Error('Internal Server Error');
          error.code = 500;
    throw error;
  }
}
