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

function generateTree(node, depth = 0){
    if (depth <= 0) return;
    node.generateChildren()
    node.children.forEach(child => generateTree(child, depth-1))
    return
}

function isTerminalNode(node){
    return false
}

function countOccurrences(array){
    // count occurrences of X, O, null in board
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
        else if ((numO == 1) && numNULL == 2) val+=1

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

function minimax(node, depth=0){
    
    // if ((depth == 0 ) || (isTerminalNode(node)))
    //     return caculateHeuristicVal(node)
    if (depth <= 0 ) {
        let value = caculateHeuristicVal(node)
        node.heuristicValue = value
        return value
    }
        
    else if (node.maximizingPlayer == false){

        var value = -99
        node.children?.forEach((child) => {
            var a = minimax(child, depth-1, false)
            value = Math.max(value, a)
        })
        node.heuristicValue = value
        return value
    }
    else {
        var value = 99
        node.children?.forEach(child => {
            var a = minimax(child, depth-1, true)
            value = Math.min(value, a)
        });
        node.heuristicValue = value
        return value
    }
}

const PFXs = { true: { true: "     ", false: "┃    " }, false: { true: "┗━━━ ", false: "┣━━━ " } };
const printTree = (t, levels = []) => {
  const pfx = (p, i) => PFXs[i < levels.length - 1][p];
  console.log(`${levels.map(pfx).join("")}[${t.board.join('-')}] ${t.heuristicValue}`);
  t.children?.forEach((x, i) => printTree(x, [...levels, i === t.children.length-1]));
}

function getMove(currentBoard, depth){
    var root = new Node(currentBoard, false);
    generateTree(root, depth)
    val = minimax(root, depth)
    printTree(root)
    var nextNode = []
    for (var i = 0; i < root.children.length; ++i){
        if(root.children[i].heuristicValue == val){
            nextNode = root.children[i]
            break
        }
    }
    
    for(var i = 0; i < 9;++i){
        if(nextNode.board[i] != root.board[i]){
            return i
        }
    }

    return null
}
 

// let board = []
// var n = 9
// while (n--){
//     board[n] = ""
// }
// board[6] = 'X'
// board[7] = 'O'
// root = new Node(board, true)
// // console.log(caculateHeuristicVal(root))
// generateTree(root, 2)
// minimax(root, 2)

// let copyroot = root
// copyroot.maximizingPlayer = false
// printTree(root)
