/* ==========================================================================
                                               VARIABLES
============================================================================= */
let historyValues = [];
let sum = document.getElementById("sum");
const number = document.querySelector("#count-num");
let history = document.querySelector("#previous");
let calc = document.querySelector(".calc");
let counter = document.querySelector(".counter");
let game = document.querySelector("#GAME");
var numberValue = number.innerText;
let result = 0;
let final = 0;
/* ==========================================================================
                                               FUNCTIONS
============================================================================= */
function makeGameVisible() {
  popUPName.classList.toggle("hidden");
  counter.classList.add("hidden");
  calc.classList.add("hidden");
  game.style.display = "none";
}
function makeCalcVisible() {
  popUPName.classList.add("hidden");
  counter.classList.add("hidden");
  calc.classList.toggle("hidden");
  game.style.display = "none";
}
function makeCountVisible() {
  popUPName.classList.add("hidden");
  calc.classList.add("hidden");
  game.style.display = "none";
  counter.classList.toggle("hidden");
}
function logNumbers() {
  var firstNumber = document.getElementById("firstNum").value;
  var secondNumber = document.getElementById("secondNum").value;
  let op = document.getElementById("op").value;
  var resultBox = document.querySelector("#result");
  if (op.length > 0) {
    resultBox.value = "error";
  }
  if (op === "-") {
    let calcResult = Number(firstNumber) - Number(secondNumber);
    resultBox.value = calcResult;
  }
  if (op === "+") {
    let calcResult = Number(firstNumber) + Number(secondNumber);
    resultBox.value = calcResult;
  }
  if (op === "*") {
    let calcResult = Number(firstNumber) * Number(secondNumber);
    resultBox.value = calcResult;
  }
  if (op === "/") {
    let calcResult = Number(firstNumber) / Number(secondNumber);
    resultBox.value = calcResult;
  }
}
function increment() {
  result = result + 1;
  number.innerText = result;
}
function decrement() {
  result = result - 1;
  number.innerText = result;
}
function reset() {
  final = 0;
  historyValues = [];
  result = 0;
  number.innerText = result;
  previous.innerText = "value of entries:";
}
function save() {
  historyValues.push(result);
  if (result != 0) {
    if (result < 0) {
      result = result;
    }
    previous.innerText = `${previous.innerText} ${result}`;
    result = 0;
    number.innerText = result;
  }
}

function totalEntries() {
  sum.innerText = historyValues.reduce((partialSum, a) => partialSum + a, 0);
}
/* ==========================================================================
                            GAME FUNCTIONS&& VARIBLES
============================================================================= */
let player = {
  name: "",
  chips: 0,
};
let firstCard = 0;
let secondCard = 0;
let thirdCard = 0;
let cardsList = [firstCard, secondCard];
let sumGAME = firstCard + secondCard;
let Stats = 0;
let isAlive = false;
let bidValue = document.querySelector(".popupBettingTXT");
const heading = document.querySelector("#message-el");
const playerEl = document.querySelector("#player");
const cards = document.querySelector("#cards");
const resultGAME = document.querySelector("#sum");
const third = document.querySelector("#third");
const restart = document.querySelector("#restart");
const newCard = document.querySelector("#newcard");
const StartBtn = document.querySelector("#Start");
const popUPBetting = document.querySelector(".popupBetting");
const betValue = document.querySelector("#bettingValue");
const popUPName = document.querySelector(".popupName");
const popupBuy = document.querySelector(".popupBuy");
const buyChips = document.querySelector(".buyChips");
const ChooseCardpopup = document.querySelector(".popupChooseCard");
const chooseoneBTN = document.querySelector("#chooseone");
const choose11BTN = document.querySelector("#choose11");
function updateInfo() {
  let newName = document.querySelector("#newName").value;
  let newChipsAmount = document.querySelector("#bettingNewValue").value;
  player.chips = Number(newChipsAmount);
  player.name = newName;
  playerEl.textContent = `Welcome ${player.name} ,Your current balance is: ${player.chips}$`;
  popUPName.classList.add("hidden");
  game.style.display = "block";
  return;
}
function startgame() {
  if (player.chips <= 0) {
    popupBuy.style.display = "block";
  } else {
    isAlive = true;
    resultGAME.style.display = "none";
    cards.style.display = "none";
    popUPBetting.style.display = "flex";
    firstCard = getRandomNumber2();
    secondCard = getRandomNumber2();
    cardsList = [firstCard, secondCard];
    sumGAME = firstCard + secondCard;
    if (sumGAME === 21) {
      Stats = "You got Blackjack!";
      playerEl.textContent = `Welcome ${
        player.name
      } ,Your current balance is: ${Number(player.chips) + bidValue}$`;
      player.chips = player.chips + bidValue;
      restart.style.display = "inline";
      newCard.style.display = "none";
      StartBtn.style.display = "none";
    } else {
      restart.style.display = "none";
      newCard.style.display = "none";
      StartBtn.style.display = "none";
      StartBtn.innerText = "NEW SET OF CARDS?";
      rendergame();
    }
  }
}

