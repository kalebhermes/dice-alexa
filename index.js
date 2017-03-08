'use strict';
var Alexa = require('alexa-sdk');
var staticValues = require("./staticValues.js");
var ValueParser = require("./valueParser.js");
var DiceRoller = require("./diceRoller.js");

var APP_ID = staticValues.APP_ID;
var SKILL_NAME = 'Dice Test';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        if(this.event.request.intent != 'RollIntent'){
            this.emit(':ask', "What would you like to roll?", 'What would you like to roll?');
        } else {
            this.emit('RollDice');
        }
    },
    'Unhandled': function () {
        this.emit(':ask', 'What would you like to roll?', 'What would you like to roll?');
    },
    'RollIntent': function () {
        this.emit('RollDice');
    },
    'RollDice': function () {
        var slots = this.event.request.intent.slots;
        var listOfDice = slots.Dice.value.split(' ');
        delete slots.Dice;
        delete slots.Placeholder;

        var arrayOfNumbers = [];
        var speechOutput = 'You rolled ';

        for(var number in slots){
            if(slots[number].value){
                // arrayOfNumbers.push(slots[number].value);
                var value = staticValues.numberArray[slots[number].name];
                arrayOfNumbers[(value - 1)] = slots[number].value;
            }
        }

        if(arrayOfNumbers.length != listOfDice.length){
            this.emit(':tell', 'There was an error in the length of numbers. Please try again.');
        }
        
        var rolls = new Array(0);

        for(var die in listOfDice){
            var values = DiceRoller.rollStarWarsDice(listOfDice[die], arrayOfNumbers[die]);
            rolls = rolls.concat(values);
            console.log(values);
        }

        console.log(rolls);

        var balancedPool = ValueParser.parse(rolls);

        console.log(balancedPool);

        speechOutput += balancedPool;


        this.emit(':tellWithCard', speechOutput, SKILL_NAME);

    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};