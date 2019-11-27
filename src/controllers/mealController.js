const mealModel = require('../models/mealModel');

function getMealsPage(req, res) {
    const data = {
        page: 'meal'
    }
    res.render('index', data);
}

function getMealsList(req, res) {
    const userId = req.params.userId;
    const meals = mealModel.getMealsList(userId);
    res.send(meals);
}

module.exports = {
    getMealsPage,
    getMealsList
};