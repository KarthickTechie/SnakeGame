/*

    index.js this is a core logic script 
    handles player positioning and actions like transit by keyboard event etc

*/

// Matrix data struture to lay the playground

const ground = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
const totalCol = ground[0].length;
const totRow = ground.length;
let cells = undefined;

document.addEventListener("keydown", (e) => {
  onKeyPress(e.key);
});

/* track the predator , predator.length will return predator size */
let predator = [];

/*
prey object will have property like x and y - x - position of x
y- position of y 

*/
let prey = {};

/* 
Object datastructure to keep all the possible configuratio of the game
*/

const gameConfig = {
  predatorInitialPosition: { x: 3, y: 0 },
  preyInitialPosition: { x: 3, y: 4 },
  predatorColor: "red",
  preyColor: "green",
  resetColor: "transparent",
  autoPredatorMovement: false,
};

const playground = document.getElementById("playground");

for (let i = 0; i < ground.length; i++) {
  for (let j = 0; j < ground[i].length; j++) {
    const cell = document.createElement("div");
    cell.classList = "cell";
    cell.id = `cell${ground[i][j]}`;
    cell.innerText = `${ground[i][j]}`;
    playground.appendChild(cell);
  }
  if (i == ground.length - 1) {
    gameInit();
  }
}

/* 
 gameInit function initiate the game and call multiple functions 
 
*/

function gameInit() {
  setPosition(
    gameConfig.preyInitialPosition.x,
    gameConfig.preyInitialPosition.y,
    "prey"
  );
  setPosition(
    gameConfig.predatorInitialPosition.x,
    gameConfig.predatorInitialPosition.y,
    "predator"
  );
  cells = document.querySelectorAll(".cell");
}

/* 
    this functio nset the positon of prey and predator passing the position coordinates x , y and type of 
    player
*/
function setPosition(x, y, player) {
  if (player == "prey") {
    const el = queryCell(x, y);
    el.classList.add("prey");
    prey = { x, y, el };
  } else {
    const el = queryCell(x, y);
    predator.push({ x, y, el });
    predator.forEach((c) => {
      c.el.classList.add("predator");
    });
  }
}

/*

function handles movement of the predator head

*/
function setMovement() {
  /*
    removing the class predator and adding the class predator 
    gives the visualization of cell movement
  */
  newResetLogic();
  /*
below code is commented for the implementation of better logic
  */
  //const { x, y, el } = predator[0];
  //let headCurrentPosition = y;
  /*
  if (gameConfig.autoPredatorMovement) {
    // logic that enables  auto transition of predator head
    do {
      autoTransition(x, headCurrentPosition);
      headCurrentPosition++;

      // test(x,headCurrentPosition)
    } while (
      // predator head transit through ground column's while head.y < ground[x].length
      // if head.y reaches ground[x].length then reset head.y to 0
      headCurrentPosition < ground[x].length
    );
  } else {
    // transition of predator head reactive to keyboard event
    //resetCell(x, y, "predator");
    //queryCell(x, y).style.backgroundColor = gameConfig.predatorColor;
  }
  */
}

// function  that handles auto transition

function autoTransition(_x, _y) {
  setTimeout(() => {
    resetCell(_x, _y, "predator");
    queryCell(_x, _y).style.backgroundColor = gameConfig.predatorColor;
    if (_y >= ground[_x].length - 1) {
      console.log("reaches end", ground[_x].length, _y);
      setMovement();
    }
  }, _y * 1000);
}

function queryCell(x, y) {
  return document.getElementById(`cell${ground[x][y]}`);
}

function resetCell(x, y, player) {
  if (player == "predator") {
    const prevCell = y == predator.length || y == predator.length - 1 ? y : y;
    console.log(`resetting cell ${x},${prevCell} ---> ${predator.length}`);
    queryCell(x, prevCell).style.backgroundColor = gameConfig.resetColor;
  } else {
    queryCell(x, y).style.backgroundColor = gameConfig.resetColor;
  }
}

function paintCell(x, y, i) {
  const newEl = queryCell(x, y);
  newEl.style.backgroundColor = gameConfig.predatorColor;
  predator[i] = { x, y, el: newEl };
}

/*
keypress handler function
*/

function onKeyPress(key) {
  switch (key) {
    case "ArrowUp":
      break;

    case "ArrowDown":
      break;

    case "ArrowLeft":
      break;

    case "ArrowRight":
      console.log(key);
      moveRight();
      break;
  }
}

/*
handler function for moving the predator head to Right 
set the predator array object  
*/

function moveRight() {
  predator.map((p) => {
    if (p.y < totalCol - 1) {
      p.y = p.y + 1;
      p.el = queryCell(p.x, p.y);
    } else {
      p.y = p.y - (totalCol - 1);
      p.el = queryCell(p.x, p.y);
    }
  });
  newResetLogic();
  checkForPrey();
}

function checkForPrey() {
  if (predator[0].el.id == prey.el.id) {
    prey.el.classList.remove("prey");
    catchThePrey();
  } else {
    return;
  }
}

/*

handler function that catch the prey when predator head meets the prey cell
when it reached the prey cell then the predator array grows 
once the prey has caught then the new prey position itself to new cell / random cell

*/

function catchThePrey() {
  predator.unshift(prey);
  predator[predator.length - 1] = {
    x: prey.x,
    y: prey.y - 1,
    el: queryCell(prey.x, prey.y - 1),
  };
  newResetLogic();

  goToNextCell_Prey();
}

/*

function that reset once the prey has caught then the new prey position itself to new cell / random cell

*/

function goToNextCell_Prey() {
  setPosition(0, 0, "prey");
}

function newResetLogic() {
  console.log(predator);
  cells.forEach((c) => {
    c.classList.remove("predator");
  });
  predator.forEach((p) => {
    cells.forEach((c) => {
      if (c.id == p.el.id) {
        c.classList.add("predator");
      }
    });
  });
}
