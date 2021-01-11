const QuoteServices = require('../../services/quote');

module.exports = {
  show: async (request, response, next) => {
    const { author, tag } = request.query;

    try {
      if (author) {
        const quotesByAuthor = await QuoteServices.byAuthor(author);
        return response.status(200).json({ data: quotesByAuthor });
      }

      if (tag) {
        return await QuoteServices.byTag(tag);
      }

      return await QuoteServices.allQuotes();
    } catch (err) {
      next(err);
    }
  },
};
