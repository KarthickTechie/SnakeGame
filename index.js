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
const totalRow = totalCol;
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
const APP_CONSTANTS = {
  predator: "predator",
  prey: "prey",
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
};
const gameConfig = {
  predatorInitialPosition: { x: 3, y: 0 },
  preyInitialPosition: { x: 3, y: 4 },
  predatorColor: "red",
  preyColor: "green",
  resetColor: "transparent",
  autoPredatorMovement: false,
  keyPressed: "",
  keyPressCountInit: 0,
};

/*
object to keep count  of keypress/direction 
each count will be reset to 0 on another direction keypress event 
if ArrowUp key pressed directionCounter.up++ 
if ArrowRight key pressed directionCounter.right++ other props will be reset to 0
*/
let directionCounter = {
  [APP_CONSTANTS.ArrowUp]: 0,
  [APP_CONSTANTS.ArrowRight]: 0,
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
    APP_CONSTANTS.prey
  );
  setPosition(
    gameConfig.predatorInitialPosition.x,
    gameConfig.predatorInitialPosition.y,
    APP_CONSTANTS.predator
  );
  cells = document.querySelectorAll(".cell");
}

/* 
    this functio nset the positon of prey and predator passing the position coordinates x , y and type of 
    player
*/
function setPosition(x, y, player) {
  if (player == APP_CONSTANTS.prey) {
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
    resetCell(_x, _y, APP_CONSTANTS.predator);
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
  if (player == APP_CONSTANTS.predator) {
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
    case APP_CONSTANTS.ArrowUp:
      console.log(key);
      gameConfig.keyPressed = key;
      moveUp();
      break;

    case "ArrowDown":
      break;

    case "ArrowLeft":
      break;

    case APP_CONSTANTS.ArrowRight:
      console.log(key);
      gameConfig.keyPressed = key;
      moveRight();
      break;
  }
}

/*
handler function for moving the predator head to Right 
to make  cursor x,y = 3,0 to move right make y++ so 3,1 will move right to 1 cell
*/

function moveRight() {
  predator.map((p, index) => {
    if (index == 0) {
      if (p.y < totalCol - 1) {
        p.y = p.y + 1;
        p.el = queryCell(p.x, p.y);
      } else {
        p.y = p.y - (totalCol - 1);
        p.el = queryCell(p.x, p.y);
      }
    } else {
      if (predator[0].x == p.x) {
        //  when the body cell also align horizontally
        // increment y to y+1 only till y < totalCol-1
        if (p.y < totalCol - 1) {
          p.y = p.y + 1;
          p.el = queryCell(p.x, p.y);
        } else {
          p.y = totalCol - 1 - p.y;
          p.el = queryCell(p.x, p.y);
        }
      } else {
        p.x = p.x - 1;
        p.el = queryCell(p.x, p.y);
      }
    }
  });
  newResetLogic();
  checkForPrey();
}

/*
handler function for moving the predator head to top on arrow up keypress 
to make  cursor x,y = 3,0 to move right make y++ so 3,1 will move right to 1 cell
to make cursor x,y = 3,0 to move up make x-- so 2,0 will move up to 1 cell

when moveUp check the x value , it must be x< totalRow-1

when [n] squares are horizontal , moveup should moveup the head 
[3,0] -> [3,1] -> [3,2] 

when ArrowUp pressed 
  
$ev↑ = [3,1] -> [3,2] -> [2,2] 
$ev↑ = [3,0] -> [2,1] -> [1,2] 
*/

function moveUp() {
  predator.map((p, index) => {
    if (index == 0) {
      // transit of predator head
      if (p.x > 0) {
        p.x = p.x - 1;
        p.el = queryCell(p.x, p.y);
      } else {
        p.x = totRow - 1 - p.x;
        p.el = queryCell(p.x, p.y);
      }
    } else {
      // transit of predator body
      if (predator[0].y == p.y) {
        // when the body cell also align vertically
        if (p.x > 0) {
          // predator body cell reaches the first row
          p.x = p.x - 1;
          p.el = queryCell(p.x, p.y);
        } else {
          p.x = totRow - 1 - p.x;
          p.el = queryCell(p.x, p.y);
        }
      } else {
        p.y = p.y + 1;
        p.el = queryCell(p.x, p.y);
      }
    }
  });
  newResetLogic();
  checkForPrey();
}

function checkForPrey() {
  if (predator[0].el.id == prey.el.id) {
    prey.el.classList.remove(APP_CONSTANTS.prey);
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
  const lastCell = predator[predator.length - 1];
  let _x = 0;
  let _y = 0;
  let newLastCell = {};
  switch (gameConfig.keyPressed) {
    case APP_CONSTANTS.ArrowUp:
      _x =
        lastCell.x == 0 || lastCell.x == predator.length - 1
          ? 0
          : lastCell.x - 1;
      _y = lastCell.y;
      newLastCell = {
        x: _x,
        y: _y,
        el: queryCell(_x, _y),
      };

      predator = [...predator, newLastCell];
      break;

    case APP_CONSTANTS.ArrowRight:
      _x = lastCell.x;
      _y = lastCell.y == 0 || lastCell.y == 0 ? lastCell.y : lastCell.y - 1;
      newLastCell = {
        x: _x,
        y: _y,
        el: queryCell(_x, _y),
      };

      predator = [...predator, newLastCell];
      console.log(predator);
      break;
  }

  newResetLogic();

  goToNextCell_Prey();
}

/*

function that reset once the prey has caught then the new prey position itself to new cell / random cell

*/

function goToNextCell_Prey() {
  let numX = Math.floor(Math.random() * 10);
  let numY = Math.floor(Math.random() * 10);
  numX = numX > totRow ? 10 - numX : numX;
  numY = numY > totalCol ? 10 - numY : numY;
  setPosition(numX, numY, APP_CONSTANTS.prey);
}

function newResetLogic() {
  console.log(predator);
  cells.forEach((c) => {
    c.classList.remove(APP_CONSTANTS.predator);
  });
  predator.forEach((p) => {
    cells.forEach((c) => {
      if (c.id == p.el.id) {
        c.classList.add(APP_CONSTANTS.predator);
      }
    });
  });
}
