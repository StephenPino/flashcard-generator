var inquirer = require('inquirer');
var basicCardJson = require('./basicCard.json');
var clozeCardJson = require('./clozeCard.json');
var basicCardArray = [];
var clozeCardArray = [];
var randomNumBasic = function () {
    return Math.floor((Math.random() * (basicCardArray.length - 1)))
};
var randomNumCloze = function () {
    return Math.floor((Math.random() * (clozeCardArray.length - 1)))
};

var BasicCard = function (front, back) {
    this.front = front;
    this.back = back;
};

var ClozeCard = function (text, cloze) {
    this.text = text;
    this.cloze = cloze;
};

ClozeCard.prototype.clozeCall = function () {
    console.log(this.cloze);
};

ClozeCard.prototype.partial = function () {
    console.log(this.text.replace(this.cloze, '...'));
};

ClozeCard.prototype.fullText = function () {
    console.log(this.text);
};

var basicCardGenerator = function () {
    for (i = 0; i < basicCardJson.length; i++) {
        var newBasicCard = new BasicCard(basicCardJson[i].front, basicCardJson[i].back);
        basicCardArray.push(newBasicCard);
    }
};

var clozeCardGenerator = function () {
    for (i = 0; i < clozeCardJson.length; i++) {
        var newClozeCard = new ClozeCard(clozeCardJson[i].text, clozeCardJson[i].cloze);
        clozeCardArray.push(newClozeCard);
    }
};

var startPrompt = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'selection',
        message: 'Which type of cards would you like to use?',
        choices: [
            'Cloze Cards',
            'Basic Cards',
            'Exit'
        ]
    }]).then(function (res) {
        if (res.selection === "Cloze Cards") {
            clozeCardPrompt();
        }
        else if (res.selection === "Basic Cards") {
            basicCardPrompt();
        }
        else {
            return false;
        }
    });
};

var clozeCardPrompt = function () {
    var randomNum = randomNumCloze();
    inquirer.prompt([{
        type: 'input',
        name: 'question',
        message: 'Question: ' + clozeCardArray[randomNum].partial()
    }]).then(function (res) {
        if (res.question.toLowerCase() === clozeCardArray[randomNum].cloze) {
            console.log("Correct!");
            startPrompt();
        }
        else {
            console.log("Incorrect! The correct answer was " + clozeCardArray[randomNum].cloze);
            startPrompt();
        }
    });
}

var basicCardPrompt = function () {
    var randomNum = randomNumBasic();
    inquirer.prompt([{
        type: 'input',
        name: 'question',
        message: 'Question: ' + basicCardArray[randomNum].front
    }]).then(function (res) {
        if (res.question.toLowerCase() === basicCardArray[randomNum].back) {
            console.log("Correct!");
            startPrompt();
        }
        else {
            console.log("Incorrect! The correct answer was " + basicCardArray[randomNum].back);
            startPrompt();
        }
    });
}

clozeCardGenerator();
basicCardGenerator();
startPrompt();