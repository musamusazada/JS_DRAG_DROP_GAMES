const introText = "Cute dog has been stuck in a tiny planet called Rouke24. Try to dodge viruses and reach the shelter ^^ Good luck soldier"
let i = 0;
let topPos = 100;
let leftPos = 100;
window.onload = () => {
    createStartbutton();
    createStoryAnimation();

}


//Creating the Start Button.
function createStartbutton() {
    const button = document.createElement("button");
    button.classList.add("startButton");
    button.textContent = "Start!";
    button.addEventListener('click', gameStart);
    document.body.appendChild(button);
}
//Creating animated intro text
function createStoryAnimation() {
    const animationBox = document.createElement("div");
    animationBox.classList.add("animation--box");
    const p = document.createElement("p");
    animationBox.appendChild(p)
    document.body.appendChild(animationBox)
    p.classList.add("animation--text");
    setInterval(() => {
        if (i < introText.length) {
            p.textContent += introText[i];
            i++;
        }
    }, 80);
    p.addEventListener('click', function() {
        p.textContent = introText;
        i = introText.length
    });
}

//Clearing the window and starting the game;
function gameStart() {
    document.body.innerHTML = ""
    audioCreator();
    document.body.classList.add("game--view");
    const player = document.createElement("div");
    player.classList.add("player");
    player.draggable = true;
    player.addEventListener('dragstart', function(e) {
        setTimeout(() => {
            player.classList.add("hide");
        }, 0)
    })
    player.addEventListener('dragend', function(e) {
        setTimeout(() => {
            player.classList.remove("hide");
        }, 0)
    })
    document.body.appendChild(player);
    createEnemies();
    createLeaveArea(player);
}


function createEnemies(player) {
    let posY;
    let posX;
    for (let i = 0; i < 90; i++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        posY = Math.random() * window.innerHeight - 220;
        posX = Math.random() * window.innerWidth;
        if ((posY > 100 && posY < window.innerHeight - 80)) {
            enemy.style.top = `${posY}px`
        }
        if (posX > 0 && posX < window.innerWidth - 100) {
            enemy.style.left = `${posX}px`
        }
        enemy.addEventListener('dragenter', gameOver)



        document.body.appendChild(enemy);

    }
}

function createLeaveArea(player) {
    const leaveArea = document.createElement("div")
    leaveArea.classList.add("leave--area");
    leaveArea.addEventListener('drop', function() {
        leaveArea.appendChild(player);
        player.classList.remove("hide");
        player.style.top = 0;
        player.style.bottom = 0;
        gameWin();

    })
    leaveArea.addEventListener('dragover', function(e) {
        e.preventDefault();
    })
    document.body.appendChild(leaveArea)
}

function audioCreator() {
    const loseSound = document.createElement("audio");
    loseSound.setAttribute("src", "./assets/music/loseSound.mp3")
    loseSound.setAttribute("id", "loseSound");
    document.body.appendChild(loseSound)

    const winSound = document.createElement("audio");
    winSound.setAttribute("src", "./assets/music/winSound.mp3")
    winSound.setAttribute("id", "winSound");
    document.body.appendChild(winSound)

}

function gameWin() {
    PlaySoundWin();
    modalWindow("YAYYYYY! DOGGO IS SAFE")

}

function gameOver() {
    //Play sound
    PlaySoundLose();
    //Create modal
    modalWindow("YOU LOST! DOGGO DIED")

}

function modalWindow(text) {
    const modal = document.createElement("div");
    modal.classList.add("modal")
    const modalText = document.createElement("p");
    modalText.classList.add("modal--text")
    modalText.textContent = text;
    const playAgain = document.createElement("button");
    playAgain.textContent = "Play Again!"
    playAgain.addEventListener('click', gameStart);
    playAgain.classList.add("replayButton")
    modal.appendChild(modalText);
    modal.appendChild(playAgain);
    document.body.appendChild(modal);
}