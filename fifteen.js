/*
Created By: Troy Smith   620103925
Bonus Feature implemented:  End-of-game notification by showing completed picture and text with effects.

*/


// original position of empty space
var emptyTileX = "300px";
var emptyTileY = "300px";

// holds the correct positions to determine if game is completed
var correctPosX = []; 
var correctPosY = []; 


// function that sets the board at beginning of game and implements important functions
function setBoard(){
	// sets the shuffle button so that board will be shuffled on click
	var shuffleButton = document.getElementById("shufflebutton");
	shuffleButton.onclick = function(){
    	shuffle();
    }

	tiles = $("#puzzlearea").children();

    for (i=0;i<tiles.length;i++){
        tiles[i].classList.add("puzzlepiece");
        tiles[i].onmouseover = function(){
        	if (movableCheck(this)){
        		this.classList.add("movablepiece");
        	} else {
        		this.classList.remove("movablepiece");
        	}

        }

        //moves tile if movable and removes highlight after move; checks if game is finished
        tiles[i].onclick = function(){
        	if (movableCheck(this)){
        		move(this);
        		if (this.classList.contains("movablepiece")) {
        			this.classList.remove("movablepiece");
        		}
  
        		if (finishCheck()){
        			win();
        			tiles[11].classList.remove("movablepiece");
    				tiles[14].classList.remove("movablepiece");
        		}
        	}
        }
    }

    for (i=0;i<4;i++){
        tiles[i].style.top = "0px";
        tiles[i].style.left = `${100*i}px`;
     	tiles[i].style.backgroundPosition = `${-100*i}px 0px`; 
    }
    for (i=4;i<8;i++){
        tiles[i].style.top = "100px";
        tiles[i].style.left = `${100*(i%4)}px`;
        tiles[i].style.backgroundPosition = `${-100*(i%4)}px -100px`; 

    }
    for (i=8;i<12;i++){
        tiles[i].style.top = "200px";
        tiles[i].style.left = `${100*(i%4)}px`;
        tiles[i].style.backgroundPosition = `${-100*(i%4)}px -200px`; 

    }
    for (i=12;i<15;i++){
        tiles[i].style.top = "300px";
        tiles[i].style.left = `${100*(i%4)}px`;
        tiles[i].style.backgroundPosition = `${-100*(i%4)}px -300px`; 
    }

    for (t=0; t<tiles.length; t++){
    	correctPosX.push(tiles[t].style.left);
    	correctPosY.push(tiles[t].style.top);
    }

}

// function that checks if tile can move; if adjacent space is empty
function movableCheck(tile){
 	if (parseInt(tile.style.left) == (parseInt(emptyTileX) - 100) && (tile.style.top == emptyTileY) ){		
 		return true
 	}

 	if (parseInt(tile.style.top) == (parseInt(emptyTileY) - 100) && tile.style.left == emptyTileX){
 		return true
 	}

	if (parseInt(tile.style.left) == (parseInt(emptyTileX) + 100) && tile.style.top == emptyTileY  ){
 		return true
 	}

 	if (parseInt(tile.style.top) == (parseInt(emptyTileY) +100) && tile.style.left == emptyTileX){
 		return true
 	}	
 }

// function that moves/swaps tile to empty space
function move(tile){
	var openX = tile.style.left
	var openY = tile.style.top

	tile.style.left = emptyTileX;
	emptyTileX = openX;

	tile.style.top = emptyTileY;
	emptyTileY = openY;
}


// function that shuffles tiles when button is clicked by randomly moving tiles several times
// checks each tile several times if movable and stores possible movements in array; uses random function to select random move.
function shuffle(){
	var choices = [];
	for (c= 0; c<400 ; c++){
		for (t=14; t>=0 ; t--){
			if (movableCheck(tiles[t])){
				choices.push(t);
			}
		}
		posMove = choices[Math.floor(Math.random() * choices.length)];
		move(tiles[posMove]);
	}
}


// function that checks if game is finished completely 
function finishCheck(){
	for (t=0; t<tiles.length; t++){
		if (tiles[t].style.left != correctPosX[t] || tiles[t].style.top != correctPosY[t]){
			return false;
		}
	}
	return true;
}


// function that calls bonus function to indicate win and ends game.
function win(){
    for (c=0; c < tiles.length; c++){
    	tiles[c].onclick = null;
   
    }

    bonus();

   	var shuffleButton = document.getElementById("shufflebutton");
    shuffleButton.onclick = null;
}


// function that performs the bonus feature if game is completed.
function bonus(){
	var message = document.querySelector("p");
	var gridArea = document.querySelector("body");

	for (c=0; c < tiles.length; c++){
   		tiles[c].style.borderWidth = "0"; 
    	tiles[c].style.height= '100px';
    	tiles[c].style.width= '100px';
    }

    gridArea.style.backgroundColor = "#40E0D0";
    message.align = "center";
    message.style.color = "red"; 
    message.style.fontFamily = "Papyrus";
    message.style.fontWeight = "bold";
    message.style.fontSize = "25px";

    for(m= 0; m<20; m++){
    	$(message).fadeOut("fast");
    	$(message).fadeIn("fast");
    }
    message.innerText = "WINNER!!!  You have successfully completed the game. Reload the page to start again.";
}

// function findObject(row,column){
// 	if (row==0 || column == 0){
// 		row = 1;
// 		column = 1;
// 	}
// 	return tiles[row*100]
// }


$(document).ready(function(){
    setBoard();


})


