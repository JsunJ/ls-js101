const readline = require('readline-sync');

const CARD_SUITS = ['C', 'D', 'H', 'S'];
const SUIT_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
// const SUIT_SYMBOLS = {
//   club: '♣',
//   diamond: '♦',
//   heart: '♥',
//   spade: '♠'
// };

const WINNING_SCORE = 5;

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function initializeDeck() {
  let deck = [];

  CARD_SUITS.forEach(suit => {
    SUIT_RANKS.forEach(rank => {
      deck.push([suit, rank]);
    });
  });

  return deck;
}

function initializeScores() {
  let scores = {};

  scores['player'] = 0;
  scores['dealer'] = 0;

  return scores;
}

function initializePlayerHand() {
  let playerHand = [];
  return playerHand;
}

function initializeDealerHand() {
  let dealerHand = [];
  return dealerHand;
}

function shuffleDeck(deck) {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
  }
  return deck;
}

function dealCards(deck, playerHand, dealerHand) {
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
  playerHand.push(deck.pop());
  dealerHand.push(deck.pop());
}

function hitPlayer(deck, playerHand) {
  playerHand.push(deck.pop());
}

function hitDealer(deck, dealerHand) {
  dealerHand.push(deck.pop());
}

// function beautifyHands(playerHand, dealerHand) {
//   playerHand.forEach(card => {
//     console.log("'''''");
//     console.log("'");
//     console.log("'");
//     console.log("'");
//     console.log("'");
//   });
// }

function displayCurrentHands(playerHand, dealerHand) {
  console.log('');
  console.log(' HIDDEN,', dealerHand.slice(1, dealerHand.length));
  console.log('');
  console.log('---------------');
  console.log('');
  console.log(playerHand);
  console.log('');
}

function displayFinalHands(playerHand, dealerHand) {
  console.log('');
  console.log(dealerHand, ':', determineCardTotal(dealerHand));
  console.log('');
  console.log('---------------');
  console.log('');
  console.log(playerHand, ':', determineCardTotal(playerHand));
  console.log('');
}

function determineCardTotal(hand) {
  let cardValues = hand.map(card => card[1]);

  let cardSum = 0;
  cardValues.forEach(value => {
    if (value === 'A') {
      cardSum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      cardSum += 10;
    } else {
      cardSum += Number(value);
    }
  });

  cardValues.filter(value => value === 'A').forEach(_ => {
    if (cardSum > 21) cardSum -= 10;
  });

  return cardSum;
}

function busted(hand) {
  return determineCardTotal(hand) > 21;
}

function playPlayerTurn(scores, deck, playerHand, dealerHand) {
  while (!busted(playerHand)) {
    displayScores(scores);
    displayCurrentHands(playerHand, dealerHand);

    prompt('Would you like to hit or stay?');
    let answer = readline.question();
    if (answer === 'stay') break;

    hitPlayer(deck, playerHand);
  }

  if (busted(playerHand)) {
    displayScores(scores);
    displayFinalHands(playerHand, dealerHand);
    console.log('You busted! The dealer wins this round!');
    promptToContinue();
  } else {
    console.log('You chose to stay!');
    promptToContinue();
  }
}

function playDealerTurn(scores, deck, playerHand, dealerHand) {
  let hitCount = 0;

  while (!busted(dealerHand)) {
    displayScores(scores);
    displayCurrentHands(playerHand, dealerHand);

    if (determineCardTotal(dealerHand) >= 17) break;

    hitDealer(deck, dealerHand);
    hitCount += 1;
  }

  if (busted(dealerHand)) {
    displayScores(scores);
    displayFinalHands(playerHand, dealerHand);
    console.log(`The dealer busted after ${hitCount} hit(s). You win this round!`);
    promptToContinue();
  } else {
    console.log(`The dealer chose to stay after ${hitCount} hit(s).`);
    promptToContinue();
  }
}

function promptToStart() {
  prompt(`Enter 'S' to start.`);
  let response = readline.question().toLowerCase();
  while (response !== 's') {
    prompt(`Please enter 'S' to start the match.`);
    response = readline.question().toLowerCase();
  }
}

function promptToContinue() {
  prompt(`Enter 'C' to continue.`);
  let response = readline.question().toLowerCase();
  while (response !== 'c') {
    prompt(`Please enter 'C' to continue the game.`);
    response = readline.question().toLowerCase();
  }
}

function determineRoundWinner(playerHand, dealerHand) {
  let playerTotal = determineCardTotal(playerHand);
  let dealerTotal = determineCardTotal(dealerHand);

  if (busted(playerHand)) return 'dealer';
  if (busted(dealerHand)) return 'player';

  if (playerTotal > dealerTotal) {
    return 'player';
  } else if (playerTotal < dealerTotal) {
    return 'dealer';
  } else {
    return 'tie';
  }
}

function displayRoundWinner(scores, playerHand, dealerHand) {
  displayScores(scores);
  displayFinalHands(playerHand, dealerHand);

  let winner = determineRoundWinner(playerHand, dealerHand);

  switch (winner) {
    case 'player':
      console.log('You win this round!');
      break;
    case 'dealer':
      console.log('The dealer wins this round!');
      break;
    case 'tie':
      console.log("It's a tie");
  }
}

function tallyScore(scores, playerHand, dealerHand) {
  let winner = determineRoundWinner(playerHand, dealerHand);

  switch (winner) {
    case 'player':
      scores.player += 1;
      break;
    case 'dealer':
      scores.dealer += 1;
      break;
    default: break;
  }
}

function displayScores(scores) {
  console.clear();
  console.log(`The first to ${WINNING_SCORE} wins the match!\nYour Score: ${scores['player']} | Dealer Score: ${scores['dealer']}`);
}

function playSingleRound(scores, deck, playerHand, dealerHand) {

  shuffleDeck(deck);
  dealCards(deck, playerHand, dealerHand);

  playPlayerTurn(scores, deck, playerHand, dealerHand);
  if (busted(playerHand)) {
    tallyScore(scores, playerHand, dealerHand);
    return;
  }

  playDealerTurn(scores, deck, playerHand, dealerHand);
  if (busted(dealerHand)) {
    tallyScore(scores, playerHand, dealerHand);
    return;
  }

  tallyScore(scores, playerHand, dealerHand);
  displayRoundWinner(playerHand, dealerHand);
}

function playRounds(scores) {
  while (scores.player < WINNING_SCORE && scores.dealer < WINNING_SCORE) {
    let deck = initializeDeck();
    let playerHand = initializePlayerHand();
    let dealerHand = initializeDealerHand();

    displayScores(scores);

    playSingleRound(scores, deck, playerHand, dealerHand);
    if (busted(playerHand) || busted(dealerHand)) continue;
    promptToContinue();
  }
}

while (true) { // main loop
  // displayIntro();

  let scores = initializeScores();

  promptToStart();

  playRounds(scores);

  // prompt game winner
  // prompt final game scores

  // promptToRestart()


}