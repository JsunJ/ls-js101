const readline = require('readline-sync');

const CARD_SUITS = ['C', 'D', 'H', 'S'];
const SUIT_RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function initializeDeck() {
  let deck = [];
  
  CARD_SUITS.forEach(suit => {
    SUIT_RANKS.forEach(rank => {
      deck.push([suit, rank]);
    })
  })

  return deck;
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

function beautifyHands(playerHand, dealerHand) {
  playerHand.forEach(card => {
    console.log("'''''");
    console.log("'");
    console.log("'");
    console.log("'");
    console.log("'");
  })
}

function displayHands(playerHand, dealerHand) {
  console.log('');
  console.log(dealerHand);
  console.log('');
  console.log('---------------');
  console.log('');
  console.log(playerHand);
  console.log('');
}

function busted(hand) {
  return;
}

function playPlayerTurn(deck, playerHand) {
  while (true) {
    prompt('Would you like to hit or stay?');
    let answer = readline.question();
    if (answer === 'stay' || busted(playerHand)) break;

    hitPlayer(deck, playerHand);
  }

  if (busted(playerHand)) {

  }
}



function testRound() {
  let deck = initializeDeck();
  let playerHand = initializePlayerHand();
  let dealerHand = initializeDealerHand();

  shuffleDeck(deck);

  displayHands(playerHand, dealerHand);

  dealCards(deck, playerHand, dealerHand);

  displayHands(playerHand, dealerHand);

  playPlayerTurn(deck, playerHand);

  displayHands(playerHand, dealerHand);
}

testRound();