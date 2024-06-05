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

function caculateHeuristicVal(node){
    return 0;
}

function minimax(node, depth, maximizingPlayer){
    if (depth ==0 ) or (isTerminalNode(node))
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
let a = document.getElementById('btn1')
a.innerHTML = root.maximizingPlayer 