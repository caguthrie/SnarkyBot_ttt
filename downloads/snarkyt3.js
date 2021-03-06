/* Welcome to SnarkyBot tic-tac-toe!

   By: Christopher Guthrie
   Date: 11/19/2013
   
   This is a simple JavaScript tic-tac-toe game.  It has modes for
   one or two players.  The one player game has three diffuculty
   levels, the top one being an impossible diffucutly, where the
   computer is unbeatable.  The computer is programmed with a
   snarky tone to make things a little less mundane from your
   run of the mill tic-tac-toe.  I hope you like it!
   
   -Chris */

var WINLENGTH = 3;        // How many in a row it takes to win
var CENTERINDEX = 1;      // The array index of the center
var CENTER = "5";         // The starting value of the center

// Variables to see if there are enough in a row to win
var xinARow = 0;
var oinARow = 0;

var comment = "Type the number where you would like to move.";
var snarkyComment = "";

// Variables for which letter is which player
var compLetter = "";
var player1Letter = "";
var player2Letter = "";

var turn = "X";           // Who's turn it is, starts on X
var aWin = false;

var difficulty = "";
var test = false;

// Starting board
var aa = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];

// Global placeholder variables
var i_global;
var j_global;
var globalLetter;

/* reset sets the global variables used to detect a win back to 0
   Arguments: None 
   
   Returns: Nothing*/
var reset = function(){
    xinARow = oinARow = 0;
}

/* inarow is a helper function that gets called to see if there
   are multiple of the same letter in the row to detect a win.
   Arguments: arr -> the board being used
              ii -> the i index of the array to be checked
              jj -> the j index of the array to be checked
              
    Returns: true if there is something in a row without blocks
             else, false */
var inarow = function( arr, ii, jj ){
    if( arr[ii][jj] === "X" && oinARow === 0 ){
        xinARow++;
    }
    else if ( arr[ii][jj] === "O" && xinARow === 0 ){
        oinARow++;
    }
    else{
        reset();    // Reset counter, no t^3
        return false;
    }
    return true;
}

/* isWin detects if there is a winner on the board passed into it
   Arguements: board -> the board to be checked
   
   Returns: A string.  X or O if either of them win, else null. */
var isWin = function( board ){
    
    reset();
    
    // Check for horizontal t^3
    for( var i=0; i<board.length; i++ ){
        for( var j=0; j<board[i].length; j++ ){
            if( inarow( board, i, j ) === false ){
               break;
            }

        }
        if( xinARow === WINLENGTH || oinARow === WINLENGTH ){
            return( winner() );
        }
    }
    reset();
    
    // Check for vertical t^3
    for( i=j=0; j<board[i].length; j++ ){
        for( i=0; i<board.length; i++ ){
            if( inarow( board, i, j ) === false ){
                break;
            }
        }
         if( xinARow === WINLENGTH || oinARow === WINLENGTH ){
            return( winner() );
        }
    }
    reset();
    
    // Check for diagonal down and to the right t^3
    for( j=i=0; i<board.length; i++ ){
         if( inarow( board, i, j ) === false ){
            break;
         }
         if( xinARow === WINLENGTH || oinARow === WINLENGTH ){
            return( winner() );
         }
         j++;
    }
    reset();
    
    // Check for diagonal down and to the left t^3
    i=0;
    for ( j=board.length-1; j>=0; j-- ){
         if( inarow( board, i, j ) === false ){
            break;
         }
         if( xinARow === WINLENGTH || oinARow === WINLENGTH ){
            return( winner() );
         }
         i++;
    }
    reset();
    
    return( "null" );
}

/* winner detects if X or O has just won and returns the winner
   Arguments: none
   
   Returns: X or O, whoever has won.  Else, returns null. */
var winner = function(){
    if( xinARow === WINLENGTH ){
        return( "X" );
    }
    else if( oinARow === WINLENGTH ){
        return( "O" );
    }
    else{
        return( "null" );
    }
}

/* playerWin alerts an upset message if the player wins
   Arguments: None
   
   Returns: Nothing */
var playerWin = function(){
    alert("What happened?  You WON?! You must have cheated!\n" + printBoard( aa ) );
}

