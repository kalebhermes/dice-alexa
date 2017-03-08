var staticValues = require('./staticValues.js');

var DiceRoller = function(){};

//Consider pulling total, message and spacer out into the class itself.

DiceRoller.prototype.rollStarWarsDice = function(typeOfDie, numberOfDice){
	var rolls = new Array(0);

	var numberOfSides = staticValues.diceArray[typeOfDie].sides;

	for(;numberOfDice > 0;numberOfDice--){
		var roll = Math.floor(Math.random() * numberOfSides + 1);
		roll = staticValues.diceArray[typeOfDie].faces[roll].split(' ');
		rolls = rolls.concat(roll);
	}

	return rolls;

};

module.exports = new DiceRoller();