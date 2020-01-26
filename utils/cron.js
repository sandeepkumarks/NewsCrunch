const cron = require('node-cron');
const scraperHandler = require('../services/scraperHandler');
const categoriesList = [
  "topstories",
  "world",
  "india",
  "sports",
  "technology"
]

const scrapingScheduler = () => {
  cron.schedule('0 6 * * * ', async () => {
    let promises = [];
    for(let i=0; i<categoriesList.length; i++) {
      promises.push(scraperHandler(categoriesList[i]));
    }
    await Promise.all(promises);
  });
}

const cronTester = async () => {
  let promises = [];
  for(let i=0; i<categoriesList.length; i++) {
    promises.push(scraperHandler(categoriesList[i]));
  }
  await Promise.all(promises);
}

module.exports = {
  scrapingScheduler,
  cronTester
};
