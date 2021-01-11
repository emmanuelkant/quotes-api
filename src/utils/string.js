/**
 * Sanitize string for my purpouse. In that case, just remove any accents.
 *
 * @param {string} str strign to be sanitized
 * @return {string} sanitized string
 */
const sanitize = str =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/(\.|\s)/g, '-')
    .replace(/\-+/g, '-')
    .replace(/\'/g, '');

module.exports = { sanitize };
