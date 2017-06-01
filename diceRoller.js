var staticValues = require('./staticValues.js');

var DiceRoller = function(){};

//Consider pulling total, message and spacer out into the class itself.

DiceRoller.prototype.rollStarWarsDice = function(typeOfDie, numberOfDice){
	var rolls = 0;

	var numberOfSides = typeOfDie;

	for(;numberOfDice > 0;numberOfDice--){
		var roll = Math.floor(Math.random() * numberOfSides + 1);
		rolls += roll;
	}

	return rolls;

};

module.exports = new DiceRoller();