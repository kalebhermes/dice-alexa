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
        if(!slots.Dice.value){
            this.emit(':tell', 'There was an error in your question. Please specify what kind of die you want to roll. For example, boost or force. Please try again.');
        }
        if(!(slots.Dice.value in staticValues.diceArray)){
            this.emit(':tell', 'There was an error in your question. Please specify what kind of die you want to roll. For example, boost or force. Please try again.');
        }
        var listOfDice = slots.Dice.value.split(' ');
        delete slots.Dice;

        var arrayOfNumbers = [];
        var speechOutput = 'You rolled ';

        for(var number in slots){
            if(isNaN(slots[number].value)){
                this.emit(':tell', 'There was an error in your question. Did you have a request that was too long? Please try again.');
            }
            if(slots[number].value){
                var value = staticValues.numberArray[slots[number].name];
                arrayOfNumbers[(value - 1)] = slots[number].value;
            }
        }

        if(arrayOfNumbers.length != listOfDice.length){
            this.emit(':tell', 'There was an error in your question. Did you have a request that was too long? Please try again.');
        }
        
        var rolls = new Array(0);

        for(var die in listOfDice){
            var values = DiceRoller.rollStarWarsDice(listOfDice[die], arrayOfNumbers[die]);
            rolls = rolls.concat(values);
        }

        var balancedPool = ValueParser.parse(rolls);

        speechOutput += balancedPool;


        this.emit(':tellWithCard', speechOutput, SKILL_NAME);

    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say roll ex why dice, where ex is a whole number and whyy is a type of die. Or, you can say exit... What can I help you with?";
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