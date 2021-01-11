const author = require('../../services/author/');
const AuthorServices = require('../../services/author/');

module.exports = {
  show: async (request, response, next) => {
    const { name } = request.query;

    try {
      if (name) {
        const author = await AuthorServices.byName(name);
        return response.status(200).json({ data: author });
      }

      const authors = await AuthorServices.allAuthors();

      return response.status(200).json({ data: authors });
    } catch (e) {
      next(e);
    }
  },
};
