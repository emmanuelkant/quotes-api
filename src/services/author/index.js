const QuoteServices = require('../quote/index');
const { sanitize } = require('../../utils/string');
const { getAuthor, isValidAuthor } = require('./helpers');

module.exports = {
  allAuthors: async () => {
    const allQuotes = await QuoteServices.allQuotes();

    const authors = await Promise.all(
      allQuotes.map(async quote => {
        const name = quote.author;
        const perfectName = sanitize(name);
        return await getAuthor(`http://quotes.toscrape.com/author/${perfectName}/`, name);
      })
    );

    const singleAuthors = authors.reduce((acc, cur) => {
      if (!acc.find(author => author.name === cur.name)) {
        return [ ...acc, cur ];
      }
      return [ ...acc ];
    }, []);

    return singleAuthors;
  },
  byName: async (name) => {
    const perfectName = sanitize(name);
    const author = await getAuthor(`http://quotes.toscrape.com/author/${perfectName}/`, name);

    if (!isValidAuthor(author)) {
      return [];
    }

    return author;
  },
};
