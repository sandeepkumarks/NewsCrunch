const undesirableWordsRegex = "(also read|also watch|read more|first published|copyrights).*(?=\\n)";
const newLineRegex          = "[\\n\\s]{2,}";
const htmlRegex             = "(<([^>]+)>)";

const sanitizer = (description) => {
  return description.replace(new RegExp(undesirableWordsRegex, 'ig'), '').replace(new RegExp(htmlRegex, 'ig'), '').replace(new RegExp(newLineRegex, 'ig'), '\n\n');
}

module.exports = sanitizer;
