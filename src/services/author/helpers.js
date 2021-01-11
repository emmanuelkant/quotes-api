const axios = require('axios');
const { JSDOM } = require('jsdom');

/**
 * Get the author information scraped from site.
 *
 * @param {string} url address to get an author biography
 * @param {string} name author's name
 * @return {Object} An author object with it name birthdate, location and biography.
 */
const getAuthor = async (url, name) => {
  const body = await axios.get(encodeURI(url));
  const dom = new JSDOM(body.data);

  const birthdate = dom.window.document.querySelector('.author-born-date').innerHTML;
  const location = dom.window.document.querySelector('.author-born-location').innerHTML;
  const biography = dom.window.document.querySelector('.author-description').innerHTML.trim().slice(0, 50);

  return { name, birthdate, location, biography };
};

/**
 * Validates an author object. Verifies if it has all attributes which is name,
 * birthdate, location and biography. If not, is an invalid object.
 *
 * @param {object} author Author object that contains all informations about author
 * @return {boolean} True or false is is valid or not.A
 */
const isValidAuthor = author => {
  if (author.name && author.birthdate && author.location && author.biography) {
    return true;
  }

  return false;
};

module.exports = { getAuthor, isValidAuthor };
