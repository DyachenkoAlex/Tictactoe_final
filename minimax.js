function bestMove() {
    let bestScore = -Infinity;
    let move;
    // Check all posible variations
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Checking spot availability
        if (board[i][j] == '') {
          board[i][j] = ai;
        // Calling minimax function to create tree of all possible veariations and classify them
          let score = minimax(board, 0, false);
          board[i][j] = '';
          // Choose best option for next move
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    board[move.i][move.j] = ai;
    currentPlayer = human;
  }
  
  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };
  
  function minimax(board, depth, isMaximizing) {
    // Check for win, tie, loss
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  
    // Different options for prediction human and ai move
    if (isMaximizing) {
      let bestScore = -Infinity;
      // Check all possible variations
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        // Checking spot availability
        if (board[i][j] == '') {
            board[i][j] = ai;
            // Calling minimax function to create tree of all possible veariations and classify them
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Checking spot availability
          if (board[i][j] == '') {
            board[i][j] = human;
            // Calling minimax function to create tree of all possible veariations and classify them
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  