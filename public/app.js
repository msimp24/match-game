
const easy = [1,1,2,2,3,3,4,4,5,5,6,6];
const medium = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10]
const hard = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,
             12,12,13,13,14,14,15,15];

var flag = 0;
var matchCounter = 0;
var gameChosen = 12;
const img_url = "card-hidden.png"
const gameContainer = document.querySelector('.game-container');
var firstChoice;
var secondChoice;

createEasyGame();

function createEasyGame(){
  var shuffledArr = shuffle(easy);

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

    for(let i=0; i<shuffledArr.length; i++){
      const cardDiv = document.createElement('div');
      const cardImg = document.createElement('img');
      cardDiv.textContent = shuffledArr[i];
      cardImg.src = img_url;
      cardImg.classList.add("med-size")
      cardDiv.append(cardImg);
      cardDiv.setAttribute("id", shuffledArr[i]);
      cardDiv.setAttribute("class", 'card-med number-font');
      gameContainer.append(cardDiv);
      console.log(cardDiv.id);
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
      var firstNum; 
      var secNum;
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

        if(isMatch(firstChoice.id, secondChoice.id)){
          matchCounter++;
          firstChoice.removeEventListener('click', makeSelection)
          secondChoice.removeEventListener('click', makeSelection)
          if(matchCounter == 6){
            alert("Game is complete")

          }
        }
        else{
          setTimeout(function(){
          hideCards(firstChoice, secondChoice)}, 1000)
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
      console.log(img1, img2);
      img1.style.visibility = "visible";
      img2.style.visibility = "visible";
    }

    function checkGameCompletion(){

    }
