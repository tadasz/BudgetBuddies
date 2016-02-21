var User = require('../models/User');

/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Inspector Budget',
    date_title: 'February 20th, 2016'
  });
};
