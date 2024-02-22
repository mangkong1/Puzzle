var startPuzzle = document.getElementById("StartPuzzle");
var solvePuzzle = document.getElementById("SolvePuzzle");
var puzzlePiece;
var puzzlePieceImg;
var movePiece;
var movePieceParent;
var startGameRepeat = false;
var timerId;
var time = -1; //time++가 즉시 적용되어 -1로 설정

// 이벤트 함수에는 event매개변수 넣기, 일반함수는 onclick같은 연동이 없음
function startGame() {
  var startBtn = document.getElementById("StartGameBtn");

  if (startGameRepeat) {
    return;
  }
  startGameRepeat = true;

  // 단순 숫자가 아니라 메서드로 적용시키기
  for (var i = 0; i < 18; i++) {
    var puzzlePiece = document.createElement("div");
    var puzzlePieceImg = document.createElement("div");

    puzzlePieceImg.draggable = true;
    puzzlePieceImg.className = "pieceImg puzzlePieceImg" + i;
    puzzlePieceImg.textContent = i;
    puzzlePieceImg.setAttribute("ondragstart", "getBackgroundEvent(event)");
    puzzlePieceImg.setAttribute("ondragover", "onHoverEvent(event)");
    puzzlePieceImg.setAttribute("ondrop", "setBackgroundEvent(event)");
    puzzlePiece.appendChild(puzzlePieceImg);

    // 단순 숫자가 아니라 메서드로 적용시키기
    if (i < 9) {
      puzzlePieceImg.style.backgroundImage = `url('./images/img${i + 1}.jpeg')`;
      startPuzzle.appendChild(puzzlePiece);
    } else {
      solvePuzzle.appendChild(puzzlePiece);
    }
  }

  startBtn.style.display = "none";

  shufflePuzzle();
  startTimer();

  console.log("게임시작");
}

// shufflePuzzle, fisher-Yates이론 사용, i의 크기가 작아 가능한 숫자가 적다는 약점
function shufflePuzzle() {
  var startPuzzlePiece = startPuzzle.children;

  for (var i = startPuzzlePiece.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    // i와 j가 같다면 건너뜀
    startPuzzle.insertBefore(startPuzzlePiece[j], startPuzzlePiece[i]);
    // appendChild와 비슷, 어디 앞에 삽입할 것인지
  }
}

function getBackgroundEvent(e) {
  var tag = e.target;
  movePiece = tag;
  movePieceParent = tag.parentNode;

  console.log(tag, tag.parentNode, "이동시작");
}

function onHoverEvent(e) {
  e.preventDefault();
}

function setBackgroundEvent(e) {
  var tag = e.target;

  tag.parentNode.appendChild(movePiece);
  movePieceParent.appendChild(tag);
  console.log(tag, "이동완료");

  checkAnswer();
}

function checkAnswer() {
  var solvePuzzlePiece = solvePuzzle.querySelectorAll(".pieceImg"); //querySelectorAll과 getElementById 차이?

  var currentNumber;
  var nextNumber;

  for (var i = 0; i < solvePuzzlePiece.length - 1; i++) {
    var currentPiece = solvePuzzlePiece[i];
    var nextPiece = solvePuzzlePiece[i + 1];

    // pieceImg라는 class가 하나 더 있어서 코드 추가
    var currentClass = currentPiece.classList[1]; // puzzlePieceImg1, puzzlePieceImg2, ...
    var nextClass = nextPiece.classList[1];

    // 현재 요소와 다음 요소의 숫자 부분을 추출하여 비교
    currentNumber = parseInt(currentClass.match(/\d+/)); // 1, 2 ...
    nextNumber = parseInt(nextClass.match(/\d+/));
  }
  // 순서가 올바르지 않으면 isSorted를 false로 설정하고 반복문 종료
  if (
    currentNumber == nextNumber - 1 &&
    nextNumber == solvePuzzlePiece.length - 1
  ) {
    console.log("정답!");
    stopTimer();
    var Success = document.getElementById("Success");
    Success.style.display = "inline";
  } else {
    console.log("오답");
  }
}

function startTimer() {
  var stopwatch = document.getElementById("StopWatch");

  time++;
  stopwatch.innerText = "Timer - " + getTimeString();
  timerId = setTimeout(startTimer, 1000);
}

function stopTimer() {
  clearTimeout(timerId); //setTimeout으로 진행되던 타이머 취소
}

function getTimeString() {
  min = parseInt(String(time / 60));
  sec = parseInt(String(time % 60));
  score = String(min).padStart(2, "0") + " : " + String(sec).padStart(2, "0");

  return score;
}

// 이벤트함수가 일반함수 밑
// js리스트 섞는 방법 따로 있음
