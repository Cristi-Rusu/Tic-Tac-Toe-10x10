import React from 'react';
import Board from './board';
import GameInfo from './info';

export default function GameView(props) {
    const { history, stepNumber, winner } = props;
    const current = history[stepNumber];

    return (
        <div className='game'>
            <Board
                squares={current.squares}
                winLine={winner.line}
                onClick={props.handleClick}
            />
            <GameInfo
                history={history}
                stepNumber={stepNumber}
                winner={winner.side}
                xIsNext={props.xIsNext}
                reversedList={props.reversedList}
                reverseOl={props.reverseOl}
                jumpTo={props.jumpTo}
            />
        </div>
    );
}