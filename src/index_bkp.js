import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

const Square=(props)=> {
    let bold = "square";
    let winnerBox = "";
    if(props.boldPosition === props.position) {
        bold = "square bold";
    }
    if(props.winnerState !== "" && props.winnerState.includes(props.position)){
        winnerBox = " winner";
    }

    return(
        <button className={`${bold}${winnerBox}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    /*createBoard(rows, cols) {
        const board = [];
        let counter = 0;
        for(let i = 0; i < rows; i += 1) {
            let columns = [];
            for(let j = 0; j < cols; i += 1) {
                columns.push(this.renderSquare(counter++));
            }
            
            board.push(<div key={i} className="board-row">{columns}</div>);
        }
        return board;
    }*/

    renderSquare(i){
        //console.log(this.props.datalink);
        //return <Square value={i} />;
        return <Square 
            boldPosition = {this.props.currentPos}
            position = {i}
            winnerState = {this.props.winnerSquare}
            value = {this.props.squares[i]}
            onClick = {()=> this.props.onClick(i)}
        />;
    }

    render(){
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component{

    constructor (props){
        super (props);
        this.state = {
            history : [{
                squares : Array(9).fill(null),
                xPos : 0,
            }],
            stepNumber : 0,
            xIsNext : true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if(calculatewinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history : history.concat([{
                squares : squares,
                xPos : i,
            }]),
            stepNumber : history.length,
            xIsNext: !this.state.xIsNext,
        });
        //console.log(squares);
    }

    jumpTo(step) {
        this.setState({
            stepNumber : step,
            xIsNext : (step % 2) === 0,
        });
    }

    sortMoves() {
        this.setState({
            history: this.state.history.reverse(),
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]; //history[history.length - 1];
        const winner = calculatewinner(current.squares);
        
        const moves = history.map((step, move) => {
            const xPos = step.xPos;
            const desc = move ?
              'Go to move #' + move + " " + getcolrow(xPos) :
              'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        let winnerState = "";
        if(this.state.stepNumber === 9 && !winner) {
            status = "Match is Draw";
        } else {
            if(winner) {
                status = "Winner : " + winner.playerName;
                winnerState = winner.sequenceList;
            } else {
                status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
            }
        }
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        currentPos = {current.xPos}
                        winnerSquare = {winnerState}
                        squares = {current.squares}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <button onClick={() => this.sortMoves()}>Sorting ASC / DESC Move</button>
                </div>
            </div>
        );
    }
}

function calculatewinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    //console.log(squares);
    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            const squareWinner = {
                playerName : squares[a],
                sequenceList : lines[i],
            };
            //console.log(lines[i]);
            // console.log(squareWinner.playerName);
            return squareWinner; //squares[a];
        }
    }
    return null;
}

function getcolrow(xPos) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ];
    var result;
    for(let i = 0; i < 9; i++) {
        result = lines[i].indexOf(xPos);
        if(result !== -1){
            result = '( Cols : ' + i+', Rows : ' + result + ')';
            break;
        }
    }
    return result;
}


ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

