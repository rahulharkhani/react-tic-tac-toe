import React from 'react';
import Square from './Square';

class Board extends React.Component {

    createBoard(rows, cols) {
        const board = [];
        let counter = 0;
        for(let i = 0; i < rows; i += 1) {
            let columns = [];
            for(let j = 0; j < cols; j += 1) {
                columns.push(this.renderSquare(counter++));
            }
            
            board.push(<div key={i} className="board-row">{columns}</div>);
        }
        return board;
    }

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
        return <div>{this.createBoard(3, 3)}</div>;
        /*return (
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
        );*/
    }
}

export default Board;