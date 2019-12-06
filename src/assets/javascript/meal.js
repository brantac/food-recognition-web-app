class Meal {
    constructor(mealObj) {
        this.myMeal = {
            userId: null,
            meal: {
                mealId: null,
                dateTime: new Date().toUTCString(),
                mealName: '',
                totalKcal: 0
            },
            "food": []
        };
    }

    createMeal() {
        return;
    }

    // editMealName(mealName) {
    //     this.myMeal.meal.mealName = mealName;
    // }

    mealSucessMessage() {
        console.log("Objeto refeição criado com sucesso!");
    }

    addFood(food) {
        // Add food to the meal
        this.myMeal.food.push(food);

        return;
    }

    async getFoodComposition(url) {
        let foodInfo = null;
        let postOptions = {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'omit'
        }

        try {
            let response = await fetch(url, postOptions);
            foodInfo = await response.json();
            console.log(foodInfo);
        } catch (error) {
            throw new Error ('Mensagem de erro: ', error);
        }
        return foodInfo;
    }

    getFoodWithHighestProbability(predictions) {
        let prob;
        let highestProb = -1;
        let highestPrediction;
        predictions.forEach((prediction, index) => {
            prob = prediction.probability;
            if (prob > highestProb) {
                highestProb = prob;
                highestPrediction = prediction;
            };
        });
        return highestPrediction;
    }

    async saveFood(url) {

        let options = {
            method: "POST",
            cache: "no-cache",
            body: JSON.stringify(this.myMeal)
        };
        const response = await fetch(url, options);
        console.log(response);
        return;
    }

}