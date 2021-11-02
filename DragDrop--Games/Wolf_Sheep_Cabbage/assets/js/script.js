let movePos = 0;
let currentObject;
let boatArr = [];
let shoreOtherSide = [];
let changeZone = 0;
const sheep = "./assets/images/sheep__head.png";
const wolf = "./assets/images/wolf_head2.png";
const cabbage = "./assets/images/cabbage.png";
let shoreArr = [sheep, wolf, cabbage];
window.onload = () => {
    startMenu();
    console.log(shoreArr)
}

function startMenu() {
    const button = document.createElement("button")
    button.classList.add("startButton")
    button.textContent = "START"
    button.addEventListener('click', gameStart);
    document.body.appendChild(button)
    const imgBox = document.createElement("div");
    imgBox.classList.add("img--box")
    const imgWolf = document.createElement("img");
    imgWolf.src = "./assets/images/wolf__image.png";
    const imgSheep = document.createElement("img");
    imgSheep.src = "./assets/images/sheep__image.png";
    const imgCabbage = document.createElement("img");
    imgCabbage.src = "./assets/images/cabbage.png";
    imgBox.appendChild(imgWolf);
    imgBox.appendChild(imgSheep);
    imgBox.appendChild(imgCabbage);
    document.body.appendChild(imgBox);
}


function gameStart() {
    document.body.innerHTML = "";
    audioCreator();
    gameScene();
}

function gameScene() {
    //Shore 1
    elementCreator("shore1");
    //River
    elementCreator("river");
    CreateBoat();
    createMoveArrows();
    //Shore 2
    elementCreator("shore2");
    addAnimals();

}

function elementCreator(className) {
    const ele = document.createElement("div")
    ele.classList.add(className);
    document.body.appendChild(ele);
}

function CreateBoat() {
    const boat = document.createElement("div");
    boat.classList.add("boat")
    document.querySelector(".river").appendChild(boat);
    boat.addEventListener('dragover', function(e) {
        e.preventDefault()
        boat.classList.add("onDrag");
    })
    boat.addEventListener('dragleave', function() {
        boat.classList.remove("onDrag");
    })
    boat.addEventListener('drop', function(e) {
        e.preventDefault();
        console.log(shoreArr)
        boat.classList.remove("onDrag");
        currentObject.classList.remove("hide");
        if (boatArr.length === 0) {
            boat.appendChild(currentObject);
            boatArr.push(currentObject);
            checkGame();
        }

    })
}

function checkGame() {
    if (boatArr.includes(document.querySelector(".cabbage")) && (shoreArr.includes(sheep) && shoreArr.includes(wolf))) {
        modalWindow(`WOLF ATE THE SHIP!
        Click to restart.`)
        PlaySoundWolfAte();
        setTimeout(() => {
            PlaySoundSheepAte();

        }, 2000)

    } else if (boatArr.includes(document.querySelector(".wolf")) && (shoreArr.includes(sheep) && shoreArr.includes(cabbage))) {
        modalWindow(`SHEEP ATE THE CABBAGES!
        Click to restart.`)
        PlaySoundEating();
    }

}

function checkShore1() {
    if (shoreOtherSide.length == 2 && ((shoreOtherSide.includes(document.querySelector(".sheep")) && shoreOtherSide.includes(document.querySelector(".wolf"))))) {
        modalWindow(`WOLF ATE THE SHIP!
        Click to restart.`)
        PlaySoundWolfAte();
        setTimeout(() => {
            PlaySoundSheepAte();

        }, 2000)
    } else if (shoreOtherSide.length == 2 && ((shoreOtherSide.includes(document.querySelector(".sheep")) && shoreOtherSide.includes(document.querySelector(".cabbage"))))) {
        modalWindow(`SHEEP ATE THE CABBAGES!
        Click to restart.`)
        PlaySoundEating();
    } else if (shoreOtherSide.length === 3) {
        modalWindow(`HEEYY! YOU HAVE DONE IT!
        Click to restart.`)
        PlaySoundVictory();
    }
}

function createMoveArrows() {
    //Move boat up
    const buttonMoveUp = document.createElement("button");
    buttonMoveUp.textContent = "↑";
    buttonMoveUp.classList.add("moveUp")
    buttonMoveUp.addEventListener('click', moveBoatUp)
        //Move boat down
    const buttonMoveDown = document.createElement("button");
    buttonMoveDown.textContent = "↓";
    buttonMoveDown.classList.add("moveDown")
    buttonMoveDown.addEventListener('click', moveBoatDown)
    document.querySelector(".river").appendChild(buttonMoveUp);
    document.querySelector(".river").appendChild(buttonMoveDown);

}

function moveBoatUp() {
    const boat = document.querySelector(".boat")
    boat.classList.add("moveUpAnimation");
    boat.classList.remove("moveDownAnimation");
}

function moveBoatDown() {
    const boat = document.querySelector(".boat")
    boat.classList.add("moveDownAnimation");
    boat.classList.remove("moveUpAnimation");
}

