//alert("hey hello");
function ageInDays(){
   var birthYear =prompt("enter your birth year");
   var ageInDaysss= (2020 - birthYear) * 365;
   var h1= document.createElement('h1');
   var textAnswer = document.createTextNode("you are" + ageInDaysss + "days old");
   h1.setAttribute('id' ,'ageInDays');
   h1.appendChild(textAnswer);
   document.getElementById("flex-box-result").appendChild(h1);

}
function reset() {
    document.getElementById('ageInDays').remove();
}

function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  div.appendChild(image);
} 

function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  
  botChoice = numberToChoice(randToRpsInt());
  console.log('computer choice: ', botChoice);
  
  results = decideWinner(humanChoice, botChoice);
  console.log(results);
  
  message = finalMessage(results);
  console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message);

}
function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}
function numberToChoice(numbers) {
  return['rock','paper','scissors'][numbers];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    'rock': {'scissors':1,'rock': 0.5, 'paper': 0 },
    'paper': {'rock':1, 'paper':0.5, 'scissors': 0 },
    'scissors': {'paper':1,'scissors':0.5,'rock': 0 }

  };
  var yourScore =rpsDatabase[yourChoice][computerChoice];
  var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return{'message': 'You Lost!', 'color': 'red'};
  } else if (yourScore === 0.5) {
    return{'message': 'You Tired', 'color': 'yellow'};
  } else  {
    return{'message': 'You Won', 'color': 'green'};
  }
}

function rpsFrontEnd(humanImageChoice,botImageChoice, finalMessage) {
  var imagesDatabase = {
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src,
  }
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();


  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var messageDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height=150 width=150 style='box-shadow:10px 20px 50px rgba(37,50,120,1);'>"
  messageDiv.innerHTML= "<h1 style='color: " + finalMessage['color'] + ";font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
  botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height=150 width=150 style='box-shadow:10px 20px 50px rgba(256,50,33,1);'>"
 
  

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);
  
}
//pick color function

var all_buttons = document.getElementsByTagName('button');

var copyAllButtons =[];
for(let i=0; i <all_buttons.length;i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy) {
  if(buttonThingy.value === 'red') {
    buttonsRed();
  } else if (buttonThingy.value === 'green') {
    buttonsGreen();
  } else if(buttonThingy.value === 'reset') {
    buttonColorReset();
  } else if (buttonThingy.value === 'random'){
    randomColors();
  }
  
}
function buttonsRed() {
  for(i=0; i<all_buttons.length;i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');
  }
}

function buttonsGreen() {
  for(i=0; i<all_buttons.length;i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');
  }
}

function buttonColorReset() {
  for(i=0; i<all_buttons.length;i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  for(i=0; i<all_buttons.length;i++) {
    
  }
}

function randomColors() {
  var choices = ['btn-primary', 'btn-danger', 'btn-success','btn-warning'];

  for (i=0; i < all_buttons.length; i++) {
    var randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}
//blackjack task
let blackjackGame = {
  'you': {'scoreSpan': '#your-blackjack-result', 'div':'#your-box','score':0},
  'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div':'#dealer-box','score':0},
  'cards': ['2', '3', '4' ,'5' ,'6' ,'7' ,'8' ,'9' ,'10' ,'K' ,'Q' ,'J', 'A'],
  'cardsMap':{'2': 2, '3':3, '4': 4 ,'5': 5 ,'6': 6 ,'7':7 ,'8':8,'9':9 ,'10':10 ,'K':10 ,'Q':10 ,'J':10, 'A':[1, 11]},
  'wins': 0,
  'losses':0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,

};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('js/sounds/sounds/swish.m4a');

const winSound = new Audio('js/sounds/sounds/cash.mp3');

const lossSound = new Audio('js/sounds/sounds/aww.mp3');

document.querySelector("#blackjack-hit-button").addEventListener('click',blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener('click',dealerLogic);

document.querySelector("#blackjack-deal-button").addEventListener('click', blackjackDeal);


function blackjackHit() {
  if(blackjackGame['isStand'] === false) {
    let card = randomCard();
    //console.log(card);
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    //console.log(YOU['score']);

  }
  
}


function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame['cards'][randomIndex];
}



function showCard(card, activePlayer) {
  if(activePlayer['score'] <= 21) {
    let cardImage = document.createElement('img');
    cardImage.src = `css/images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound. play();
  }

}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;
    let yourImages= document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages= document.querySelector('#dealer-box').querySelectorAll('img');

    for (i=0; i< yourImages.length;i++) {
      yourImages[i].remove();
    }

    for (i=0; i< dealerImages.length; i++) {
      dealerImages[i].remove();
    }
    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector("#blacjack-result").textContext = "play the game";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    } else {
      activePlayer['score'] +=  blackjackGame['cardsMap'][card][0];
    }

  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
  }
 
}

function showScore(activePlayer) {
  if(activePlayer['score'] > 21 ){
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

  } else {
  document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame['isStand'] = true;

  while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(1000);
  }


  blackjackGame['turnsOver'] = true;
  let winner = computeWinner();
  showResult(winner);
    //console.log(blackjackGame['turnsOver']);
}
  


function computeWinner() {
  let winner;

  if(YOU['score'] <= 21) {
    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      winnner = YOU;

    } else if (YOU['score'] < DEALER['score']) {
      blackjackGame['losses']++;
      winner = DEALER;

    } else if (YOU['score'] === DEALER['score']) {
      blackjackGame['draws']++;

    }
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;
    winner = DEALER;

  } else if (YOU['score'] > 21 &&  DEALER['score'] > 21) {
    blackjackGame['draws']++;
  }

  console.log(blackjackGame);
  return winner;

}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame['turnsOver'] === true) {

    if  (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = 'you Lost!';
      messageColor ='red';
      lossSound. play();

    } else if (winner === YOU) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = 'You won!';
      messageColor ='green';
      winSound. play();

    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = 'Draw The Game';
      messageColor = 'black';
    }
  
  
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }    
}

// Challenge 6: AJAX & API's with Javascript
const url = 'https://randomuser.me/api/?results=10'; // Get 10 random users
fetch(url)
  .then(resp => resp.json())
  .then(data => {
    let authors = data.results;
    console.log(authors);
    for (i=0; i<authors.length; i++) {
      let div = document.createElement('div');
      let image = document.createElement('img');
      let p = document.createElement('p');
      p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`));
      image.src = authors[i].picture.large;
      div.appendChild(image);
      div.appendChild(p);
      document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);
    }
  });
  
let title = str => str[0].toUpperCase() + str.slice(1);

function mustafa() {
  return '5'
}
mustafa()
 
function resp() {
  return resp.json();
}

var mustafa = number => 5 + number;
mustafa()



// sound.seek(7);


// challenge 7: wikipedia



  