/* compWin alerts a snarky message if the computer wins
   Arguments: None
   
   Returns: Nothing */
var compWin = function(){
    alert("You think you could beat ME?! Ha! Nice try!\n" + printBoard( aa ) );
}

/* isNotFull returns true is (you guessed it) if the board is not
   full.
   Arguements: board -> The board to be checked
   
   Returns: true if the board is not full, false if it is full */
var isNotFull = function( board ){
    for( var i=0; i<board.length; i++ ){
        for( var j=0; j<board[i].length; j++ ){
            if( board[i][j] === "X" || board[i][j] === "O" ){
                continue;
            }
            else{
                return true;
            }
        }
    }
    return false;
}

/* saveIndex is used to help locate traps by saving a possible
   block to a global variable.
   Arguments: i -> i index of the block
              j -> j index of the block
              letter -> letter being inserted into that position
              
   Returns: Nothing */
var saveIndex = function( i, j, letter ){

    i_global = i;
    j_global = j;
    globalLetter = letter;
}

/* block iterates in different directions through the board to
   locate a possible block.  If a block is found, it returns
   the board with the block included
   Arguments: blockarr -> The board to be analyzed
              letter -> The letter you want to block with
              opLetter -> The letter of your opponent
              
   Returns: The board with the block move, 0 if impossible or
            testing, or a random move if no block is found and in
            hard diffuculty */
var block = function( blockarr, letter, opLetter ){
    
    var enemyCounter = 0;
    var emptyIndex_i = 0;
    var emptyIndex_j = 0;
    
    // Check for horizontal block
    for( var i=0; i<blockarr.length; i++ ){
        for( var j=0; j<blockarr[i].length; j++ ){
            if( blockarr[i][j] === letter ){
               enemyCounter = 0;
               break;
            }
            else if( blockarr[i][j] === opLetter ){
                enemyCounter++;
            }
            else{
                emptyIndex_i = i;
                emptyIndex_j = j;
            }
        }
        if( enemyCounter === 2 && j === blockarr[i].length ){
            saveIndex( emptyIndex_i, emptyIndex_j, 
                  blockarr[emptyIndex_i][emptyIndex_j] );
            blockarr[emptyIndex_i][emptyIndex_j] = letter;
            return( blockarr );
        }
        enemyCounter = emptyIndex_i = emptyIndex_j = 0;
    }
  
    // Check for vertical block
    for( i=j=0; j<blockarr.length; j++ ){   
        for( i=0; i<blockarr.length; i++ ){                
            if( blockarr[i][j] === letter ){
               enemyCounter = 0;
               break;
            }
            else if( blockarr[i][j] === opLetter ){
                enemyCounter++;
            }
            else{
                emptyIndex_i = i;
                emptyIndex_j = j;
            }
         
        }
        if( enemyCounter === 2 && i === blockarr.length ){    
            saveIndex( emptyIndex_i, emptyIndex_j, 
                  blockarr[emptyIndex_i][emptyIndex_j] );
            blockarr[emptyIndex_i][emptyIndex_j] = letter;
            return( blockarr );
        }
        enemyCounter = emptyIndex_i = emptyIndex_j = 0;
    }
    
    // Check for diagonal, down and to the right, block
    for( j=i=0; i<blockarr.length; i++ ){
        if( blockarr[i][j] === letter ){
           enemyCounter = 0;
           break;
        }
        else if( blockarr[i][j] === opLetter ){
            enemyCounter++;
        }
        else{
            emptyIndex_i = i;
            emptyIndex_j = j;
        }
        j++;
    }
    
    if( enemyCounter === 2 && i === blockarr.length ){
        saveIndex( emptyIndex_i, emptyIndex_j, 
                  blockarr[emptyIndex_i][emptyIndex_j] );
        blockarr[emptyIndex_i][emptyIndex_j] = letter;
        return( blockarr );
    }
    emptyIndex_i = emptyIndex_j = 0;    
    enemyCounter = 0;
    
    // Check for diagonal, down and to the left, block  
    i=0;
    for ( j=blockarr.length-1; j>=0; j-- ){
        if( blockarr[i][j] === letter ){
           enemyCounter = 0;
           break;
        }
        else if( blockarr[i][j] === opLetter ){
            enemyCounter++;
        }
        else{
            emptyIndex_i = i;
            emptyIndex_j = j;
        }
        i++;
    }
    if( enemyCounter === 2 && i === blockarr.length ){
        saveIndex( emptyIndex_i, emptyIndex_j, 
                  blockarr[emptyIndex_i][emptyIndex_j] );
        blockarr[emptyIndex_i][emptyIndex_j] = letter;
        return( blockarr );
    }      
        
    emptyIndex_i = emptyIndex_j = 0;
    
    // If we are testing for a trap or impossible diff, return 0
    if( test || difficulty === "I" ){
        return(0);
    }
    
    // If the difficulty is hard and we can't block, move randomly
    if( difficulty === "H" ){
      return( computerChoiceEasy( blockarr ) );
    }
        
}

