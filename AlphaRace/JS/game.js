var gameCanvas = document.createElement("canvas");
var gameCanvasContext = gameCanvas.getContext("2d"); // Creating the Canvas
gameCanvas.width = 800;
gameCanvas.height = 600;
document.getElementById('gameContainer').appendChild(gameCanvas); // Placing the Canvas

// Drawing the background
function drawBackground() {
	gameCanvasContext.fillStyle = "#808080";
	gameCanvasContext.fillRect(0,0,800,600); // General background
	gameCanvasContext.fillStyle = "#B6ACAC";
	gameCanvasContext.fillRect(170,0,460,600); // Game-area background
	gameCanvasContext.fillStyle = "#FFFFFF";
	gameCanvasContext.fillRect(170,220,460,5); // Stands's track
	gameCanvasContext.fillRect(170,280,460,5); //Player 1's track
    gameCanvasContext.fillRect(170,340,460,5);// Player 2's track
    gameCanvasContext.drawImage(backgroundStands, 170, 0);
    gameCanvasContext.drawImage(backgroundForest,170, 345);
}

// Creating new background images
var backgroundForest = new Image();
var backgroundStands = new Image();
backgroundForest.src = '../Images/Forest.png';
backgroundStands.src = '../Images/Stands.png';
backgroundStands.onload = function() {
     gameCanvasContext.drawImage(backgroundStands, 170, 0);
}
backgroundForest.onload = function() {
    gameCanvasContext.drawImage(backgroundForest,170, 345);
}
// Begginning to draw Player 1's Gauge
function drawGauges() {
	gameCanvasContext.shadowBlur = 40;
	gameCanvasContext.shadowColor = "rgba(255,180,180,0.5)"; // Red aura
	gameCanvasContext.fillStyle = "#FFFFFF";
	gameCanvasContext.beginPath();
	gameCanvasContext.moveTo(45, 50);
	gameCanvasContext.lineTo(125,50);
	gameCanvasContext.arc(125,67,17,1.5*Math.PI,0.5*Math.PI);
	gameCanvasContext.lineTo(50,84);
	gameCanvasContext.arc(45,67,17,0.5*Math.PI,1.5*Math.PI);
	gameCanvasContext.fill();
	// End Player 1's Gauge
	// The Gauge is 80px + 34px long and 30px tall

	// Begginning to draw Player 2's Gauge
	gameCanvasContext.shadowBlur = 40;
	gameCanvasContext.shadowColor = "rgba(180,180,255,0.5)"; // Blue aura
	gameCanvasContext.fillStyle = "#FFFFFF";
	gameCanvasContext.beginPath();
	gameCanvasContext.moveTo(675,50)
	gameCanvasContext.lineTo(755,50);
	gameCanvasContext.arc(755,67,17,1.5*Math.PI,0.5*Math.PI);
	gameCanvasContext.lineTo(675,84);
	gameCanvasContext.arc(675,67,17,0.5*Math.PI,1.5*Math.PI);
	/*
	COLOR CODING GOES HERE
	*/
	gameCanvasContext.fill();
	// End Player 2's Gauge
	// The Gauge is 80px + 34px long and 30px tall
}
// Global Variables for colors 
	var blurColorBox1Player1; //Used for the halo of the rect into the gauges
	var blurColorBox2Player1;
	var blurColorBox1Player2;
	var blurColorBox2Player2;
	var randomColor=0; // Used for the Math.random() which change the colors in the gauge
	var box1Player1 = {
		x: 0,
		y: 0,
		sizeX: 0,
		sizeY: 0,
		R: 0,
		G: 0,
		B: 0,
		boxBlurColor: 'green'
	};
	var box2Player1 = {
		x: 0,
		y: 0,
		sizeX: 0,
		sizeY: 0,
		R: 0,
		G: 0,
		B: 0,
		boxBlurColor: 'green'
	};
	var box1Player2 = {
		x: 0,
		y: 0,
		sizeX: 0,
		sizeY: 0,
		R: 0,
		G: 0,
		B: 0,
		boxBlurColor: 'green'
	};
	var box2Player2 = {
		x: 0,
		y: 0,
		sizeX: 0,
		sizeY: 0,
		R: 0,
		G: 0,
		B: 0,
		boxBlurColor: 'green'
	};

