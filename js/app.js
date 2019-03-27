'use strict';

const answerTemplate = {
  'yes': ['yes', 'y', 'yep', 'sure', 'yeah', 'oui'],
  'no': ['no', 'n', 'nah', 'oh hell no', 'non'],
  'companies': ['microsoft', 'sap', 'boeing', 'general electric', 'nbc', 'lam']
};


const aboutMeInfo = {
  'questions': ['Do I have a CS degree?', 'Do I take the bus to work?', 'Have I lived in Seattle since I was 7?', 'Am I a Belieber?', 'Have I worked for the Navy SEALs?', 'Guess how many ways I can write this application?' , 'Guess a company that refused to hire me.'],
  'responseSet': {
    'correct': ['Correct, I have a ME and EE degree.', 'Yep, sadly I have no car and must bus to work.', 'Yes, Seattle Native here but don\'t really know anything about Seattle.', 'Correct, but someone around here is', 'Right, but only as a desk analyst', 'Correctamundo', `Yes, here is the full list: ${answerTemplate.companies.join(' ')}`
    ],
    'incorrect': ['Wrong! I do have an Engineering degree, though', 'Guess again, I do take the bus and it takes me an hour to get to work', 'That\'s incorrect, I started out living in the Columbia City part of Seattle.', 'Wrong, It\'s Evan who is a Belieber.', 'Well, technically I did work for the Navy SEALs so your answer is wrong.', 'Wrong, try again', `No more guesses or we'll be here forever. The answers are: ${answerTemplate.companies.join(' ')}`
    ]
  },
  'answer': [answerTemplate.no, answerTemplate.yes, answerTemplate.yes, answerTemplate.no, answerTemplate.yes, Math.floor(Math.random() * 10 + 1), answerTemplate.companies],
  'type': ['binary', 'binary', 'binary', 'binary', 'binary', 'number', 'list']
};

let aboutMeQuestions= {
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

let userGameSelection = prompt('Do you want to play a game? Click OK to continue. Click Cancel to exit...', 'No need to enter text');

if (userGameSelection !== null) {
  let userName = prompt('Hello there! Enter your name.');
  let userPoints = 0;
  let userGuesses = 1;
  let maxNumberGuessTries = 4;
  let maxListGuessTries = 6;
  if (userName === '' || userName === null) {
    userName = 'Captain America';
    alert('Since you didn\'t enter a name, we\'ll just call you Captain America');
  } else {
    alert(`Hi ${userName}, we're going to play a guessing game about moi. Click OK to continue...`);
  }
  for(let i = 0; i < aboutMeQuestions.questionSet.length; i++) {
    aboutMeQuestions.questionSet[i].userResponse = prompt(aboutMeQuestions.questionSet[i].question);
    if(aboutMeQuestions.questionSet[i].userResponse === null) {
      alert('Sorry you didn\'t want to play my game :(');
      break;
    } else {
      if(aboutMeQuestions.questionSet[i].questionType === 'binary') {
        if(!answerTemplate.yes.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase()) && !answerTemplate.no.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase())) {
          alert('Sorry, but your answer is not in the right format');
          i--;
          continue;
        } else if (aboutMeQuestions.questionSet[i].answer.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase())) {
          alert(aboutMeQuestions.questionSet[i].responseSet.correct);
          aboutMeQuestions.questionSet[i].userEval = 'correct';
          userPoints ++;
        } else {
          alert(aboutMeQuestions.questionSet[i].responseSet.incorrect);
          aboutMeQuestions.questionSet[i].userEval = 'incorrect';
        }
      } else if (aboutMeQuestions.questionSet[i].questionType === 'number') {
        if (userGuesses < maxNumberGuessTries) {
          if (parseInt(aboutMeQuestions.questionSet[i].userResponse) === aboutMeQuestions.questionSet[i].answer) {
            alert(aboutMeQuestions.questionSet[i].responseSet.correct);
            aboutMeQuestions.questionSet[i].userEval = 'correct';
            userPoints++;
          } else {
            let tempMessage = aboutMeQuestions.questionSet[i].responseSet.incorrect;
            if (parseInt(aboutMeQuestions.questionSet[i].userResponse) < aboutMeQuestions.questionSet[i].answer) {
              alert(tempMessage + ' The answer is higher');
            } else if (parseInt(aboutMeQuestions.questionSet[i].userResponse) > aboutMeQuestions.questionSet[i].answer ) {
              alert(tempMessage + ' The answer is lower');
            } else {
              alert('That\' not even an integer!');
            }
            alert(`You have ${maxNumberGuessTries - userGuesses} tries left.`);
            userGuesses++;
            i--;
            continue;
          }
        } else {
          alert('You\'r outta luck. Onwards to the next question.');
          aboutMeQuestions.questionSet[i].userEval = 'incorrect';
          userGuesses = 1;
        }
      } else if (aboutMeQuestions.questionSet[i].questionType === 'list') {
        if(userGuesses < maxListGuessTries) {
          if (aboutMeQuestions.questionSet[i].answer.includes(aboutMeQuestions.questionSet[i].userResponse.toLowerCase())) {
            alert(aboutMeQuestions.questionSet[i].responseSet.correct);
            userPoints++;
          } else {
            alert(`Wrong! You have ${maxListGuessTries - userGuesses} guesses left.`);
            userGuesses++;
            i--;
          }
        } else {
          alert(aboutMeQuestions.questionSet[i].responseSet.incorrect);
        }
      }
    }
    console.log(`${userName} answered ${aboutMeQuestions.questionSet[i].userResponse} to Question "${aboutMeQuestions.questionSet[i].question}" and is ${aboutMeQuestions.questionSet[i].userEval} and has scored ${userPoints} points so far`);
  }
  alert(`Congrats ${userName}! You finished the game. You got ${userPoints} out of ${aboutMeQuestions.questionSet.length} questions correct.`);
}
