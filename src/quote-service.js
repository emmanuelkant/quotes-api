const express = require('express');
const helmet = require('helmet');
const { routes } = require('./routes');
const { handleError } = require('./errors/handle');

const createService = () => {
  const app = express();

  app.use(helmet());
  app.use(express.json());
  app.use(routes);
  app.use(handleError);

  return app;
};

module.exports = { createService };
