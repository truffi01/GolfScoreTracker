module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg", "Please Login Again");
        res.redirect("/users/login");
    }
}

//can add this as mdidle wear to any route to be protect from passwords 