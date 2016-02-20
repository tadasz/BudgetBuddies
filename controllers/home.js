/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Budget Buddy',
    date_title: 'February 20th, 2016'
  });
};
