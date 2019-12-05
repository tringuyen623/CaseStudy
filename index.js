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
        hide('operators');
        hide('inCorrect');
        document.getElementById('startReset').innerHTML = 'Chơi lại';
        startCountDown();
        generateQA();
    }
}

let clickAnswer = document.getElementById('choices');
clickAnswer.addEventListener('click', (e) => {
    const { target } = e;
    let a = target;
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
            document.getElementById('gameOver').innerHTML = `<p>Kết thúc!</p><p>Điểm của bạn là: ${score}!`;
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
            document.getElementById('gameOver').innerHTML = `<p>Kết thúc!</p><p>Điểm của bạn là: ${score}!`;
            hide('timeRemaining');
            hide('correct');
            hide('inCorrect');
            // document.getElementById('startReset').innerHTML = 'Chơi lại';
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
    let x = Math.floor(Math.random() * 10 + 1);
    let y = Math.floor(Math.random() * 10 + 1);
    let ops = document.getElementById('operators').value;
    switch (ops) {
        case 'plus': document.getElementById('question').innerHTML = `${x} + ${y}`;
            correctAnswer = x + y;
            break;

        case 'minus':
            do {
                x = Math.floor(Math.random() * 10 + 1);
                y = Math.floor(Math.random() * 10 + 1);
            } while (x < y)
            document.getElementById('question').innerHTML = `${x} - ${y}`;
            correctAnswer = x - y;
            break;

        case 'multiply': document.getElementById('question').innerHTML = `${x} x ${y}`;
            correctAnswer = x * y;
            break;

        case 'divide':
            do {
                x = Math.floor(Math.random() * 10 + 10);
                y = Math.floor(Math.random() * 10 + 1);
            } while (x % y !== 0 || x < y)
            document.getElementById('question').innerHTML = `${x} : ${y}`;
            correctAnswer = x / y;
            break;
    }

    let correctPosition = Math.floor(Math.random() * 3 + 1);
    document.getElementById(`box${correctPosition}`).innerHTML = correctAnswer;
    let answers = [correctAnswer];

    for (let i = 1; i < 5; i++) {
        if (i !== correctPosition) {

            let incorrectAnswer;
            do {
                switch (ops) {
                    case 'plus':
                        incorrectAnswer = (Math.floor(Math.random() * 10 + 1)) + (Math.floor(Math.random() * 10 + 1));
                        break;

                    case 'minus':
                        do {
                            x = Math.floor(Math.random() * 10 + 1);
                            y = Math.floor(Math.random() * 10 + 1);
                        } while (x < y)
                        incorrectAnswer = (Math.floor(Math.random() * 10 + 1)) - (Math.floor(Math.random() * 10 + 1));
                        break;

                    case 'multiply': 
                    incorrectAnswer = (Math.floor(Math.random() * 10 + 1)) * (Math.floor(Math.random() * 10 + 1));
                        break;

                    case 'divide':
                        do {
                            x = Math.floor(Math.random() * 10 + 10);
                            y = Math.floor(Math.random() * 10 + 1);
                        } while (x % y !== 0 || x < y)
                        incorrectAnswer = (Math.floor(Math.random() * 10 + 1)) / (Math.floor(Math.random() * 10 + 1));
                        break;
                }

            } while (answers.indexOf(incorrectAnswer) > -1);
            document.getElementById(`box${i}`).innerHTML = incorrectAnswer;
            answers.push(incorrectAnswer);
        }
    }
}