// Random for positions; Random for colors
function newRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function newColor(){
  randomColor = Math.random();
  return randomColor;
}
// Player 1 colors
function drawPlayer1ColorBox() {
    gameCanvasContext.shadowBlur=10;
    gameCanvasContext.shadowColor=blurColorBox1Player1;
    gameCanvasContext.fillStyle = 'rgb(' + box1Player1.R + ',' + box1Player1.G + ',' + box1Player1.B + ')';
    gameCanvasContext.fillRect(box1Player1.x,box1Player1.y,box1Player1.sizeX,box1Player1.sizeY);
    gameCanvasContext.shadowColor=blurColorBox2Player1;
    gameCanvasContext.fillStyle = 'rgb(' + box2Player1.R + ',' + box2Player1.G + ',' + box2Player1.B + ')';
    gameCanvasContext.fillRect(box2Player1.x,box2Player1.y,box2Player1.sizeX,box2Player1.sizeY);
    gameCanvasContext.shadowBlur=0;
}
function updatePlayer1ColorBox() {
	box1Player1.x = newRandom(45,65);
	box1Player1.y = 50;
	box1Player1.sizeX = newRandom(15,30);
	box1Player1.sizeY = 34;
	box2Player1.x = newRandom(75,95);
	box2Player1.y = 50;
	box2Player1.sizeX = newRandom(15,30);
	box2Player1.sizeY = 34;
	newColor();
	if (randomColor<=0.5) {
		box1Player1.R = 200;
		box1Player1.G = 0;
		box1Player1.B = 0;
		blurColorBox1Player1 = 'red';
		box2Player1.R = 0;
		box2Player1.G = 200;
		box2Player1.B = 0;
		blurColorBox2Player1 = 'green';
	} 
	else if(randomColor>0.5) {
		box1Player1.R = 0;
		box1Player1.G = 200;
		box1Player1.B = 0;
		blurColorBox1Player1 = 'green';
		box2Player1.R = 200;
		box2Player1.G = 0;
		box2Player1.B = 0;
		blurColorBox2Player1 = 'red';
	} 
}

// Player 2 colors

function drawPlayer2ColorBox() {
    gameCanvasContext.shadowBlur = 10;
    gameCanvasContext.shadowColor = blurColorBox1Player2;
    gameCanvasContext.fillStyle = 'rgb(' + box1Player2.R + ',' + box1Player2.G + ',' + box1Player2.B + ')';
    gameCanvasContext.fillRect(box1Player2.x,box1Player2.y,box1Player2.sizeX,box1Player2.sizeY);
    gameCanvasContext.shadowColor = blurColorBox2Player2;
    gameCanvasContext.fillStyle = 'rgb(' + box2Player2.R + ',' + box2Player2.G + ',' + box2Player2.B + ')';
    gameCanvasContext.fillRect(box2Player2.x,box2Player2.y,box2Player2.sizeX,box2Player2.sizeY);
	gameCanvasContext.shadowBlur = 0;
}
function updatePlayer2ColorBox() {
    box1Player2.x = newRandom(675,695);
    box1Player2.y = 50;
    box1Player2.sizeX = newRandom(15,30);
    box1Player2.sizeY = 34;
    box2Player2.x = newRandom(705,725);
    box2Player2.y = 50;
    box2Player2.sizeX = newRandom(15,30);
    box2Player2.sizeY = 34;
      newColor();
      if (randomColor<=0.5) {
        box1Player2.R = 200;
        box1Player2.G = 0;
        box1Player2.B = 0;
        blurColorBox1Player2='red';  
        box2Player2.R = 0;
        box2Player2.G = 200;
        box2Player2.B = 0;
        blurColorBox2Player2='green';
      } else if(randomColor>0.5) {
        box1Player2.R = 0;
        box1Player2.G = 200;
        box1Player2.B = 0;
        blurColorBox1Player2='green';  
        box2Player2.R = 200;
        box2Player2.G = 0;
        box2Player2.B = 0;
        blurColorBox2Player2='red';
      } 
}

