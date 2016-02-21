/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('demo', {
    title: 'Inspector Budget',
    date_title: 'February 20th, 2016',
  });
};
