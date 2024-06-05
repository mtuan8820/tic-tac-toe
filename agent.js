class Node{
    constructor(board, maximizingPlayer){
        this.board = board;
        this.children = [];
        this.maximizingPlayer = maximizingPlayer
        this.heuristicValue = 0;
    }

    generateChildren(){
        this.board.forEach((cell, index)=>{
            if(cell==""){
                let copyboard = [...this.board]
                copyboard[index] =  this.maximizingPlayer ? 'X' : 'O'
                let node = new Node(copyboard, !this.maximizingPlayer)
                this.children.push(node)
            }
        })
    }
}

function generateTree(node, depth){
    if (depth == 0) return;
    node.generateChildren()
    node.children.forEach(child => generateTree(child, depth-1))
    return
}

function isTerminalNode(node){
    return False
}

function countOccurrences(array){
    let numX = 0, numO = 0, numNULL = 0
    array.forEach(item =>{
        if (item == 'X') numX++;
        else if (item == 'O') numO++;
        else numNULL++;
    })
    return [numX, numO, numNULL]
}

function caculateHeuristicVal(node){
    
    let val = 0
    function updateVal(array){
        countOccur = countOccurrences(array)
        let numX = countOccur[0]
        let numO = countOccur[1]
        let numNULL = countOccur[2]
        if (numX == 3) val-=100
        else if (numO == 3) val+=100
        else if ((numX == 2) && numNULL == 1) val-=10
        else if ((numO == 2) && numNULL == 1) val+=10
        else if ((numX == 1) && numNULL == 2) val-=1
    }
    // check column
    for (let i = 0; i < 3; i++){
        let array = [node.board[i], node.board[i+3], node.board[i+6]]
        updateVal(array)
    }
    // check row
    for (let i = 0; i<7; i += 3){
        let array = [node.board[i], node.board[i+1], node.board[i+2]]
        updateVal(array)
    }

    let diagonal1 = [node.board[0], node.board[4], node.board[8]]
    updateVal(diagonal1)
    let diagonal2 = [node.board[2], node.board[4], node.board[6]]
    updateVal(diagonal2)

    return val
}

function minimax(node, depth, maximizingPlayer){
    
    if ((depth ==0 ) || (isTerminalNode(node)))
        return caculateHeuristicVal(node)
    if (maximizingPlayer){
        let value = Number.NEGATIVE_INFINITY 
        node.chilren.forEach(child => {
            value = Math.max(value, minimax(child, depth-1, false))
        });
        return value
    }
    else {
        let value = Number.POSITIVE_INFINITY
        node.chilren.forEach(child => {
            value = Math.min(value, minimax(child, depth-1, true))
        });
        return value
    }
}

let board = []
var n = 9
while (n--){
    board[n] = ""
}
board[6] = 'X'
board[7] = 'O'
root = new Node(board, true)
generateTree(root, 2)
console.log(root.children)
let copyroot = root
copyroot.maximizingPlayer = false
