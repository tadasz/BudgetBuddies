/**
 * GET /about
 * About us page
 */
exports.index = function(req, res) {
  res.render('about', {
    title: 'Inspector Budget',
    date_title: 'February 20th, 2016'
  });
};
