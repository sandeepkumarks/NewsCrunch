const firebase                  = require('firebase');
const categoryLinkScraper       = require('../services/categoryLinkScraper');
const articlesScraper           = require('../services/articlesScraper');
const articleDescriptionScraper = require('../services/articleDescriptionScraper');
const exceptionalWebsiteScarper = require('../services/exceptionalWebsiteScraper');
const sanitizer                 = require('../services/sanitizer');
const exceptionalWebsites       = ["cricbuzz"];

const scrapeArticles = async (req, res) => {
  let responseObject = {
    code   : null,
    message: ''
  }
  let requestCategory = req.query.category;
  try {
    let category     = await categoryLinkScraper(requestCategory);
    let articlesList = await articlesScraper(category);
    //let articlesList = [...customLinks];
    let result = [];
    for (let i = 0; i < articlesList.length; i++) {
      let val = null;
      if (exceptionalWebsites.includes(articlesList[i].source.toLowerCase())) {
        val = await exceptionalWebsiteScarper(articlesList[i]);
      }
      else {
        val = await articleDescriptionScraper(articlesList[i].link);
      }
      result.push(val);
    }
    for(let index =0; index<articlesList.length; index++) {
      articlesList[index].image       = result[index].data.image ? result[index].data.image : `default_${articlesList[index].category}.jpg`;
      articlesList[index].description = result[index].data.description ? sanitizer(result[index].data.description) : '';
    }
    articlesList.forEach(async (each) => {
      let isPresent = false;
      await firebase.database().ref(`/news/${category.value}`).orderByChild('headline').equalTo(each.headline).once('value', snapshot => {
        if(snapshot.exists()) {
          isPresent = true;
        }
      });
      if (!isPresent && each.description.length) {
        await firebase.database().ref(`/news/${category.value}`).push(each);
      }
    });

    responseObject.code     = 200;
    responseObject.message  = 'Successfully Scraped';
    responseObject.articles = [...articlesList];
    res.status(200).json(responseObject);
  }
  catch ({ code, message }) {
    responseObject.code    = code;
    responseObject.message = message;
    res.status(code).json(responseObject);
  }
}

module.exports = {
  scrapeArticles
};
