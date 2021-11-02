let startButton;
let grid;
let guessBox;
let cellArr = [];
let guessArr = [];
let resultArr = [];
let endGame = false;
let time = 0;
let val;

window.onload = () => {
    grid = document.querySelector(".grid");
    guessBox = document.querySelector(".guess-box");
    startButton = document.querySelector(".startButton");
    startButton.addEventListener('click', gameStart);

}


function gameStart() {
    startButton.classList.add("hide");
    cellArr = document.querySelectorAll('.cell');
    cellArr.forEach(el => {
        el.setAttribute("draggable", "true");
        el.addEventListener("dragstart", function() {
            if (el.textConten != "") {
                val = el.textContent;
            }
        })
        el.addEventListener('dragover', function(e) {
            e.preventDefault();
            el.classList.add("dropping");
        });
        el.addEventListener('dragleave', function(e) {
            el.classList.remove("dropping");
        })
        el.addEventListener('drop', function(e) {
            el.classList.remove("dropping");
            el.textContent = val;
        })

    })
    fillCell(cellArr);
    setTimeout(() => {
        startNow()
        startTimer();
        testResultButton()

    }, 3000);

    console.log(resultArr);

}

function startNow() {
    guessBox.classList.remove("hide");
    guessArr = document.querySelectorAll(".guess");
    guessArr.forEach(el => {
        el.setAttribute("draggable", "true")
        el.addEventListener("dragstart", function() {
            val = el.textContent;
        })
    })
    for (let i = 0; i < cellArr.length; i++) {
        cellArr[i].textContent = "";
    }
}

function testResultButton() {
    testButton = document.createElement("button");
    testButton.classList.add("testButton");
    testButton.textContent = "CHECK"
    testButton.addEventListener('click', winCheck);
    document.body.appendChild(testButton)
}

function fillCell(cellArray) {
    for (let i = 0; i < cellArray.length; i++) {
        cellArray[i].textContent = Math.floor(Math.random() * 8 + 1);
        resultArr.push(cellArray[i].textContent);
    }
}

function winCheck() {
    let counter = 0;
    for (let i = 0; i < resultArr.length; i++) {
        if (Number(resultArr[i]) === Number(cellArr[i].textContent)) {
            counter++;
        }
    }
    if (counter == 9) {
        endGame = true;
        cellArr.forEach(el => el.classList.add("won"));
        modalWindow(`You WON!
                    Click to play again!`);
    } else {
        cellArr.forEach(el => el.classList.add("red"));
        grid.classList.add("rotate");
        setTimeout(() => {
            cellArr.forEach(el => el.classList.remove("red"));
            grid.classList.remove("rotate");
        }, 500)
    }
}

function modalWindow(text) {
    const modal = document.createElement("div");
    modal.classList.add("modal")
    const modalText = document.createElement("p");
    modalText.classList.add("modal--text")
    modalText.textContent = text;
    modal.appendChild(modalText);
    document.body.appendChild(modal);
    modal.addEventListener('click', function() {
        window.location.reload();
    })
}

function startTimer() {
    const timer = document.createElement("div");
    timer.classList.add("timer");
    document.body.appendChild(timer);
    setInterval(() => {
        if (!endGame) {
            timer.textContent = time;
            time++;
        }
    }, 1000);
}