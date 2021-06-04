const readline = require('readline-sync');
const clearLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(1);
};

const CARD_SUITS = ['C', 'D', 'H', 'S'];
const SUIT_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUIT_SYMBOLS = {
  club: '♣',
  diamond: '♦',
  heart: '♥',
  spade: '♠'
};

const WINNING_SCORE = 5;
const BUST_LIMIT = 21;
const DEALER_HIT_LIMIT = 17;

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayRandomCardArt() {
  let deck = shuffleDeck(initializeDeck());

  console.log("+-----+");
  console.log(`|  ${deck[51][1]}  |`);
  console.log("|     |");
  switch (deck[51][0]) {
    case 'C':
      console.log(`|  ${SUIT_SYMBOLS.club}  |`);
      break;
    case 'D':
      console.log(`|  ${SUIT_SYMBOLS.diamond}  |`);
      break;
    case 'H':
      console.log(`|  ${SUIT_SYMBOLS.heart}  |`);
      break;
    case 'S':
      console.log(`|  ${SUIT_SYMBOLS.spade}  |`);
  }
  console.log("+-----+");
}

function displayIntroduction() {
  console.log('Welcome to Twenty-One!\n');
  displayRandomCardArt();
  console.log('\n~Introduction~');
  console.log(' * You will be playing against a computer dealer. *');
  console.log(` * Get your card total as close to ${BUST_LIMIT} as possible without going over! *`);
  console.log(` * The first to win ${WINNING_SCORE} rounds will win the game. *\n`);
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

function humanizeSuit(card) {
  let suit = card[0];

  switch (suit) {
    case 'C': return `${SUIT_SYMBOLS.club}`;
    case 'D': return `${SUIT_SYMBOLS.diamond}`;
    case 'H': return `${SUIT_SYMBOLS.heart}`;
    case 'S': return `${SUIT_SYMBOLS.spade}`;
  }

  return null;
}

function humanizeRank(card) {
  let rank = card[1];

  switch (rank) {
    case '2': return '2 of ';
    case '3': return '3 of ';
    case '4': return '4 of ';
    case '5': return '5 of ';
    case '6': return '6 of ';
    case '7': return '7 of ';
    case '8': return '8 of ';
    case '9': return '9 of ';
    case '10': return '10 of ';
    case 'J': return 'Jack of ';
    case 'Q': return 'Queen of ';
    case 'K': return 'King of ';
    case 'A': return 'Ace of ';
  }

  return null;
}

function humanizeCard(card) {

  card[0] = `${humanizeRank(card)}` +
            `${humanizeSuit(card)}`;
  card.pop();

  return card;
}

function humanizeHand(hand) {
  let newHand = JSON.parse(JSON.stringify(hand));

  return newHand.map(card => humanizeCard(card));
}

function displayCurrentHands(playerHand, dealerHand) {
  console.log('');
  console.log(" Dealer's hand: ONE HIDDEN CARD,", humanizeHand(dealerHand.slice(1, dealerHand.length)));
  console.log('');
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
  console.log('');
  console.log(" Your hand:", humanizeHand(playerHand));
  console.log('');
}

function displayFinalHands(playerHand, dealerHand) {
  console.log('');
  console.log(" Dealer's hand:", humanizeHand(dealerHand), 'Total =', determineCardTotal(dealerHand));
  console.log('');
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
  console.log('');
  console.log(" Your hand:", humanizeHand(playerHand), 'Total =', determineCardTotal(playerHand));
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
    if (cardSum > BUST_LIMIT) cardSum -= 10;
  });

  return cardSum;
}

function busted(hand) {
  return determineCardTotal(hand) > BUST_LIMIT;
}

function hitOrStay() {
  prompt('Would you like to hit or stay?');
  let answer = readline.question().toLowerCase();
  while (answer !== 'hit' && answer !== 'stay') {
    prompt("Please enter 'hit' or 'stay'.");
    answer = readline.question().toLowerCase();
  }
  return answer;
}

function playPlayerTurn(scores, deck, playerHand, dealerHand) {
  while (!busted(playerHand)) {
    displayScores(scores);
    displayCurrentHands(playerHand, dealerHand);

    if (hitOrStay() === 'stay') break;

    hitPlayer(deck, playerHand);
  }

  if (busted(playerHand)) {
    displayScores(scores);
    displayFinalHands(playerHand, dealerHand);
    console.log('You busted!');
    displayRoundWinner(playerHand, dealerHand);
    promptToContinue();
  }
}

function playDealerTurn(scores, deck, playerHand, dealerHand) {
  let hitCount = 0;

  while (!busted(dealerHand)) {
    displayScores(scores);
    displayCurrentHands(playerHand, dealerHand);

    if (determineCardTotal(dealerHand) >= DEALER_HIT_LIMIT) break;

    hitDealer(deck, dealerHand);
    hitCount += 1;
  }

  if (busted(dealerHand)) {
    displayScores(scores);
    displayFinalHands(playerHand, dealerHand);
    console.log(`The dealer busted after ${hitCount} hit(s)!`);
    displayRoundWinner(playerHand, dealerHand);
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
    prompt(`Please enter 'S' to start the game.`);
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

function promptToRestart() {
  prompt('Would you like to restart the game? Y/N');
  let answer = readline.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt(`Please enter 'Y' to play another game or 'N' to exit.`);
    answer = readline.question().toLowerCase();
  }
  return answer;
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

function displayRoundWinner(playerHand, dealerHand) {

  let winner = determineRoundWinner(playerHand, dealerHand);

  switch (winner) {
    case 'player':
      console.log('You win this round!');
      break;
    case 'dealer':
      console.log('The dealer wins this round!');
      break;
    case 'tie':
      console.log("It's a tie!");
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
  console.log(`The first to ${WINNING_SCORE} wins the game!\nYour Score: ${scores['player']} | Dealer Score: ${scores['dealer']}`);
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

  displayScores(scores);
  displayFinalHands(playerHand, dealerHand);
  displayRoundWinner(playerHand, dealerHand);
  tallyScore(scores, playerHand, dealerHand);
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

function determineGameWinner(scores) {
  if (scores.player === WINNING_SCORE) {
    return 'player';
  } else if (scores.dealer === WINNING_SCORE) {
    return 'dealer';
  }
  return null;
}

function displayGameWinner(scores) {
  clearLastLine();
  clearLastLine();

  let winner = determineGameWinner(scores);

  if (winner === 'player') {
    console.log('\nYou win the game!');
  } else {
    console.log(`\nThe ${winner} wins the game!`);
  }
  console.log(`Final Scores = You: ${scores.player} | Dealer: ${scores.dealer}\n`);
}

while (true) { // main loop
  displayIntroduction();

  let scores = initializeScores();

  promptToStart();
  playRounds(scores);
  displayGameWinner(scores);

  if (promptToRestart() !== 'y') break;
  console.clear();
}

console.log('Thank you for playing Twenty-One!');