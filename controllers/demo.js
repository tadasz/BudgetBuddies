/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('demo', {
    title: 'Demo',
    date_title: 'February 20th, 2016',
    rendering_game: true
  });
};
