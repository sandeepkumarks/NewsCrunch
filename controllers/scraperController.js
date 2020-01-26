const scraperHandler       = require('../services/scraperHandler');

const scrapeArticles = async (req, res) => {
  let responseObject = {
    code   : null,
    message: ''
  }
  let requestCategory = req.query.category;
  try {
    let articlesList     = await scraperHandler(requestCategory);

    //Construction of response object
    responseObject.code     = 200;
    responseObject.message  = 'Successfully Scraped';
    responseObject.articles = [...articlesList];
    res.status(200).json(responseObject);
  }
  catch ({ code, message }) {
    //Construction of response object
    responseObject.code    = code;
    responseObject.message = message;
    res.status(code).json(responseObject);
  }
}

module.exports = {
  scrapeArticles
};
