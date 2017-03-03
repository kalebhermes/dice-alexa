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
        var roll = Math.floor((Math.random() * 12) + 1);

        // Create speech output
        var speechOutput = "On the " + dieType + " die, you rolled: " + roll;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, roll);
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