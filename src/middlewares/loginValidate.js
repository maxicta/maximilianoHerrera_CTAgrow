const loginVerify = (req, res, next) => {
    if (req.session.user) {
        //console.log("usuario logueado print desde loginValidate");
        //console.log(req.session.user);
        const user = req.session

        res.redirect("/users/profile/" + req.session.user.id);
    } else {
        console.log("usuario no logueado desde loginValidate");
        next();
    }
};

module.exports = loginVerify;