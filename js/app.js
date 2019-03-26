'use strict';

let answerTemplate = {
  'answerSet': {
    'yes': ['yes', 'y', 'yep', 'sure', 'yeah', 'oui'],
    'no': ['no', 'n', 'nah', 'oh hell no', 'non']
  }
};

let aboutMeInfo = {
  'questionSet': {
    'questions': ['Do I have a CS degree?', 'Do I take the bus to work?', 'Have I lived in Seattle since I was 7?', 'Am I a Belieber?', 'I worked for the Navy SEALs?'],
    'responseSet': {
      'correct': ['Correct, I have a ME and EE degree.', 'Yep, sadly I have no car and must bus to work.', 'Yes, Seattle Native here but don\'t really know anything about Seattle.', 'Correct, but someone around here is', 'Right, but only as a desk analyst'
      ],
      'incorrect': ['Wrong! I do have an Engineering degree, though', 'Guess again, I do take the bus and it takes me an hour to get to work', 'That\'s incorrect, I started out living in the Columbia City part of Seattle.', 'Wrong, It\'s Evan who is a Belieber.', 'Well, technically I did work for the Navy SEALs so your answer is wrong.'
      ]
    },
  },
  'answer': [answerTemplate.answerSet.no, answerTemplate.answerSet.yes, answerTemplate.answerSet.yes, answerTemplate.answerSet.no, answerTemplate.answerSet.yes]
};

function AboutMeGame(name, questions) {
  this.userName = name,
  this.guessingGameData = questions,
  this.userAnswer = [];

  this.playGame = () => {
    alert(`Hi ${this.userName}, we're going to play a guessing game about moi. Click OK to continue...`);
    for (let i = 0; i < this.guessingGameData.questionSet.questions.length; i++) {
      this.userAnswer.push(prompt(this.guessingGameData.questionSet.questions[i]));
      console.log(this.userAnswer[i]);
      console.log(this.guessingGameData.answer[i]);
      if(this.guessingGameData.answer[i].includes(this.userAnswer[i].toLowerCase())) {
        alert(this.guessingGameData.questionSet.responseSet.correct[i]);
      } else {
        alert(this.guessingGameData.questionSet.responseSet.incorrect[i]);
      }
      console.log(`${this.userName} answered ${this.userAnswer[i]} to Question "${this.guessingGameData.questionSet.questions[i]}".`);
    }
  };
}

let startGame = new AboutMeGame(prompt('Hello there! Enter your name.'), aboutMeInfo);

startGame.playGame();

