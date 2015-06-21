$(document).ready(function() {

    var loop = [];
    var a = $(this).serializeArray();
    var currentGuess;
    var answer = 0
    var answerArr = [];
    var test = true;

    var numberOutp = function() {
        $('h3').text("Guesses so far: " + loop)

        if ((currentGuess < 1) || (currentGuess > 100)) {
            $('h2').text("Numbers between 1 and 100 only please!!");
            gameOver();
        } else if (currentGuess == answer) {
            $('h2').text("Well done!!");
        } else if (currentGuess <= (answer - 20)) {
            $('h2').text("Waaaay too cold! Go higher!");
            gameOver();
        } else if (currentGuess >= (answer + 20)) {
            $('h2').text("Noooooo... too high!!");
            gameOver();
        } else if (currentGuess <= (answer - 10)) {
            $('h2').text("Not too shabby... higher...");
            gameOver();
        } else if (currentGuess >= (answer + 10)) {
            $('h2').text("Getting there! Try lower...");
            gameOver();
        } else if (currentGuess < answer) {
            $('h2').text("Getting hotter! A little higher!");
            gameOver();
        } else if (currentGuess > answer) {
            $('h2').text("Getting hotter! A little lower!");
            gameOver();
        };

    };



    var emptyArr = function() {
        for (var i = 0; i < loop.length; i++) {
            loop.pop();
            return emptyArr()
        }
    }

    //animation 

    var winning = function(targetElement, speed) {

        $(targetElement).css({
            left: '-200px'
        });
        $(targetElement).animate({
            'left': $(document).width() + 200
        }, {
            duration: speed,
            complete: function() {
                winning(this, speed);
            }
        });

    };

    // number generator 

    var randomNum = function(min, max) {
        answer = Math.floor(Math.random() * (max - min + 1) + min);

    };

    // previous guess is the same notification

    var prevGuess = function(arr) {
        for (var i = 1; i < arr.length; i++) {
            if (currentGuess == Number(arr[i - 1])) {
                $('h2').text("You already tried " + currentGuess + "!")
                test = true;
                loop.pop();
                return true;
            } else
                test = false;
            return false;
        };
    };

    // attempts are used up

    var gameOver = function() {
        if (loop.length == 5) {
            $('h2').text("Game over! Better luck next time! Play again?");
            randomNum(1, 100);
            emptyArr();
            $('h3').empty();
            test = false;
            document.getElementById("guess").reset();
        }
    };

    randomNum(1, 100);

    // Submit button - checking guesses

    $(".subm-btn").click(function(event) {
        currentGuess = $('input').val();
        loop.push(currentGuess);

        if (test === true) {

            gameOver();
            prevGuess(loop);

            $('h3').text("Guesses so far: " + loop)

        } else if (test === false) {
            numberOutp();
        }
        document.getElementById("guess").reset();
        
    });

    // Play again button resetting game

    $(".plyagn-btn").click(function(event) {
        emptyArr();
        randomNum(1, 100);
        $('h2').text("OK.... Here we go!")
        $('h3').empty();
        test = false;
        document.getElementById("guess").reset();
    });

    // hint button

    $(".hintbtn").click(function(event) {
        $('h2').text("Why not try.. " + answer)
    });

    // button effects - just some fading

    $('p').on('click', function(event) {

        event.stopPropagation();

        $(this).closest('p').fadeOut();
        $(this).closest('p').fadeToggle();
    });



});
