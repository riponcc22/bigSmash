'use strict'

/*Md Ripon Hossain
ID: 301215985
*/
//Background photo creadit wwww.shutterstock.com

//Canvas element creates
var canvas = document.createElement("canvas"); 
//2 dimensional context creation inside canvas
var contxt= canvas.getContext("2d");
//canvas size
canvas.width = 670; canvas.height = 470;
//append the canvas in mycanvas divisiin
document.getElementById("myCanvas").appendChild(canvas);
//background image
var bgReady = false;
var bgImage= new Image(); 
bgImage.onload = function () {

bgReady =true;
};
//find the background image
bgImage.src="bgimage.jpg";
//bug image
var bugReady=false;
// Bug image var bugReady false;
var bugImage = new Image();

bugImage.onload = function () 
{ bugReady= true;
};
//find the bugimage
bugImage.src="bugimage1.png";

// initialize score to 0
var score=0; 
// initialize hop interval 
var hopInterval = 2000;

//set hop
var hopS =setInterval(function () {

resetLocation();},hopInterval);

var bug = {
    //initial value 0
    x: 0,
    y: 0,
    speed:256 // bug movement in pixels per second
    
  };
  
  // Handle mouse control while the user clicking on the bug
 canvas.addEventListener("mousedown", clicked, false);
  function clicked(e) {
    e.preventDefault();
  
    // Find the location of the mouse click
    var x = e.clientX;
    var y = e.clientY;
  
    // Check if the player clicked on the bug
    if (x > bug.x && x < bug.x + 450 && y > bug.y && y < bug.y + 550) {
      
    // Increment score by 5
      score += 5;
      resetLocation();
      //Hop interval redeuces, but it should not be less than 0
      if (hopInterval - 150 >= 100) {
        clearInterval(hopS);
        hopInterval -= 150;
        hopS = setInterval(function() {
          resetLocation();
        }, hopInterval);
      }
    }
  }
  //reset the location of bug
  var resetLocation=function () {
    // random position creates for the bug element inside the canvas
    bug.x = (Math.random() * (canvas.width-250));
    bug.y = (Math.random() * (canvas.height-200));
  };

  //reset the bug speed
  var resetSpeed = function() {
    clearInterval(hopS);
    hopInterval = 2000;
    hopS = setInterval(function() {
      resetLocation();
    }, hopInterval);
    
  };
  //reset the score
  var resetScore = function() {
    score = 0;
    resetSpeed();
  };
 
  // Draw everything
  var render = function() {
    if (bgReady) {
      contxt.drawImage(bgImage, 0, 0);
    }
    if (bugReady) {
      contxt.drawImage(bugImage, bug.x, bug.y);
    }
    // Score
    document.getElementById("score").innerHTML = "Score: " + score;
  };
  
  // The main game loop
  var main = function() {
    
    render();

    // Request to do this again ASAP
    requestAnimationFrame(main);
  };
  
  // Cross-browser support for requestAnimationFrame
  var w = window;
  requestAnimationFrame =w.requestAnimationFrame;
  // start the game
  resetSpeed();
  main();