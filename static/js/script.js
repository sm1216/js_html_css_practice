//Challenge 1: Your Age in Days

function ageInDays() {
  var date = new Date();
  var currentYear = date.getFullYear();
  // console.log(currentYear);
  var birthYear = prompt("What year were you born in?");
  var ageInDaysCalculation = (currentYear - birthYear) * 365;
  var h1 = document.createElement("h1");
  var textAnswer = document.createTextNode(
    "You are " + ageInDaysCalculation + " days old. "
  );
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function resetAgeInDays() {
  document.getElementById("ageInDays").remove();
}

// Challenge 2: Cat Generator
function generateCat() {
  var image = document.createElement("img");
  var div = document.getElementById("flex-cat-gen");
  image.src =
    "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
  image.alt = "cat.gif";
  image.width = "200";
  image.height = "200";
  div.appendChild(image);
}

function resetCatGenerator() {
  document.getElementById("flex-cat-gen").innerHTML = "";
}

// Challenge 3: Rock Paper Scissors
function rpsGame(yourChoice) {
  console.log(yourChoice);

  var playerChoice, botChoice;
  playerChoice = yourChoice.id;

  botChoice = numberToChoice(randomTopRpsInt());
  console.log("Computer choice: ", botChoice);

  results = decideWinner(playerChoice, botChoice);
  console.log(results);

  message = finalMessage(results);
  console.log(message);

  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randomTopRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  var rpsDatabase = {
    rock: {
      scissors: 1,
      rock: 0.5,
      paper: 0
    },
    paper: {
      rock: 1,
      paper: 0.5,
      scissors: 0
    },
    scissors: {
      paper: 1,
      scissors: 0.5,
      rock: 0
    }
  };

  var yourScore = rpsDatabase[yourChoice][computerChoice];

  var computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You lost!", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "Tied!", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(playerImageChoice, botImageChoice, finalMessage) {
  var imagesDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src
  };

  // remove all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  var playerDiv = document.createElement("div");
  var botDiv = document.createElement("div");
  var messageDiv = document.createElement("div");

  playerDiv.innerHTML =
    "<img src='" +
    imagesDatabase[playerImageChoice] +
    "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)' alt='playerImageChoice'>";
  messageDiv.innerHTML =
    "<h1 style='color: " +
    finalMessage["color"] +
    "; font-size: 60px; padding: 30px; '>" +
    finalMessage["message"] +
    "</h1>";
  botDiv.innerHTML =
    "<img src='" +
    imagesDatabase[botImageChoice] +
    "' height='150' width='150' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)' alt='botImageChoice'>";

  document.getElementById("flex-box-rps-div").appendChild(playerDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

// Challenge 4: Change the Color of All Buttons
var all_buttons = document.getElementsByTagName("button");

var copyAllButons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButons);

function buttonColorChange(buttonChanger) {
  if (buttonChanger.value === "red") {
    buttonRed();
  } else if (buttonChanger.value === "green") {
    buttonGreen();
  } else if (buttonChanger.value === "reset") {
    buttonColorReset();
  } else if (buttonChanger.value === "random") {
    randomColors();
  }
}

function buttonRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButons[i]);
  }
}

function randomColors() {
  let colorChoices = [
    "btn-primary",
    "btn-success",
    "btn-warning",
    "btn-danger"
  ];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomColorNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(colorChoices[randomColorNumber]);
  }
}

// Challenge 5: Blackjack
let blackjackGame = {
  player: {
    scoreSpan: "#player-blackjack-result",
    div: "#player-box",
    score: 0
  },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0
  },
  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsMaps: {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    K: 10,
    Q: 10,
    J: 10,
    A: [1, 11]
  },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnOver: false
};

const PLAYER = blackjackGame["player"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("static/sounds/swish.m4a");

const winSound = new Audio("static/sounds/cash.mp3");

const loseSound = new Audio("static/sounds/aww.mp3");

document
  .querySelector("#blackjack-hit-button")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-stand-button")
  .addEventListener("click", dealerLogic);

document
  .querySelector("#blackjack-deal-button")
  .addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame["isStand"] === false) {
    let card = randomCard();
    // console.log(card);
    showCard(card, PLAYER);
    updateScore(card, PLAYER);
    showScore(PLAYER);
    // console.log(PLAYER["score"]);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
}

function blackjackDeal() {
  if (blackjackGame["turnOver"] === true) {
    // let winner = computeWinner();
    // showResult(winner);

    // showResult(computeWinner());
    // computeWinner();

    blackjackGame["isStand"] = false;

    let playerImages = document
      .querySelector("#player-box")
      .querySelectorAll("img");

    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    for (i = 0; i < playerImages.length; i++) {
      playerImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    PLAYER["score"] = 0;
    DEALER["score"] = 0;

    document.querySelector("#player-blackjack-result").textContent = 0;
    document.querySelector("#dealer-blackjack-result").textContent = 0;

    document.querySelector("#player-blackjack-result").style.color = "white";
    document.querySelector("#dealer-blackjack-result").style.color = "white";

    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["turnOver"] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    // If adding 11 keeps me below 21, add 11. Else, add 1
    if (activePlayer["score"] + blackjackGame["cardsMaps"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMaps"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMaps"][card][0];
    }
  } else {
    activePlayer["score"] += blackjackGame["cardsMaps"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";

    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
  blackjackGame["isStand"] = true;

  while (DEALER["score"] < 16 && blackjackGame["isStand"] === true) {
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    await sleep(850);
  }

  blackjackGame["turnOver"] = true;
  let winner = computeWinner();
  showResult(winner);

  // if (DEALER["score"] > 15) {
  //   blackjackGame["turnOver"] = true;
  //   let winner = computeWinner();
  //   showResult(winner);
  //   console.log(blackjackGame["turnOver"]);
  // }
}

// calcuted the winner and return who just won
// updates the wins, losses and draws
function computeWinner() {
  let winner;

  if (PLAYER["score"] <= 21) {
    // Condition: Higher score than dealer or when dealer busts but yoy have 21 or under
    if (PLAYER["score"] > DEALER["score"] || DEALER["score"] > 21) {
      // console.log("You won!");
      blackjackGame["wins"]++;
      winner = PLAYER;
    } else if (PLAYER["score"] < DEALER["score"]) {
      // console.log("You lost!");
      blackjackGame["losses"]++;
      winner = DEALER;
    } else if (PLAYER["score"] === DEALER["score"]) {
      // console.log("Draw!");
      blackjackGame["draws"]++;
    }

    // Condition: When user busts but dealer doesn't
  } else if (PLAYER["score"] > 21 && DEALER["score"] <= 21) {
    // console.log("You lost!");
    blackjackGame["losses"]++;
    winner = DEALER;
    // Condition: When you and the dealer busts
  } else if (PLAYER["score"] > 21 && DEALER["score"] > 21) {
    // console.log("Draw!");
    blackjackGame["draws"]++;
  }
  // console.log("winner is ", winner);
  return winner;
}

function showResult(winner) {
  let message, messageColor;

  if (blackjackGame["turnOver"] === true) {
    if (winner === PLAYER) {
      document.querySelector("#wins").textContent = blackjackGame["wins"];
      message = "You won!";
      messageColor = "green";
      winSound.play();
    } else if (winner === DEALER) {
      document.querySelector("#losses").textContent = blackjackGame["losses"];
      message = "You lost!";
      messageColor = "red";
      loseSound.play();
    } else {
      document.querySelector("#draws").textContent = blackjackGame["draws"];
      message = "Draw!";
      messageColor = "black";
    }

    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
