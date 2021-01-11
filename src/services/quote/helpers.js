const axios = require('axios');
const { JSDOM } = require('jsdom');

/**
 * Format the the data retrieved by quotes page.
 *
 * @param {array} htmlQuotes Html element of all quotes of one page
 * @return {array} An array formatted with all quotes informations from one page
 */
const formatQuotes = htmlQuotes => {
  const formattedQuotes = [];

  htmlQuotes.forEach(quote => {
    const tags = [];
    const text = quote.querySelector('.text').innerHTML.trim().slice(0, 50);
    const author = quote.querySelector('.author').innerHTML;
    const htmlTags = quote.querySelectorAll('.tag') || [];

    htmlTags.forEach(tag => {
      tags.push(tag.innerHTML);
    });

    formattedQuotes.push({ text, author, tags });
  });

  return formattedQuotes;
};

/**
 * Access the site of the quotes and scrape the informations needed
 *
 * @param {string} url Address of site that have quotes
 * @return {array} The quotes already formatted.
 */
const getQuotes = async url => {
  const quotes = [];
  let pageQuotes = [];
  let pageNumber = 1;

  do {
    const body = await axios.get(`${url}/page/${pageNumber}/`);
    const dom = new JSDOM(body.data);

    pageQuotes = dom.window.document.querySelectorAll('.quote');

    const formattedQuotes = formatQuotes(pageQuotes);

    quotes.push(...formattedQuotes);

    pageNumber++;
  } while (pageQuotes.length > 0);

  return quotes;
};

module.exports = { getQuotes };
