const firebase                  = require('firebase');
const categoryLinkScraper       = require('./categoryLinkScraper');
const articlesScraper           = require('./articlesScraper');
const articleDescriptionScraper = require('./articleDescriptionScraper');
const exceptionalWebsiteScarper = require('./exceptionalWebsiteScraper');
const sanitizer                 = require('./sanitizer');
const exceptionalWebsites       = ["cricbuzz"];

module.exports = async (requestCategory) => {
  try {
    let category     = await categoryLinkScraper(requestCategory);
    let articlesList = await articlesScraper(category);
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
    return articlesList;
  }
  catch (error) {
    throw error;
  }
}


