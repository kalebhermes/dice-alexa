'use strict';
var Alexa = require('alexa-sdk');
var staticValues = require("./staticValues.js");

var APP_ID = staticValues.APP_ID;
var SKILL_NAME = 'Star Wars Dice';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('RollDice');
    },
    'Roll': function () {
        this.emit('RollDice');
    },
    'RollDice': function () {
        var dieType = this.event.request.intent.slots.Dice.value;
        var die = staticValues.diceArray[dieType];


        var roll = Math.floor(Math.random() * die.sides + 1);
        var face = die.faces[roll];

        // Create speech output
        var speechOutput = "On the " + dieType + " die, you rolled: " + face;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, face);
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