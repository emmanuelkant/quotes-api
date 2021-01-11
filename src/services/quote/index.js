const { getQuotes } = require('./helpers');

module.exports = {
  allQuotes: async () => {
    return await getQuotes(`http://quotes.toscrape.com`);
  },
  byAuthor: async (author) => {
    const formattedQuotes = await getQuotes(`http://quotes.toscrape.com`);

    return formattedQuotes.filter(quote => quote.author === author);;
  },
  byTag: async (tag) => {
    return await getQuotes(`http://quotes.toscrape.com/tag/${tag}`);
  },
};
