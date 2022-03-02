const highScoresCont = document.querySelector('.highscores');
const newGameBtn = document.querySelector('#new-game2');


getHighScores();

newGameBtn.addEventListener('click', ()=>{
    window.location.href ='index.html';
});

async function getHighScores(){

    const response = await fetch('/api');
    const data = await response.json();


    for(const row of data){
      const root = document.createElement('div');
      const nameDiv = document.createElement('div');
      const picksDiv = document.createElement('div')
      const dateDiv = document.createElement('div');

      nameDiv.textContent = `Name: ${row.highscoreName}`;
      picksDiv.textContent = `Number of Picks: ${row.numOfPicks}`;
      const dateString = new Date(row.timestamp).toLocaleString();
      dateDiv.textContent = `Date: ${dateString}`;
      console.log(nameDiv, picksDiv, dateDiv);

      root.append(nameDiv, picksDiv, dateDiv);

      highScoresCont.append(root);

    }
  }