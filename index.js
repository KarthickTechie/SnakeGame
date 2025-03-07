const ground = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
] 

const playground = document.getElementById('playground')

for(let i=0;i<ground.length;i++){
    for(let j=0;j<ground[i].length;j++){
        const cell = document.createElement('div')
        cell.classList = 'cell'
        cell.id = `cell${ground[i][j]}`
        cell.innerText = `${ground[i][j]}`
        playground.appendChild(cell)
    }
}

