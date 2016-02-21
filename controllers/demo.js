var moment = require('moment');

/**
 * GET /
 * Demo page.
 */
exports.index = function(req, res) {
  res.render('demo', {
    title: 'Inspector Budget',
    date_title: moment().format("MMMM Do YYYY")
  });
};
