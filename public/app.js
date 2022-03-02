
const easy = [1,1,2,2,3,3,4,4,5,5,6,6];
const medium = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10]
const hard = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,
             12,12,13,13,14,14,15,15];

const headers = ["Name", "Number of Picks", 'Date', 'ID'];

var flag = 0;
var matchCounter = 0;
var numOfPicks = 0;
var gameEnder;
var highscoreName;

const img_url = "card-hidden.png"
const gameContainer = document.querySelector('.game-container');
const optionsContainer = document.querySelector(".options-container")
var pickHeader = document.querySelector("#picks");
const highScoresCont = document.querySelector(".highscore-container");

const easyButton = document.querySelector("#option1");
const medButton = document.querySelector("#option2");
const hardButton = document.querySelector("#option3");

const submitBtn = document.querySelector("#submit");
const newGameBtn = document.querySelector("#new-game");
const nameTextField = document.querySelector("#highscore-name");



var firstChoice;
var secondChoice;

easyButton.addEventListener('click', () =>{
  gameContainer.innerHTML = "";

  optionsContainer.style.visibility = 'hidden'
  createEasyGame();
});
medButton.addEventListener('click', () =>{
  gameContainer.innerHTML = "";

  optionsContainer.style.visibility = 'hidden'
  createMediumGame();
});
hardButton.addEventListener('click', () =>{
  gameContainer.innerHTML = "";
  optionsContainer.style.visibility = 'hidden'
  createHardGame();
});

newGameBtn.addEventListener('click', ()=>{
    location.reload();
});

submitBtn.addEventListener('click', async()=>{
      postHighScore();
      window.location.href ='highscore.html';
})



function createEasyGame(){
  var shuffledArr = shuffle(easy);
  matchCounter =0;
  gameEnder = 6;
    for(let i=0; i<shuffledArr.length; i++){
      const cardDiv = document.createElement('div');
      const cardImg = document.createElement('img');
      cardDiv.textContent = shuffledArr[i];
      cardDiv.setAttribute("id", shuffledArr[i]);
      cardDiv.addEventListener('click', makeSelection);
      cardDiv.setAttribute("class", 'card-easy number-font');
      cardImg.src = img_url;
      cardImg.classList.add("easy-size")
      cardDiv.append(cardImg);
      gameContainer.append(cardDiv);
    }

}
function createMediumGame(){
  var shuffledArr = shuffle(medium);
  matchCounter = 0;
  gameEnder = 10;

    for(let i=0; i<shuffledArr.length; i++){
      const cardDiv = document.createElement('div');
      const cardImg = document.createElement('img');
      cardDiv.textContent = shuffledArr[i];
      cardDiv.setAttribute("id", shuffledArr[i]);
      cardDiv.addEventListener('click', makeSelection);
      cardDiv.setAttribute("class", 'card-med number-font');
      cardImg.src = img_url;
      cardImg.classList.add("med-size")
      cardDiv.append(cardImg);
      gameContainer.append(cardDiv);
    }
   

}
function createHardGame(){
  var shuffledArr = shuffle(hard);
  matchCounter = 0;
  gameEnder = 15;

    for(let i=0; i<shuffledArr.length; i++){
      const cardDiv = document.createElement('div');
      const cardImg = document.createElement('img');
      cardDiv.textContent = shuffledArr[i];
      cardDiv.setAttribute("id", shuffledArr[i]);
      cardDiv.addEventListener('click', makeSelection);
      cardDiv.setAttribute("class", 'card-hard number-font');
      cardImg.src = img_url;
      cardImg.classList.add("hard-size")
      cardDiv.append(cardImg);
      gameContainer.append(cardDiv);
    }
   

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
              
     // While there remain elements to shuffle...
     while (currentIndex != 0) {
              
     // Pick a remaining element...
     randomIndex = Math.floor(Math.random() * currentIndex);
     currentIndex--;
              
     // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    }
              
    return array;
    }

    function makeSelection(){
      var firstImg;
      var secondImg;
      if(flag == 0){
        firstChoice = this;
        firstNum = firstChoice.id
        firstImg = firstChoice.querySelector('img');
        firstImg.style.visibility = "hidden";
        flag = 1;
      }
      else{
        secondChoice = this;
        secNum = secondChoice.id;
        secondImg = secondChoice.querySelector('img');
        secondImg.style.visibility = "hidden";
        flag = 0;
        numOfPicks++;


        if(isMatch(firstChoice.id, secondChoice.id)){

          matchCounter++;
          console.log(matchCounter);
          firstChoice.removeEventListener('click', makeSelection)
          secondChoice.removeEventListener('click', makeSelection)

          if(gameEnder == matchCounter){
            pickHeader.innerHTML = "You won in " + numOfPicks + " tries!";
            gameContainer.append(highScoresCont);

          }
        }
        else{
          setTimeout(function(){
          hideCards(firstChoice, secondChoice)}, 500)
        }
        

      }

    }
    
    function isMatch(val1, val2){
      if(val1 == val2){
        return true;
      }
      else{
        return false;
      }
    }
    function hideCards(card1, card2){
      var img1 = card1.querySelector('img');
      var img2 = card2.querySelector('img');
      img1.style.visibility = "visible";
      img2.style.visibility = "visible";
    }

    async function postHighScore(){
      highscoreName = nameTextField.value;
      const data = {highscoreName, numOfPicks};
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/api', options);
      const json = await response.json();
    
    }

    