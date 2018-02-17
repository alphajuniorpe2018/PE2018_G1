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
backgroundForest.src = '../Images/embaixoPronto.png';
backgroundStands.src = '../Images/arquibancadaUso.png';
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
	/*
	COLOR CODING GOES HERE
	*/
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

// End Canvas' Drawings

// Declaring global variables for functions
var gameStarted = 0; // This indicates to several functions whether the game has started
//var load =0;
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
	if (elapsedTimeSec < 10) {
		document.getElementById("timeElapsedClock").innerHTML = '0' + elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
	}
	else {
		document.getElementById("timeElapsedClock").innerHTML = elapsedTimeSec + ':' + elapsedTimeMillisec.toString().substr(0,2);
	}
}

drawBackground();
drawGauges();
drawOscilator1();
drawOscilator2();

function gameLoop() {
	gameCanvasContext.shadowBlur = 0
    drawBackground();
	drawGauges();
	calculateElapsedTime();
	updateElapsedTimeDisplay();
	drawOscilator1();
	oscilateOscilator1();
	drawOscilator2();
	oscilateOscilator2();
}
