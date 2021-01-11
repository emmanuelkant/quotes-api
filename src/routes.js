const Router = require('express');

const QuoteController = require('./controllers/quote');
const AuthorController = require('./controllers/author');

const routes = Router();

routes.get('/quotes', QuoteController.show);
routes.get('/authors', AuthorController.show);

module.exports = { routes };