/* isALetter finds out if a certain index contains an X or an O
   Arguments: arr -> The board to be looked at
              i -> i index location
              j -> j index location
          
   Returns: true if the index contains an X or O, else false */
var isALetter = function( arr, i, j ){
    if ( arr[i][j] === "X" || arr[i][j] === "O" ){
       return true;
    }
    else{
       return false;
    }
}

/* itsATrap identifies if, on the current board, there is an
   oppurtunity to trap (meaning, if there is a move to create
   two possible tic-tac-toes on your next move).
   Arguments: board -> The board to be analyzed
              letter -> The letter to attempt a trap with
              opLetter -> The opposing player's letter
    
   Returns: The board with the trap in it if one can find one.  If
            not, it returns an empty string */
var itsATrap = function( board, letter, opLetter ){
    
    test = true;
    
    var temp = "";
    var tempBoard;
    
    var block1i;
    var block1j;
    var block1number;
    
    for( var i=0; i<board.length; i++ ){
        for( var j=0; j<board[i].length; j++ ){
            if( isALetter( board, i, j ) === false ){
                temp = board[i][j];
                board[i][j] = letter;
                
                if( block( board, opLetter, letter ) === 0 ){
                    board[i][j] = temp;
                    continue;
                }
                else{
                    block1i = i_global;
                    block1j = j_global;
                    block1number = globalLetter;

                    tempBoard = block( board, opLetter, letter );
                    if(  tempBoard === 0 ){
                        board[i][j] = temp;
                        board[block1i][block1j] = block1number;
                        continue;
                    }    
                    else{
                        board[i][j] = temp;
                        board[block1i][block1j] = block1number;
                        board[i_global][j_global] = globalLetter;
                        test = false;
                        return( board[i][j] );
                    }
                }
            }
        }
    }
    test = false;
    return( "" );
}

/* isEmpty returns true if the board is (surprise!) empty.
   Arguments: arr -> Board to be checked
   
   returns: false if the board is not empty.  true if it is */
var isEmpty = function( arr ){
    for( var i=0; i<arr.length; i++ ){
        for( var j=0; j<arr[i].length; j++ ){
            if( isALetter( arr, i, j ) === true ){
                return false;
            }
        }
    }
    return true;
}

/* computerChoiceImpossible is a function that is used if the user
   inputs his/her wish to play against an impossible computer.
   This computer defends perfectly and does not allow the player
   to win.
   Arguements: imparr -> the board to be used
   
   Returns: A 2d array, which is the board with a new move on it*/
