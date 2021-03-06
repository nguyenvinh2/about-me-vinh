'use strict';

const answerTemplate = {
  'yes': ['yes', 'y', 'yep', 'sure', 'yeah', 'oui'],
  'no': ['no', 'n', 'nah', 'oh hell no', 'non'],
  'companies': ['microsoft', 'sap', 'boeing', 'general electric', 'nbc', 'lam']
};

const aboutMeInfo = {
  'questions': ['Do I have a CS degree?', 'Do I take the bus to work?', 'Have I lived in Seattle since I was 7?', 'Am I a Belieber?', 'Have I worked for the Navy SEALs?', 'Guess how many ways I can write this application?', 'Guess a company that refused to hire me.'],
  'responseSet': {
    'correct': ['Correct, I have a ME and EE degree.', 'Yep, sadly I have no car and must bus to work.', 'Yes, Seattle Native here but don\'t really know anything about Seattle.', 'Correct, but someone around here is', 'Right, but only as a desk analyst', 'Correctamundo', `Yes, here is the full list: ${answerTemplate.companies.join(', ').toUpperCase()}`
    ],
    'incorrect': ['Wrong! I do have an Engineering degree, though', 'Guess again, I do take the bus and it takes me an hour to get to work', 'That\'s incorrect, I started out living in the Columbia City part of Seattle.', 'Wrong, It\'s Evan who is a Belieber.', 'Well, technically I did work for the Navy SEALs so your answer is wrong.', 'Wrong, try again', `No more guesses or we'll be here forever. The answers are: ${answerTemplate.companies.join(', ').toUpperCase()}`
    ]
  },
  'answer': [answerTemplate.no, answerTemplate.yes, answerTemplate.yes, answerTemplate.no, answerTemplate.yes, Math.floor(Math.random() * 10 + 1), answerTemplate.companies],
  'type': ['binary', 'binary', 'binary', 'binary', 'binary', 'number', 'list']
};


//TODO actually do some more refactoring

function generateQuestionObject(aboutMeInfo) {
  let aboutMeQuestions = {
    'questionSet': []
  };

  for (let i = 0; i < aboutMeInfo.questions.length; i++) {
    let questionSetGetCompacted = {
      'question': aboutMeInfo.questions[i],
      'answer': aboutMeInfo.answer[i],
      'userResponse': '',
      'userEval': '',
      'responseSet': {
        'correct': aboutMeInfo.responseSet.correct[i],
        'incorrect': aboutMeInfo.responseSet.incorrect[i]
      },
      'questionType': aboutMeInfo.type[i]
    };
    aboutMeQuestions.questionSet.push(questionSetGetCompacted);
  }

  return aboutMeQuestions;
}

let aboutMeQuestions = generateQuestionObject(aboutMeInfo);

let VisitingUser = new Player(prompt('Hello there! Enter your name.'));

VisitingUser.runGame(aboutMeQuestions);

console.log(VisitingUser);