// Begginning to draw Player 1's Oscilator

var oscilator1 = {
	x: 29,
	y: 46,
	width: 3,
	height:42,
	gear: 0
};

function drawOscilator1() {
	gameCanvasContext.shadowBlur = 0;
	gameCanvasContext.fillStyle = "#333333";
	gameCanvasContext.fillRect(oscilator1.x, oscilator1.y, oscilator1.width, oscilator1.height);
}

function oscilateOscilator1() {
	if (oscilator1.gear == 0) {
		oscilator1.x++;
		if (oscilator1.x == 139) {
			oscilator1.gear = 1;
		}
	}
	else {
		oscilator1.x--;
		if (oscilator1.x == 29) {
			oscilator1.gear = 0;
		}
	}
}

// Begginning to draw Player 2's Oscilator

var oscilator2 = {
	x: 659,
	y: 46,
	width: 3,
	height:42,
	gear: 0
};

function drawOscilator2() {
	gameCanvasContext.shadowBlur = 0;
	gameCanvasContext.fillStyle = "#333333";
	gameCanvasContext.fillRect(oscilator2.x, oscilator2.y, oscilator2.width, oscilator2.height);
}

function oscilateOscilator2() {
	if (oscilator2.gear == 0) {
		oscilator2.x++;
		if (oscilator2.x == 769) {
			oscilator2.gear = 1;
		}
	}
	else {
		oscilator2.x--;
		if (oscilator2.x == 659) {
			oscilator2.gear = 0;
		}
	}
}

var player1 = {
	x: 175,
	y: 230,
	spriteSrc: "../Images/HorseBlue.png"
};

var player2 = {
	x: 175,
	y: 290,
	spriteSrc: "../Images/HorseRed.png"
};

player1Sprite = new Image();
player1Sprite.src = player1.spriteSrc;
player2Sprite = new Image();
player2Sprite.src = player2.spriteSrc;

function drawPlayer1() {
	gameCanvasContext.drawImage(player1Sprite, player1.x, player1.y);
}

function drawPlayer2() {
	gameCanvasContext.drawImage(player2Sprite, player2.x, player2.y);
}

// End Canvas' Drawings

// Declaring global variables for functions
var gameStarted = 0; // This indicates to several functions whether the game has started
var gameEnded = false; // Indicates whether both players have reached the finish line
var nowTime = new Date(); // This will be used by more than one function that calculates time in some way
var startTime = 0;
var elapsedTime = 0;
var elapsedTimeSec = 0;
var elapsedTimeMin = 0;

// startButton's function: startGame. Initiates the game loop and attributes values to some needed variables.
function startGame() {
	if (gameStarted == 0) {
		gameStarted = 1;
		startTime = new Date();
		setInterval(gameLoop, 5);
        setInterval(loopColors, 2000);
	}
	else {
		alert("Game has already started!")
	}
}

// Calculates how much time has passed since startGame. Needs to be in the game loop to work properly, but would preferably be in its own independent loop.
function calculateElapsedTime() {
	nowTime = new Date();
	
	elapsedTime = (nowTime - startTime) / 1000; // Stores, in seconds, the round's elapsed time
	elapsedTimeMillisec = (nowTime - startTime) % 1000; // Meant to be used for display, stores, in milliseconds, the elapsed time, resetting every 1000 milliseconds
	elapsedTimeSec = Math.floor(elapsedTime % 60); // Meant to be used for display, stores, in seconds, the elapsed time, resetting every 60 seconds
	elapsedTimeMin = Math.floor(elapsedTime / 60); // Meant to be used for display, stores, in minutes, the elapsed time.
}

