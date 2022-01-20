import React from 'react';

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

export default Square;