function Player(name) {
  this.userName = name;
  this.userPoints = 0;
  this.gameData = {};
  //runs overall game logic
  this.runGame = (aboutMeQuestions) => {
    if (this.userName !== null) {
      let numberGuessingArray = [];
      let listGuessingArray = [];
      let userGuesses = 0;
      let maxNumberGuessTries = 4;
      let maxListGuessTries = 6;

      if (this.userName === '') {
        this.userName = 'Captain America';
        alert('Since you didn\'t enter a name, we\'ll just call you Captain America');
      } else {
        alert(`Hi ${this.userName}, we're going to play a guessing game about moi. Click OK to continue...`);
      }

      for (let i = 0; i < aboutMeQuestions.questionSet.length; i++) {
        aboutMeQuestions.questionSet[i].userResponse = prompt(aboutMeQuestions.questionSet[i].question);
        if (aboutMeQuestions.questionSet[i].userResponse === null) {
          alert('Sorry you didn\'t want to play my game :(');
          break;
        }

        if (aboutMeQuestions.questionSet[i].questionType === 'binary') {
          let tempData = this.trueFalseGuessing(aboutMeQuestions, i);
          i = tempData[0];
          aboutMeQuestions = tempData[1];
        } else if (aboutMeQuestions.questionSet[i].questionType === 'number') {
          let tempData = this.numberGuessing(aboutMeQuestions, numberGuessingArray, userGuesses, maxNumberGuessTries, i);
          numberGuessingArray = tempData[0];
          userGuesses = tempData[1];
          i = tempData[2];
          aboutMeQuestions = tempData[3];
        } else if (aboutMeQuestions.questionSet[i].questionType === 'list') {
          let tempData = this.listGuessing(aboutMeQuestions, listGuessingArray, userGuesses, maxListGuessTries, i);
          listGuessingArray = tempData[0];
          userGuesses = tempData[1];
          i = tempData[2];
          aboutMeQuestions = tempData[3];
        }

        if (i === aboutMeQuestions.questionSet.length-1) {
          alert(`Congrats ${this.userName}! You finished the game. You got ${this.userPoints} out of ${aboutMeQuestions.questionSet.length} questions correct.`);
          this.gameData = aboutMeQuestions;
        }
      }
    }
  };
  //Plays the true false game
  this.trueFalseGuessing = (aboutMeQuestions, i) => {
    if (!answerTemplate.yes.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase()) && !answerTemplate.no.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase())) {
      alert('Sorry, but your answer is not in the right format');
      i--;
    } else if (aboutMeQuestions.questionSet[i].answer.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase())) {
      alert(aboutMeQuestions.questionSet[i].responseSet.correct);
      aboutMeQuestions.questionSet[i].userEval = 'correct';
      this.userPoints++;
    } else {
      alert(aboutMeQuestions.questionSet[i].responseSet.incorrect);
      aboutMeQuestions.questionSet[i].userEval = 'incorrect';
    }
    return [i, aboutMeQuestions];
  };
  //Plays the randomly generate number question
  this.numberGuessing = (aboutMeQuestions, numberGuessingArray, userGuesses, maxNumberGuessTries, i) => {
    numberGuessingArray.push(aboutMeQuestions.questionSet[i].userResponse);
    if (parseInt(aboutMeQuestions.questionSet[i].userResponse) === aboutMeQuestions.questionSet[i].answer) {
      alert(aboutMeQuestions.questionSet[i].responseSet.correct);
      aboutMeQuestions.questionSet[i].userEval = 'correct';
      aboutMeQuestions.questionSet[i].userResponse = numberGuessingArray;
      this.userPoints++;
      userGuesses = 0;
      numberGuessingArray = [];
    } else {
      userGuesses++;
      if (userGuesses === maxNumberGuessTries) {
        alert('You\'re outta luck. Onwards to the next question.');
        aboutMeQuestions.questionSet[i].userEval = 'incorrect';
        aboutMeQuestions.questionSet[i].userResponse = numberGuessingArray;
        userGuesses = 0;
        numberGuessingArray = [];
      } else {
        let tempMessage = aboutMeQuestions.questionSet[i].responseSet.incorrect;
        let triesMessage = `You have ${maxNumberGuessTries - userGuesses} tries left.`;
        if (parseInt(aboutMeQuestions.questionSet[i].userResponse) < aboutMeQuestions.questionSet[i].answer) {
          alert(tempMessage + ' The answer is higher. ' + triesMessage);
        } else if (parseInt(aboutMeQuestions.questionSet[i].userResponse) > aboutMeQuestions.questionSet[i].answer) {
          alert(tempMessage + ' The answer is lower. ' + triesMessage);
        } else {
          alert('That\' not even an integer! ' + triesMessage);
        }
        i--;
      }
    }
    return [numberGuessingArray, userGuesses, i, aboutMeQuestions];
  };
  //Plays the user guesses from a list question
  this.listGuessing = (aboutMeQuestions, listGuessingArray, userGuesses, maxListGuessTries, i) => {
    listGuessingArray.push(aboutMeQuestions.questionSet[i].userResponse);
    if (aboutMeQuestions.questionSet[i].answer.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase())) {
      alert(aboutMeQuestions.questionSet[i].responseSet.correct);
      aboutMeQuestions.questionSet[i].userEval = 'correct';
      aboutMeQuestions.questionSet[i].userResponse = listGuessingArray;
      this.userPoints++;
      listGuessingArray = [];
    } else {
      userGuesses++;
      if (userGuesses === maxListGuessTries) {
        alert(aboutMeQuestions.questionSet[i].responseSet.incorrect);
        aboutMeQuestions.questionSet[i].userEval = 'incorrect';
        aboutMeQuestions.questionSet[i].userResponse = listGuessingArray;
        listGuessingArray = [];
      } else {
        alert(`Wrong! You have ${maxListGuessTries - userGuesses} guesses left.`);
        i--;
      }
    }
    return [listGuessingArray, userGuesses, i, aboutMeQuestions];
  };
}
