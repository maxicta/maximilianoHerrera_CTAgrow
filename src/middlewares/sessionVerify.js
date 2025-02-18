const sessionVerify = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else if (req.path === '/users/login') {
        next(); // Permite el acceso a la ruta de login
    } else {
        res.redirect('/users/login');
    }
};


module.exports = sessionVerify;
