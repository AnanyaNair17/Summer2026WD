let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
      };

      updateScoreElement();

      /*if(score===null){ //can also be written as if(!score)
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        }
      }*/
      let isAutoPlaying = false;
      let intervalId;

      function autoPlay(){
        if(!isAutoPlaying){
          intervalId = setInterval(() => { 
            const move = pickComputerMove();
            playGame(move);

          }, 1500);
          isAutoPlaying = true;
        }
        else{
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }

      document.querySelector('.js-rock-button')
        .addEventListener('click', () => {
          playGame('Rock');
        });
      
      document.querySelector('.js-paper-button')
        .addEventListener('click', () => {
          playGame('Paper');
        });
      
      document.querySelector('.js-scissors-button')
        .addEventListener('click', () => {
          playGame('Scissors');
        });

      document.body.addEventListener('keydown', () => {
        if(event.key==='r'){
          playGame('Rock');
        }
        else if(event.key==='p'){
          playGame('Paper');
        }
        else if(event.key==='s'){
          playGame('Scissors');
        }
      });

      function playGame(move){
        const computerMove = pickComputerMove();
        let result = '';

        if(move==='Rock'){
          if(computerMove==='Rock'){
            result = 'It is a Tie.';
          }
          else if(computerMove==='Paper'){
            result = 'You Lose.';
          }
          else{
            result = 'You Win.';
          }
        }
        else if(move==='Paper'){
          if(computerMove==='Paper'){
            result = 'It is a Tie.';
          }
          else if(computerMove==='Scissors'){
            result = 'You Lose.';
          }
          else{
            result = 'You Win.';
          }
        }
        else{
          if(computerMove==='Scissors'){
            result = 'It is a Tie.';
          }
          else if(computerMove==='Rock'){
            result = 'You Lose.';
          }
          else{
            result = 'You Win.';
          }
        }

        if(result==='You Win.'){
          score.wins += 1;
        }
        else if(result==='You Lose.'){
          score.losses += 1;
        }
        else{
          score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();
        document.querySelector('.js-result')
          .innerHTML = result;
        
        document.querySelector('.js-moves')
          .innerHTML =  `You
      <img src="rpc-emoji/${move}-emoji.png" class="play-button">
      <img src="rpc-emoji/${computerMove}-emoji.png" class="play-button">
      Computer`;

      }
      
      function updateScoreElement(){
        document.querySelector('.js-score')
          .innerHTML = `wins: ${score.wins}    losses: ${score.losses}     ties: ${score.ties}`;
      }

      function pickComputerMove(){
        const randomNumber = Math.random();
        let computerMove = '';
        if(randomNumber<1/3){
          computerMove = 'Rock';
        }
        else if(randomNumber>=1/3 && randomNumber<2/3){
          computerMove = 'Paper';
        }
        else{
          computerMove = 'Scissors';
        }
        return computerMove;
      }    