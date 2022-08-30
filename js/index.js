/* ==========================================================================
                                               VARIABLES
============================================================================= */
let historyValues = [];
let sum = document.getElementById("sumCount");
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
  popUPBetting.style.display = "none";
  popupBuy.style.display = "none";
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
    if (calcResult === NaN) {
      resultBox.value = error;
    }
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
let dealerCard1 = 0;
let dealerCard2 = 0;
let dealerCard3 = 0;
let sumDealerCards = dealerCard1 + dealerCard2;
let cardsList = [firstCard, secondCard];
let DealercardsList = [dealerCard1, dealerCard2, dealerCard3];
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
const holdBtn = document.querySelector("#Hold");
const StartBtn = document.querySelector("#Start");
const popUPBetting = document.querySelector(".popupBetting");
const betValue = document.querySelector("#bettingValue");
const popUPName = document.querySelector(".popupName");
const popupBuy = document.querySelector(".popupBuy");
const buyChips = document.querySelector(".buyChips");
const ChooseCardpopup = document.querySelector(".popupChooseCard");
const chooseoneBTN = document.querySelector("#chooseone");
const choose11BTN = document.querySelector("#choose11");
const Dealercards = document.querySelector("#DealerCards");
function updateInfo() {
  let newName = document.querySelector("#newName").value;
  let newChipsAmount = document.querySelector("#bettingNewValue").value;
  player.chips = Number(newChipsAmount);
  player.name = newName;
  playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span> ,Your current balance is: <span class="highLightBlack">${player.chips}$</span>`;
  popUPName.classList.add("hidden");
  game.style.display = "block";
  holdBtn.style.display = "none";
  Restart();
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
    holdBtn.style.display = "none";
    firstCard = getRandomNumber2();
    secondCard = getRandomNumber2();
    dealerCard1 = getRandomNumber2();
    dealerCard2 = getRandomNumber2();
    dealerCard3 = getRandomNumber2();
    cardsList = [firstCard, secondCard];
    sumGAME = firstCard + secondCard;
    sumDealerCards = dealerCard1 + dealerCard2 + dealerCard3;
    DealercardsList = [dealerCard1, dealerCard2, dealerCard3];
    if (sumGAME === 21) {
      Stats = "You got Blackjack!";
      playerEl.innerHTML = `Welcome <span class="highLightBlack">${
        player.name
      }</span> ,Your current balance is: <span class="highLightBlack">${
        Number(player.chips) + bidValue
      }$</span>`;
      player.chips = player.chips + bidValue;
      restart.style.display = "inline";
      newCard.style.display = "none";
      holdBtn.style.display = "none";
      StartBtn.style.display = "none";
    } else {
      restart.style.display = "none";
      newCard.style.display = "none";
      StartBtn.style.display = "none";
      StartBtn.innerText = "RESHUFFLE?";
      holdBtn.style.display = "none";
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
  } else if (bidValue < 10) {
    alert(`betting cant be less than 10`);
  } else {
    popUPBetting.style.display = "none";
    bidValue.innerText = `currently betting with: ${bidValue}$`;
    resultGAME.style.display = "block";
    cards.style.display = "block";
    newCard.style.display = "inline";
    StartBtn.style.display = "inline";
    holdBtn.style.display = "inline";
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
    playerEl.innerHTML = `Welcome <span class="highLightBlack">${
      player.name
    }</span> ,Your current balance is: <span class="highLightBlack">${
      Number(player.chips) + numBidValue
    }$</span>`;
    player.chips = player.chips + numBidValue;
    restart.style.display = "inline";
    newCard.style.display = "none";
    holdBtn.style.display = "none";
    StartBtn.style.display = "none";
  } else {
    Stats = `you just lost:<span class="highLightRed"> ${bidValue}$</span> , remaining:<span class="highLightRed">${
      player.chips - bidValue
    }$</span> `;
    player.chips = player.chips - numBidValue;
    isAlive = false;
    playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span> ,Your current balance is: <span class="highLightBlack">${player.chips}$</span>`;
    StartBtn.style.display = "none";
  }
  cards.textContent = ``;
  for (i = 0; i < cardsList.length; i++) {
    cardsList[i] === 1
      ? (cards.innerHTML += `<img src="css/images/card1.png"class="cardResizer" />`)
      : console.log("not 1");
    cardsList[i] === 2
      ? (cards.innerHTML += `<img src="css/images/card2.png"class="cardResizer" />`)
      : console.log("not 2");
    cardsList[i] === 3
      ? (cards.innerHTML += `<img src="css/images/card3.png"class="cardResizer" />`)
      : console.log("not 3");
    cardsList[i] === 4
      ? (cards.innerHTML += `<img src="css/images/card4.png"class="cardResizer" />`)
      : console.log("not 4");
    cardsList[i] === 5
      ? (cards.innerHTML += `<img src="css/images/card5.png"class="cardResizer" />`)
      : console.log("not 5");
    cardsList[i] === 6
      ? (cards.innerHTML += `<img src="css/images/card6.png"class="cardResizer" />`)
      : console.log("not 6");
    cardsList[i] === 7
      ? (cards.innerHTML += `<img src="css/images/card7.png"class="cardResizer" />`)
      : console.log("not 7");
    cardsList[i] === 8
      ? (cards.innerHTML += `<img src="css/images/card8.png"class="cardResizer" />`)
      : console.log("not 8");
    cardsList[i] === 9
      ? (cards.innerHTML += `<img src="css/images/card9.png"class="cardResizer" />`)
      : console.log("not 9");
    cardsList[i] === 10
      ? (cards.innerHTML += `<img src="css/images/card10.png"class="cardResizer" />`)
      : console.log("not 10");
    cardsList[i] === 11
      ? (cards.innerHTML += `<img src="css/images/card11.png"class="cardResizer" />`)
      : console.log("not 11");
    cardsList[i] === 12
      ? (cards.innerHTML += `<img src="css/images/card12.png"class="cardResizer" />`)
      : console.log("not 12");
    cardsList[i] === 13
      ? (cards.innerHTML += `<img src="css/images/card13.png"class="cardResizer" />`)
      : console.log("not 13");
  }
  heading.innerHTML = Stats;
  resultGAME.textContent = `sum: ${sumGAME}`;
  if (isAlive === false) {
    restart.style.display = "inline";
    newCard.style.display = "none";
    holdBtn.style.display = "none";
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
    holdBtn.style.display = "inline";
    rendergame();
  }
}
function DealercardsIMG() {
  for (i = 0; i < DealercardsList.length; i++) {
    DealercardsList[i] === 1
      ? (Dealercards.innerHTML += `<img src="css/images/card1.png"class="cardResizer" />`)
      : console.log("not 1");
    DealercardsList[i] === 2
      ? (Dealercards.innerHTML += `<img src="css/images/card2.png"class="cardResizer" />`)
      : console.log("not 2");
    DealercardsList[i] === 3
      ? (Dealercards.innerHTML += `<img src="css/images/card3.png"class="cardResizer" />`)
      : console.log("not 3");
    DealercardsList[i] === 4
      ? (Dealercards.innerHTML += `<img src="css/images/card4.png"class="cardResizer" />`)
      : console.log("not 4");
    DealercardsList[i] === 5
      ? (Dealercards.innerHTML += `<img src="css/images/card5.png"class="cardResizer" />`)
      : console.log("not 5");
    DealercardsList[i] === 6
      ? (Dealercards.innerHTML += `<img src="css/images/card6.png"class="cardResizer" />`)
      : console.log("not 6");
    DealercardsList[i] === 7
      ? (Dealercards.innerHTML += `<img src="css/images/card7.png"class="cardResizer" />`)
      : console.log("not 7");
    DealercardsList[i] === 8
      ? (Dealercards.innerHTML += `<img src="css/images/card8.png"class="cardResizer" />`)
      : console.log("not 8");
    DealercardsList[i] === 9
      ? (Dealercards.innerHTML += `<img src="css/images/card9.png"class="cardResizer" />`)
      : console.log("not 9");
    DealercardsList[i] === 10
      ? (Dealercards.innerHTML += `<img src="css/images/card10.png"class="cardResizer" />`)
      : console.log("not 10");
    DealercardsList[i] === 11
      ? (Dealercards.innerHTML += `<img src="css/images/card11.png"class="cardResizer" />`)
      : console.log("not 11");
    DealercardsList[i] === 12
      ? (Dealercards.innerHTML += `<img src="css/images/card12.png"class="cardResizer" />`)
      : console.log("not 12");
    DealercardsList[i] === 13
      ? (Dealercards.innerHTML += `<img src="css/images/card13.png"class="cardResizer" />`)
      : console.log("not 13");
  }
}
function endGame() {
  let numBidValue = Number(bidValue);
  restart.style.display = "inline";
  StartBtn.style.display = "none";
  newCard.style.display = "none";
  Dealercards.style.display = "inline";
  holdBtn.style.display = "none";
  Dealercards.textContent = ``;
  DealercardsIMG();
  isAlive = false;
  if (sumDealerCards > 21) {
    Stats = `you got ${sumGAME} the dealer has ${sumDealerCards}, you won!`;
    player.chips = player.chips + numBidValue;
    playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span> ,Your current balance is: <span class="highLightBlack">${player.chips}$</span>`;
  } else {
    if (sumGAME === 18 && sumGAME > sumDealerCards) {
      Stats = `you got ${sumGAME} the dealer has ${sumDealerCards} you got back 20% of your betting!`;
      player.chips = player.chips + 0.2 * numBidValue;
      playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span> ,Your current balance is: <span class="highLightBlack">${player.chips}$</span>`;
    } else if (sumGAME === 20 && sumGAME > sumDealerCards) {
      Stats = `you got ${sumGAME} the dealer has ${sumDealerCards} you got back 70% of your betting!`;
      player.chips = player.chips + 0.7 * numBidValue;
      playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span> ,Your current balance is: <span class="highLightBlack">${player.chips}$</span>`;
    } else if (sumGAME === 19 && sumGAME > sumDealerCards) {
      Stats = `you got ${sumGAME} the dealer has ${sumDealerCards} you got back 50% of your betting!`;
      player.chips = player.chips + 0.5 * numBidValue;
      playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span>  ,Your current balance is: <span class="highLightBlack">${player.chips}$</span> `;
    } else {
      Stats = `you got ${sumGAME} the dealer has ${sumDealerCards} you just lost!`;
      player.chips = player.chips - numBidValue;
      playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span>  ,Your current balance is: <span class="highLightBlack">${player.chips}$</span> `;
    }
  }
  heading.textContent = Stats;
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
  ChipsAmount <= 0
    ? alert("please put a vaild number")
    : (player.chips += Number(ChipsAmount));
  buyChips.style.display = "none";
  playerEl.innerHTML = `Welcome <span class="highLightBlack">${player.name}</span> ,Your current balance is: <span class="highLightBlack">${player.chips}$</span>`;
  Restart();
  return;
}
function closeGame() {
  game.style.display = "none";
  popupBuy.style.display = "none";
}
function buyMore() {
  popUPBetting.style.display = "none";
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
  Dealercards.style.display = "none";
}
