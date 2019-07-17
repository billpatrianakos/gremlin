// Authorize
// =========
// Ensure user is authorized before allowing request to proceed

module.exports = (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    req.flash('info', 'You must be logged in to see this page');
    res.redirect('/auth');
  }
};