function addAnimals() {
    //Get Shores
    const shore2 = document.querySelector(".shore2");
    const shore1 = document.querySelector(".shore1");
    //Changing zone for animals
    const changeZone1 = document.createElement("div");
    changeZone1.classList.add("change--zone");
    changeZone1.textContent = "Change Zone";
    changeZone1.addEventListener('dragover', function(e) {
        e.preventDefault()
        if (boatArr.length == 1) {
            changeZone1.classList.add("onDrag");
        }
    })
    changeZone1.addEventListener('dragleave', function() {
        changeZone1.classList.remove("onDrag");

    })
    changeZone1.addEventListener('drop', function(e) {
        e.preventDefault();
        if (boatArr.length == 1) {
            changeZone1.classList.remove("onDrag");
            currentObject.classList.remove("hide");

            changeZone1.appendChild(currentObject);
            boatArr.pop();
            shoreOtherSide = shoreOtherSide.filter(el => el.getAttribute('src') != currentObject.getAttribute('src'))
            shoreArr = shoreArr.filter(el => el != currentObject.getAttribute('src'))
            changeZone++;

        }


    })
    changeZone1.setAttribute('draggable', false);

    shore1.appendChild(changeZone1);
    const changeZone2 = document.createElement("div");

    changeZone2.classList.add("change--zone2");
    changeZone2.textContent = "Change Zone";
    changeZone2.addEventListener('dragover', function(e) {
        e.preventDefault()
        if (boatArr.length == 1) {
            changeZone2.classList.add("onDrag");
        }
    })
    changeZone2.addEventListener('dragleave', function() {
        changeZone2.classList.remove("onDrag");

    })
    changeZone2.addEventListener('drop', function(e) {
        e.preventDefault();
        if (boatArr.length == 1) {
            changeZone2.classList.remove("onDrag");
            currentObject.classList.remove("hide");

            changeZone2.appendChild(currentObject);
            boatArr.pop();
            shoreArr = shoreArr.filter(el => el != currentObject.getAttribute('src'))
            shoreOtherSide = shoreOtherSide.filter(el => el.getAttribute('src') != currentObject.getAttribute('src'))
            changeZone++;

        }


    })

    shore2.appendChild(changeZone2);

    //Creating animals and adding them to shore2
    const sheep = document.createElement("img");
    sheep.src = "./assets/images/sheep__head.png";
    sheep.classList.add("sheep")
    const wolf = document.createElement("img");
    wolf.src = "./assets/images/wolf_head2.png";
    wolf.classList.add("wolf")

    const cabbage = document.createElement("img");
    cabbage.src = "./assets/images/cabbage.png";
    cabbage.classList.add("cabbage")

    shore2.appendChild(wolf);
    shore2.appendChild(sheep);
    shore2.appendChild(cabbage);
    console.log(document.querySelector(".change--zone2"));
    [...shore2.children].forEach(el => {
        if (el != document.querySelector(".change--zone2")) {
            el.addEventListener('dragstart', function() {
                currentObject = el;
                shoreArr = shoreArr.filter(el => el != currentObject.getAttribute('src'))
                setTimeout(() => {
                    el.classList.add("hide");
                }, 0)
            })
            el.addEventListener('dragend', function() {
                if (boatArr.length >= 0) {
                    el.classList.remove("hide");

                }
            })
        }


    })
    changeZone2.setAttribute('draggable', false);

    Array.from(shore1.children).forEach(el => {
        if (el != document.querySelector(".change--zone")) {
            el.addEventListener('dragstart', function() {
                currentObject = el;
                shoreOtherSide = shoreOtherSide.filter(el => el != currentObject.getAttribute('src'))
                setTimeout(() => {
                    el.classList.add("hide");
                }, 0)
            })
            el.addEventListener('dragend', function() {
                if (boatArr.length >= 0) {
                    el.classList.remove("hide");
                }
            })
        }

    })
    Array.from(changeZone1.children).forEach(el => {
        el.addEventListener('dragstart', function() {
            currentObject = el.firstChild;
            shoreOtherSide = shoreOtherSide.filter(el => el != currentObject.getAttribute('src'))
            setTimeout(() => {
                el.firstChild.classList.add("hide");
            }, 0)
        })
        el.addEventListener('dragend', function() {
            if (boatArr.length === 1) {
                el.firstChild.classList.remove("hide");
            }
        })
    })
    Array.from(changeZone2.children).forEach(el => {
        el.addEventListener('dragstart', function() {
            currentObject = el.firstElementChild;
            shoreArr = shoreArr.filter(el => el != currentObject.getAttribute('src'))
            setTimeout(() => {
                el.classList.add("hide");

            }, 0)
        })
        el.addEventListener('dragend', function() {
            if (boatArr.length === 1) {
                el.remove("hide");
            }
        })
    })
    shore1.addEventListener('dragover', function(e) {
        e.preventDefault()
        if (boatArr.length == 1 || changeZone > 0) {
            shore1.classList.add("onDrag");
        }
    })
    shore1.addEventListener('dragleave', function() {
        shore1.classList.remove("onDrag");

    })
    shore1.addEventListener('drop', function(e) {
        e.preventDefault();
        if (boatArr.length == 1 || changeZone > 0) {
            shore1.classList.remove("onDrag");
            currentObject.classList.remove("hide");
            if (boatArr.length === 1) {
                shore1.appendChild(currentObject);
                shoreOtherSide.push(currentObject);
                boatArr.pop();
                shoreArr = shoreArr.filter(el => el != currentObject.getAttribute('src'))
                checkShore1();
            }
        }


    })

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

function audioCreator() {
    const wolfSound = document.createElement("audio");
    wolfSound.setAttribute("src", "./assets/music/wolf.mp3")
    wolfSound.setAttribute("id", "wolfSound");
    document.body.appendChild(wolfSound)

    const sheepSound = document.createElement("audio");
    sheepSound.setAttribute("src", "./assets/music/sheep.mp4")
    sheepSound.setAttribute("id", "sheepSound");
    document.body.appendChild(sheepSound)

    const eatingSound = document.createElement("audio");
    eatingSound.setAttribute("src", "./assets/music/eating.mp4")
    eatingSound.setAttribute("id", "eatingSound");
    document.body.appendChild(eatingSound)

    const victory = document.createElement("audio");
    victory.setAttribute("src", "./assets/music/victory.mp4")
    victory.setAttribute("id", "victory");
    document.body.appendChild(victory)
}