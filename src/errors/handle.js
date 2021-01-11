module.exports = {
  handleError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(200).json({ message: 'Somenthing went wrong', err: err.stack });
  },
};
