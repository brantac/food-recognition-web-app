// const login_model = require('../models/loginModel');

function getLoginPage(req, res) {
    let data = {
        page: 'login'
    }

    res.render('index', data);
}

function loginUser(req, res) {
    res.render('index');
}

module.exports = {
    getLoginPage,
    loginUser
};