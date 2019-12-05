let playing = false;
let score;
let action;
let timeRemaining;
let correctAnswer;

document.getElementById('startReset').onclick = function () {
    if (playing === true) {
        location.reload();
    } else {
        playing = true;
        score = 0;

        document.getElementById('scoreValue').innerHTML = score;

        show('timeRemaining');
        timeRemaining = 5;
        document.getElementById('timeRemainingValue').innerHTML = timeRemaining;
        hide('gameOver');

        document.getElementById('startReset').innerHTML = 'Reset Game';

        startCountDown();

        generateQA();


    }
}

let clickAnswer = document.getElementById('choices');
clickAnswer.addEventListener('click', (e) => {
    const { target } = e;
    let a = target;
    console.log(a.innerHTML)
    if (playing === true) {
        if (a.innerHTML == correctAnswer) {
            score++;
            document.getElementById('scoreValue').innerHTML = score;
            hide('inCorrect');
            show('correct');
            setTimeout(() => {
                hide('correct');
            }, 1000)
            generateQA();
            timeRemaining = 5;


        } else {
            stopCountDown();
            playing = false;
            show('gameOver');
            document.getElementById('gameOver').innerHTML = `<p>Game over!</p><p>Your score is ${score}!`;
            hide('timeRemaining');
            hide('correct');
            show('inCorrect');
        }
    }
})

const startCountDown = () => {
    action = setInterval(() => {
        timeRemaining -= 1;
        document.getElementById('timeRemainingValue').innerHTML = timeRemaining;
        if (timeRemaining === 0) {
            stopCountDown();
            playing = false;
            show('gameOver');
            document.getElementById('gameOver').innerHTML = `<p>Game over!</p><p>Your score is ${score}!`;
            hide('timeRemaining');
            hide('correct');
            hide('inCorrect');
            document.getElementById('startReset').innerHTML = 'Start Game';
        }
    }, 1000)
}

const stopCountDown = () => {
    clearInterval(action);
}

const show = (id) => {
    document.getElementById(id).style.display = 'block';
}
const hide = (id) => {
    document.getElementById(id).style.display = 'none';
}


const generateQA = () => {
    let level;
    if (score <= 10) {
        level = 1;
    } else {
        level = 10;
    }
    let x = Math.floor(Math.random() * 10 + level);
    let y = Math.floor(Math.random() * 10 + level);

    let ops = ['+', '-', 'x', ':'];
    let opsIndex = Math.floor(Math.random() * ops.length);

    switch (opsIndex) {
        case 0: document.getElementById('question').innerHTML = `${x} + ${y}`;
            correctAnswer = x + y;
            break;

        case 1: document.getElementById('question').innerHTML = `${x} - ${y}`;
            correctAnswer = x - y;
            break;

        case 2: document.getElementById('question').innerHTML = `${x} x ${y}`;
            correctAnswer = x * y;
            break;

        case 3: document.getElementById('question').innerHTML = `${x} : ${y}`;
            if (x === y) {
                correctAnswer = (x / y);
            } else {
                correctAnswer = (x / y).toFixed(2);
            }
            break;
    }

    let correctPosition = Math.floor(Math.random() * 3 + 1);
    document.getElementById(`box${correctPosition}`).innerHTML = correctAnswer;

    let answers = [correctAnswer];

    for (let i = 1; i < 5; i++) {
        if (i !== correctPosition) {

            let incorrectAnswer;
            do {
                incorrectAnswer = (Math.floor(Math.random() * 10 + level)) * (Math.floor(Math.random() * 10 + level));
            } while (answers.indexOf(incorrectAnswer) > -1);
            document.getElementById(`box${i}`).innerHTML = incorrectAnswer;
            answers.push(incorrectAnswer);
        }
    }
}

