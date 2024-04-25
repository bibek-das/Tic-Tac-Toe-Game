let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn = true;

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    })
}

const resetGame = () => {
    enableBoxes();
    msgContainer.classList.add("hide");
    turn = true;
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winningPattern){
        let empty = false;
        for(let idx of pattern){
            if(boxes[idx].innerText == ""){
                empty = true;
                break;
            }
        }
        if(!empty){
            let winnerFound = true;
            for(let i = 0;i < 2;i++){
                if(boxes[pattern[i]].innerText != boxes[pattern[i + 1]].innerText){
                    winnerFound = false;
                    break;
                }
            }
            if(winnerFound){
                showWinner(boxes[pattern[0]].innerText);
            }
        }

    }
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turn) box.innerText = "X";
        else box.innerText = "O";
        turn ^= 1;
        box.disabled = true;
        checkWinner();
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