var computerChoiceImpossible = function( imparr ){
    
    var placeholder = "";
    var temp;
    var trapReturn;
    var trapped = [];
    aTrap = false;
    
    // If the board is empty, play in the upper-left corner
    if( isEmpty(imparr) ){
        imparr[0][0] = compLetter;
        return( imparr );
    }
    
    // If comp can win now, make that move and return
    for( var i=0; i<imparr.length; i++ ){
        for( var j=0; j<imparr[i].length; j++ ){
            if( isALetter( imparr, i, j ) === false ){
                
                placeholder = imparr[i][j];
                imparr[i][j] = compLetter;

                if( isWin( imparr ) === compLetter ){
                    return( imparr );
                }               
                
                imparr[i][j] = placeholder;

            }
        }
    }
    
    // If comp can't win, block now
    temp = block( imparr, compLetter, player1Letter );
    
    if( temp !== 0 ){
        return( temp );
    }  
    
    // If comp can't block, attempt a trap
    trapReturn = itsATrap( imparr, compLetter, player1Letter );
    
    if( trapReturn !== "" ){
        return( placeLetter( imparr, trapReturn, compLetter ) );
    }
    
    // If comp can't trap, don't fall into a trap
    for( var a=0; a<imparr.length; a++ ){
        for( var b=0; b<imparr[a].length; b++ ){
            if( isALetter( imparr, a, b ) === false ){
                
                placeholder = imparr[a][b];
                imparr[a][b] = compLetter;

                trapReturn = itsATrap( imparr, player1Letter,
                                      compLetter );
                
                if( trapReturn !== "" ){
                    trapped.push(trapReturn);
                }
                
                imparr[a][b] = placeholder;

            }            
        }
    }
    
    if( trapped.length !== 0 ){
        for( i=0; i<imparr.length; i++ ){
            for( j=0; j<imparr[i].length; j++ ){
                if( isALetter( imparr, i, j ) === false ){
                    for( var k=0; k<trapped.length; k++ ){
                        if( imparr[i][j] === trapped[k] ){
                            aTrap = true;
                            break;
                        }
                    }
                    if( aTrap === false ){
                        imparr[i][j] = compLetter;
                        return( imparr );
                    }
                    aTrap = false;
                }
            }
        }
    }
    
    if( trapReturn !== "" ){
        return( placeLetter( imparr, trapReturn, compLetter ) );
    }
    
    // If no trap to block, play in the middle
    if( imparr[CENTERINDEX][CENTERINDEX] === CENTER ){
        imparr[CENTERINDEX][CENTERINDEX] = compLetter;
        return( imparr );
    }
    
    // If can't play in the middle, play a corner
    for( var ii=0; ii<imparr.length; ii=ii + imparr.length-1 ){
        for(var jj=0; jj<imparr.length; jj=jj+imparr.length-1 ){
            if( isALetter( imparr, ii, jj ) === false ){
                imparr[ii][jj] = compLetter;
                return( imparr );
            }
        }
    }
    
    // If can't play a corner, move randomly
    return( computerChoiceEasy( imparr ) );
    
}

var placeLetter = function( board, position, letter ){
    for( var i=0; i<board.length; i++ ){
        for( var j=0; j<board[i].length; j++ ){
            if( board[i][j] === position ){
                board[i][j] = letter;
                return( board );
            }
        }
    }
    return( board );
}

/* computerChoiceHard is called if the player wishes to play a
   hard opponent.  This diffuculty level enables the computer to
   complete three in a row.  If it cannot win this turn, it
   attempts a block.  If it cannot block this turn, it plays
   randomly.
   Arguements: hardarr -> The board to be used
   
   Returns: A 2d array, which is the board with a new move in it*/
var computerChoiceHard = function( hardarr ){
    
    var placeholder = "";
    
    for( var i=0; i<hardarr.length; i++ ){
        for( var j=0; j<hardarr[i].length; j++ ){
            if( hardarr[i][j] !== "X" && hardarr[i][j] !== "O" ){
                
                placeholder = hardarr[i][j];
                hardarr[i][j] = compLetter;

                // If comp can win now, make that move and return
                if( isWin( hardarr ) === compLetter ){
                    return( hardarr );
                }               
                
                hardarr[i][j] = placeholder;

            }
        }
    }
    
    // If comp can't win, block now or move randomly
    return( block( hardarr, compLetter, player1Letter ) );
}

/* computerChoiceEasy is called when a random move is required.
   Arguments: easyarr -> The board for which a random move is 
                         needed.
                        
   Returns: A 2d array, which is the board with the random move */                     
var computerChoiceEasy = function( easyarr ){
    var a = 0;
    var b = 0;
    
    while( true ){
        a = Math.floor( Math.random()*WINLENGTH );
        b = Math.floor( Math.random()*WINLENGTH );
        
        if( isALetter( easyarr, a, b ) === false ){
            easyarr[a][b] = compLetter;
            return( easyarr );
        }
    }
}

