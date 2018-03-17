/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if(res.locals.user){
      res.redirect("/dashboard");
  }
  else {
      res.render('signin', {
          title: "Dashboard Login"
      });
  }
};