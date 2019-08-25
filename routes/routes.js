const express            = require('express');
const router             = express.Router();
const { scrapeArticles } = require('../controllers/scraperController');
const { populator } = require('../controllers/populator');

router.get('/news', scrapeArticles);

router.get('/populate', populator);

router.get('/test', function (req, res, next){
  res.status(200).json({isSuccess: true});
});

module.exports = router;
