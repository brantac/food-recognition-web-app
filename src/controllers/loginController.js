const login_model = require('../models/authentication');

function getLoginPage(req, res) {
    let data = {
        page: 'login'
    }

    res.render('index', data);
}

function loginUser(req, res) {
    res.redirect('/meal/newMeal');
}

module.exports = {
    getLoginPage,
    loginUser
};