function betting() {
  bidValue = document.querySelector(".popupBettingTXT").value;
  if (bidValue <= 0 || bidValue === "") {
    alert(`Please put an vaild amount of bet value`);
  } else if (Number(bidValue) > player.chips) {
    alert(`you dont have enough chips. you currently have: ${player.chips}`);
  } else {
    popUPBetting.style.display = "none";
    bidValue.innerText = `currently betting with: ${bidValue}$`;
    resultGAME.style.display = "block";
    cards.style.display = "block";
    newCard.style.display = "inline";
    StartBtn.style.display = "inline";
  }
}
function getRandomNumber2() {
  let random = Math.floor(Math.random() * 12 + 1);
  if (random > 10) {
    return 10;
  } else {
    return random;
  }
}

function rendergame() {
  let numBidValue = Number(bidValue);
  if (sumGAME < 21) {
    Stats = "do you want to draw a new card?";
  } else if (sumGAME === 21) {
    Stats = "You got Blackjack!";
    playerEl.textContent = `Welcome ${player.name} ,Your current balance is: ${
      Number(player.chips) + numBidValue
    }$`;
    player.chips = player.chips + numBidValue;
    restart.style.display = "inline";
    newCard.style.display = "none";
    StartBtn.style.display = "none";
  } else {
    Stats = `you just lost: ${bidValue}$, remaining:${
      player.chips - bidValue
    }$`;
    player.chips = player.chips - numBidValue;
    isAlive = false;
    playerEl.innerText = `Welcome ${player.name} ,Your current balance is: ${player.chips}$`;
    StartBtn.style.display = "none";
  }
  cards.textContent = `cards: `;
  for (i = 0; i < cardsList.length; i++) {
    cards.textContent += cardsList[i] + " ";
  }
  heading.textContent = Stats;
  resultGAME.textContent = `sum: ${sumGAME}`;
  if (isAlive === false) {
    restart.style.display = "inline";
    newCard.style.display = "none";
    cardsList = [];
  }
}

function newcard() {
  getRandomNumber1();
  if (thirdCard === 1) {
    setThirdCard();
    return;
  } else {
    sumGAME += thirdCard;
    cardsList.push(thirdCard);
    resultGAME.textContent = `sum =${sumGAME}`;
    rendergame();
  }
}
function getRandomNumber1() {
  let random = Math.floor(Math.random() * 13) + 1;

  if (random === 1) {
    thirdCard = random;
  }
  if (random > 10) {
    thirdCard = 10;
  } else {
    thirdCard = random;
  }
  return thirdCard;
}
function setThirdCard() {
  ChooseCardpopup.style.display = "flex";
  choose11BTN.style.display = "block";
  chooseoneBTN.style.display = "block";
  return;
}

function chooseone() {
  thirdCard = 1;
  ChooseCardpopup.style.display = "none";
  sumGAME += thirdCard;
  cardsList.push(thirdCard);
  resultGAME.textContent = `sum =${sumGAME}`;
  rendergame();
}
function choose11() {
  thirdCard = 11;
  ChooseCardpopup.style.display = "none";
  sumGAME += thirdCard;
  cardsList.push(thirdCard);
  resultGAME.textContent = `sum =${sumGAME}`;
  rendergame();
}
function buyNow() {
  let ChipsAmount = document.querySelector("#chipsAmount").value;
  player.chips += Number(ChipsAmount);
  buyChips.style.display = "none";
  playerEl.textContent = `Welcome ${player.name} ,Your current balance is: ${player.chips}$`;
  return;
}
function closeGame() {
  game.style.display = "none";
  popupBuy.style.display = "none";
}
function buyMore() {
  popupBuy.style.display = "none";
  buyChips.style.display = "flex";
}
function done() {
  popUPName.style.display = "none";
}

function Restart() {
  heading.innerText = "want to play a round?";
  sumGAME = 0;
  cards.textContent = `cards:`;
  resultGAME.textContent = `sum: ${sumGAME}`;
  StartBtn.textContent = "START GAME";
  restart.style.display = "none";
  StartBtn.style.display = "inline";
  resultGAME.style.display = "none";
  cards.style.display = "none";
}