/* playerChoice is a function that processes user input and puts
   the player's letter where he/she wants it to go.
   Arguments: input -> The user input (should be a 1-9 position)
              letter -> The current player's letter
              
   Returns: false if it is invalid input.  true if it is valid */
var playerChoice = function( input, letter ){
    
    // Special case when input is either X or O
    if( input === "X" || input === "O" ){
        snarkyComment = "You think you're sneaky or something?\n";
        return false;
    }
    
    for( var i=0; i<aa.length; i++ ){
        for( var j=0; j<aa[i].length; j++ ){
            if( aa[i][j] === input ){
                aa[i][j] = letter;
                snarkyComment = "";
                return true;
            }
        }
    }
    
    // If input is not a valid position on the board
    snarkyComment = "Hey human, learn to read!\n";
    return false;
}

/* swapTurns is a simple function that changes who's turn it is
   Arguements: None.
   
   Returns: Nothing. */
var swapTurns = function(){
    if( turn === "X" ){
        turn = "O";
    }
    else{
        turn = "X";
    }
}

/* boardString is a function that concatenates a string, which is
   a visual representation of the current tic-tac-toe board.
   Arguments: board -> The board to be visually represented
   
   Returns: A string, which is the board's visual representation*/
var printBoard = function( board ){
    var boardString = "";
    
    for( var i=0; i<board.length; i++ ){
        for( var j=0; j<board[i].length; j++ ){
            boardString = boardString + board[i][j] + " ";
            if( j<board[i].length-1 ){
                boardString = boardString + "| ";
            }
        }
        if( i<board.length-1 ){
          boardString = boardString + "\n- + - + -\n";
        }
    }
    return( boardString );
}

/* printGo assembles a string with turn and board information
   Arguments: letter -> The letter of the current player's turn
   
   Returns: A string with turn information and the board. */
var printGo = function( letter ){
    return( snarkyComment + "You are " +
                    letter + "s\n" + comment + "\n\n" 
                                 + printBoard(aa) );
}

/* twoPlayerWin assembles a string announcing who won in a two
   player game.
   Arguments: player -> A string with the number of the player
   
   Returns: Nothing */
var twoPlayerWin = function( player ){
    alert( "Player " + player + " wins! ");
}

/* twoPlayers is the function used when a two player game is
   initiated.
   Arguements: None.
   
   Returns: true if the user wants to play again.  Else, false */
var twoPlayers = function(){

    var whoseTurn;
    
    // Coinflip to see who goes first
    if( Math.floor( Math.random()*2 ) === 0 ){
        alert("Player 1 won the coinflip, will be Xs, " + 
              "and will go first.");
        player1Letter = "X";
        player2Letter = "O";
    }
    else{
        alert("Player 2 won the coinflip, will be Xs, " + 
              "and will go first.");
        player2Letter = "X";
        player1Letter = "O";
    }

    turn = "X";
    
    var inn = "";

    while( isNotFull(aa) ){
        if( turn === player1Letter ){
            whoseTurn = "It is player 1's turn.\n";
            inn = prompt( whoseTurn + printGo(player1Letter) ); 
            if( playerChoice( inn, player1Letter ) === false ){
                continue;
            }
        }
        else{
            whoseTurn = "It is player 2's turn.\n";
            inn = prompt( whoseTurn + printGo(player2Letter) ); 
            if( playerChoice( inn, player2Letter ) === false ){
                continue;
            }
        }
    
        inn = isWin(aa);
    
        if( inn === "X" ){
            if( "X" === player1Letter ){
                twoPlayerWin("1");
            }
            else{
                twoPlayerWin("2");      
            }
            aWin = true;
            break;
        }
    
        if( inn === "O" ){
            if( "O" === player1Letter ){
                twoPlayerWin("1");
            }
            else{
                twoPlayerWin("2");      
            }
            aWin = true;
            break;
        }
        swapTurns();
    }
    
    if( aWin === false ){
        alert( "You two are boring me.  Tie game!" );
    }
    else{
        aWin = false;
    }
    
    // See if the user wants to play again
    var playAgain = prompt("Would you like to play again? (Y/N)");
        
    if( playAgain.substring(0,1).toUpperCase() === "Y" ){
        aa = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
        return true;
    }
    else if(playAgain.substring(0,1).toUpperCase() === "N"){
        alert( "Fine!  Well get outta here then!");
        return false;
    }
    else{
        alert( "I'll take that as a no.  See you next time, " +
                             "inept humans!");
        return false;
    }     
}


