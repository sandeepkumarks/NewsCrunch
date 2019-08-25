const $         = require('cheerio');
const puppeteer = require('puppeteer');

const googleNewsUrl  = "https://news.google.com";
const categoriesList = [
  { name: 'Top stories', value: 'topstories', link: '' },
  { name: 'World', value: 'world', link: '' },
  { name: 'India', value: 'india', link: '' },
  { name: 'Sports', value: 'sports', link: '' },
  { name: 'Technology', value: 'technology', link: '' }
];

const categoryLinkExtracter = async (requestCategory) => {
  let index = categoriesList.findIndex(each => each.value === requestCategory);
  if (index === -1) {
    const error      = new Error('Invalid Category');
          error.code = 400;
    throw error;
  }
  const category = categoriesList[index];
  const browser  = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(googleNewsUrl);
    const html          = await page.content();
          category.link = googleNewsUrl + $(`div > a[aria-label="${category.name}"]`, html).attr(`href`);
    await browser.close();
    return category;
  }
  catch (err) {
    await browser.close();
    const error      = new Error('Internal Server Error');
          error.code = 500;
    throw error;
  }
}

module.exports = categoryLinkExtracter;
