var staticValues = require('./staticValues.js');

var ValueParser = function(){};

ValueParser.prototype.parse = function(values){
	var returnValue = {
		'Success': 		0,
		'Advantage': 	0,
		'Failure': 		0,
		'Threat': 		0,
		'Triumph': 		0,
		'Despair': 		0,
		'Black': 		0,
		'White': 		0,
		'Blank':  		0
	}

	for (value in values){
		returnValue[values[value]] += 1;
	}

	returnValue = this.balance(returnValue);
	returnValue = this.message(returnValue);

	return returnValue;
};

ValueParser.prototype.balance = function(values){
	if(values.Success >= values.Failure){
		values.Success -= values.Failure;
		values.Failure = 0;
	} else {
		values.Failure -= values.Success;
		values.Success = 0;
	}
	if(values.Advantage >= values.Threat){
		values.Advantage -= values.Threat;
		values.Threat = 0;
	} else {
		values.Threat -= values.Advantage;
		values.Advantage = 0;
	}

	return values;
};

ValueParser.prototype.message = function(values, guildID){
	var message = '';
	var otherThanBlank = false;
	for (key in values){
		if(values[key] > 0 && key != 'Blank'){
			otherThanBlank = true;
			message += values[key] + ' ' + key + ' ';
			if(key == 'White' || key == 'Black'){
				message += 'Pips ';
			}
		}
	}
	if(otherThanBlank == false){
		message = 'all blanks! Sorry about that.'
	}
	return message;
};

module.exports = new ValueParser();