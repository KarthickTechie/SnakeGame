const ground = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
] 

/* track the predator , predator.length will return predator size */
const predator = [] 

/*
prey object will have property like x and y - x - position of x
y- position of y 

*/
let prey = {}  

const gameConfig = {
    predatorInitialPosition : {x:3,y:0},
    preyInitialPosition : {x:3,y:4},
    predatorColor:'red',
    preyColor:'green',

}

const playground = document.getElementById('playground')

for(let i=0;i<ground.length;i++){
    for(let j=0;j<ground[i].length;j++){
        const cell = document.createElement('div')
        cell.classList = 'cell'
        cell.id = `cell${ground[i][j]}`
        // cell.innerText = `${ground[i][j]}`
        playground.appendChild(cell)
    }
    if(i == ground.length-1){

        gameInit()
    }
}

function gameInit(){
    

       setPosition(gameConfig.preyInitialPosition.x,gameConfig.preyInitialPosition.y,'prey')
       setPosition(gameConfig.predatorInitialPosition.x,gameConfig.predatorInitialPosition.y,'predator')

}

function setPosition(x,y,player){

    if(player == 'prey'){
        const el = document.getElementById(`cell${ground[x][y]}`)
        el.style.backgroundColor=gameConfig.preyColor
        prey = {x , y , el }
        
    }else{
        const el = document.getElementById(`cell${ground[x][y]}`)
        predator.push({x,y,el})
        predator.forEach(c=>{
            c.el.style.backgroundColor='red'
        })
    }
}