function updateElapsedTimeDisplay() {
	if (elapsedTimeMin == 0) {
		if (elapsedTimeSec < 10) {
			document.getElementById("timeElapsedClock").innerHTML = '0' + elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
		}
		else {
			document.getElementById("timeElapsedClock").innerHTML = elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
		}
	}
	else {
		if (elapsedTimeMin < 10) {
			if (elapsedTimeSec < 10) {
				document.getElementById("timeElapsedClock").innerHTML = '0' + elapsedTimeMin + ':' + '0' + elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
			}
			else {
				document.getElementById("timeElapsedClock").innerHTML = '0' + elapsedTimeMin + ':' + elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
			}
		}
		else {
			if (elapsedTimeSec < 10) {
				document.getElementById("timeElapsedClock").innerHTML = elapsedTimeMin + ':' + '0' + elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
			}
			else {
				document.getElementById("timeElapsedClock").innerHTML = elapsedTimeMin + ':' + elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
			}
		}
	}
}

function player1Forward() {
	if (gameStarted == 1) {
		player1.x = player1.x + 20;
		if (player1.x >= 560) {
			player1.x = 560;
			finishRoundPlayer1();
		}
	}
	else {
	}
}

function player2Forward() {
	if (gameStarted == 1) {
		player2.x = player2.x + 20;
		if (player2.x >= 560) {
			player2.x = 560;
			finishRoundPlayer2();
		}
	}
	else {
	}
}

var player1FinishedRound = false;
var player2FinishedRound = false;
var player1FinishTime;
var player2FinishTime;

function finishRoundPlayer1() {
	player1FinishedRound = true;
	player1FinishTime = elapsedTime;
	document.getElementById('player1Results').innerHTML = player1FinishTime.toString().slice(0,-1) + '&nbsp;secs';
	if (player2FinishedRound == true) {
		gameEnded = true;
	}
}

function finishRoundPlayer2() {
	player2FinishedRound = true;
	player2FinishTime = elapsedTime;
	document.getElementById('player2Results').innerHTML = player2FinishTime.toString().slice(0,-1) + '&nbsp;secs';
	if (player1FinishedRound == true) {
		gameEnded = true;
	}
}

var player1KeyDown = false; // These two variables are needed to ensure the player won't just hold down the forward key.
var player2KeyDown = false;

function checkKeyDown(evt) {
	if (evt.keyCode == 39 && player1KeyDown == false && player1.x < 560) { // if right arrow is pressed
		player1Forward();
		player1KeyDown = true;
	}
	else if (evt.keyCode == 68 && player2KeyDown == false && player2.x < 560) { // if D is pressed
		player2Forward();
		player2KeyDown = true;
	}
}

function checkKeyUp(evt) {
	if (evt.keyCode == 68) {
		player2KeyDown = false;
	}
	else if (evt.keyCode == 39) {
		player1KeyDown = false;
	}
}

// Executing necessary functions, event listeners and stating game loop 

drawBackground();
drawGauges();
drawOscilator1();
drawOscilator2();
player1Sprite.onload = drawPlayer1;
player2Sprite.onload = drawPlayer2;
updatePlayer1ColorBox();
drawPlayer1ColorBox();
updatePlayer2ColorBox();
drawPlayer2ColorBox();

window.addEventListener('keydown', checkKeyDown); // used for the checkKeyDown function, which allows players to move
window.addEventListener('keyup', checkKeyUp); // Used to ensure players won't just hold down the forward key

function gameLoop() {
	if (gameEnded == false) {
		gameCanvasContext.shadowBlur = 0
		drawBackground();
		drawGauges();
		drawPlayer1ColorBox();
		drawPlayer2ColorBox();
		calculateElapsedTime();
		updateElapsedTimeDisplay();
		drawOscilator1();
		oscilateOscilator1();
		drawOscilator2();
		oscilateOscilator2();
		drawPlayer1();
		drawPlayer2();
	}
}

function loopColors(){
    updatePlayer1ColorBox();
    updatePlayer2ColorBox();
}