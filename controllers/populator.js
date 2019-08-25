const firebase = require('firebase');

const populator = async (req,res) => {
  let obj = {
    source: "Techradar",
    headline: 0,
    link: 'https://www.news.google.com./articles/CBMijAFodHRwczovL2luZGlhbmV4cHJlc3MuY29tL2FydGljbGUvdGVjaG5vbG9neS9tb2JpbGUtdGFicy85LXRoaW5ncy10aGF0LW1ha2Utc2Ftc3VuZy1nYWxheHktbm90ZS0xMC1kaWZmZXJlbnQtZnJvbS1ub3RlLTEwLXBsdXMtNTg5NTc5NC9saXRlL9IBjAFodHRwczovL2luZGlhbmV4cHJlc3MuY29tL2FydGljbGUvdGVjaG5vbG9neS9tb2JpbGUtdGFicy85LXRoaW5ncy10aGF0LW1ha2Utc2Ftc3VuZy1nYWxheHktbm90ZS0xMC1kaWZmZXJlbnQtZnJvbS1ub3RlLTEwLXBsdXMtNTg5NTc5NC9saXRlLw?hl=en-IN&gl=IN&ceid=IN%3Aen',
    description: '',
    image: 'https://homepages.cae.wisc.edu/~ece533/images/cat.png',
    timestamp: '',
    category: 'Technology'
  }
  for(let i=0;i<30;i++) {
    obj.headline = i;
    await firebase.database().ref(`/news/sample`).push(obj);
  }
  res.status(200).json({isSuccess: true});
};

module.exports = {
  populator
};
