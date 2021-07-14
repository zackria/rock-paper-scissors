const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
var p1Name = "Player 1"
var p2Name = "Player 2"
var bestof = 3

const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },
  {
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },
  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'
  }
]


function player1Selection(selectionvalue){
    //alert(selectionvalue);
    document.getElementById('player1Selection').value = selectionvalue;
}


function player2Selection(selectionvalue){
    //alert(selectionvalue);
    document.getElementById('player2Selection').value = selectionvalue;
}

function throwTurn(){
    //alert('throw turn');
    const p1Selection = document.getElementById('player1Selection').value;

    const p2Selection = document.getElementById('player2Selection').value;

    if(p1Selection.length===0||p2Selection.length===0){
      alert("Please make a selection");
    }else{

      const selection1 = SELECTIONS.find(selection => selection.name === p1Selection);



      const selection2 = SELECTIONS.find(selection => selection.name === p2Selection);

      makeSelection(selection1, selection2);

    }


}

function updateBestof(){
  var x = document.getElementById("bestof").value;
  bestof = parseInt(x);
}

function reset(){
    document.getElementById('player1Selection').value = '';
    document.getElementById('player2Selection').value = '';
    yourScoreSpan.innerText = 0;
    computerScoreSpan.innerText = 0;
    const resultsColumn = document.getElementsByClassName('result-selection');
    for (var i = resultsColumn.length - 1; i >= 0; --i) {
      resultsColumn[i].remove();
    }
}

function closeModal(){
    document.getElementById("myModal").style.display = "none";
}

function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

function makeSelection(selection, selection1) {
  //const computerSelection = randomSelection()
  const yourWinner = isWinner(selection, selection1)
  const computerWinner = isWinner(selection1, selection)

  addSelectionResult(selection1, computerWinner)
  addSelectionResult(selection, yourWinner)

  if (yourWinner) incrementScore(yourScoreSpan)
  if (computerWinner) incrementScore(computerScoreSpan)

  var p1Score =  parseInt(yourScoreSpan.innerText);
  var p2Score =  parseInt(computerScoreSpan.innerText);

  if(p1Score===bestof){
     document.getElementById("myModal").style.display = "block";
     document.getElementById("winnerplace").innerText = p1Name +" Won the Game!";
  }else if (p2Score===bestof){
     document.getElementById("myModal").style.display = "block";
     document.getElementById("winnerplace").innerText = p2Name + " Won the Game!";
  }
}

function addSelectionResult(selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}

function incrementScore(scoreSpan) {
  const value = parseInt(scoreSpan.innerText) + 1
  scoreSpan.innerText = value
}

    var modal = document.getElementById("myModal");
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }

    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log (urlParams.has('p1Name'));
    console.log (urlParams.has('p2Name'));

    if(urlParams.has('p1Name')){
      p1Name = urlParams.get('p1Name');
      console.log(p1Name);
      document.getElementById('p1name').innerText = p1Name;
    }

    if(urlParams.has('p2Name')){
      p2Name = urlParams.get('p2Name');
      console.log(p2Name);
      document.getElementById('p2name').innerText = p2Name;
    }