alert( "Welcome to SnarkyBot tic-tac-toe!" );

// Program loops while user wants to continue playing
while( true ) {
 
    var players = prompt(snarkyComment +"Would you like to play "+
                         "a (1) or (2) " + "player game?");
    snarkyComment = "";
    
    // Check to see if user wants to play a 2 player game
    if( players.substring(0,1) === "2" ){
        if( twoPlayers() ){
            continue;
        }
        else{
            break;
        }
    }
    else if( players.substring(0,1) === "1" ){;}
    else{
        snarkyComment = "If you can't answer this, maybe you "
                    + "shouldn't be playing!  Try again!\n\n";
        continue;
    }
        
    var wrongCounter = 0;
    
    // Choose diffuculty
    while( true ){
        difficulty = prompt( "Please choose (E)asy, (H)ard, or " +
                      "(I)mpossible difficulty");
        if( difficulty.substring(0,1).toUpperCase() === "E" ){
            difficulty = "E";
            break;
        }
        else if( difficulty.substring(0,1).toUpperCase() === "H"){
            difficulty = "H";
            break;
        }
        else if( difficulty.substring(0,1).toUpperCase() === "I"){
            difficulty = "I";
            break;
        }
        else{
            if( wrongCounter > 1 ){
                alert( "I'm tired of you screwing around human." +
                            " Impossible it is!");
                difficulty = "I";
                break;
                
            }
            wrongCounter++;
            alert( "Human, your inabiltiy to follow simple " +
                      "directions is maddening.  Try again!" );
        }
    }

    // Flip a coin to see who goes first
    if( Math.floor( Math.random()*2 ) === 0 ){
        alert("You have suffered a stunning coinflip defeat, will"
              + " be Os, and go last." );
        compLetter = "X";
        player1Letter = "O";
        turn = "X";
    }
    else{
        alert( "Inconceivable!  You have beaten me at " +
           "flipping a coin, will be Xs, and go first!");
        compLetter = "O";
        player1Letter = "X";
        turn = "X";
    }

    var inn = "";

    while( isNotFull(aa) ){
        if( turn === player1Letter ){
            inn = prompt( printGo(player1Letter) ); 
            if( playerChoice( inn, player1Letter ) === false ){
                continue;
            }
        }
        else{
            if( difficulty === "E" ){
                aa = computerChoiceEasy( aa );
            }
            else if( difficulty === "H" ){
                aa = computerChoiceHard( aa );
            }
            else{
                aa = computerChoiceImpossible( aa );
            }
        }
    
        inn = isWin(aa);
    
        if( inn === "X" ){
            if( "X" === compLetter ){
                compWin();
            }
            else{
                playerWin();      
            }
            aWin = true;
            break;
        }
    
        if( inn === "O" ){
            if( "O" === compLetter ){
                compWin();
            }
            else{
                playerWin();      
            }
            aWin = true;
            break;
        }
        swapTurns();
    }

    // If there is a tie    
    if( aWin === false ){
        alert( "A tie?!  You've got " + 
               "to be kidding me!\n" + printBoard( aa ) );
    }
    else{
        aWin = false;
    }
              
    var playAgain = prompt("Would you like to play again? (Y/N)");
        
    // See if user wants to play again
    if( playAgain.substring(0,1).toUpperCase() === "Y" ){
        aa = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
        continue;
    }
    else if(playAgain.substring(0,1).toUpperCase() === "N"){
        alert( "Scared I see.  Well muster up some courage and" +
                             " maybe I'll see you soon!");
        break;
    }
    else{
        alert( "I'll take that as a no.  See you next time, " +
                             "inept human!");
        break;
    } 
}