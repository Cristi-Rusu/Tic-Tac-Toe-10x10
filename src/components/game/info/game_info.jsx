import React from 'react';

export default function GameInfo(props) {
    const { history, winSide } = props;
    const current = history[props.stepNumber];

    let status;
    if (winSide) {
        status = (
            <span>Winner:
                <span className={winSide === 'X' ? 'x' : 'o'}>
                    {' ' + winSide}
                </span>
            </span>
        );
    // if there are no empty squares left
    } else if (!current.squares.includes(null)) {
        status = 'It\'s a draw';
    } else {
        status = (
            <span>Next player:
                <span className={props.xIsNext ? 'x' : 'o'}>
                    {props.xIsNext ? ' X' : ' O'}
                </span>
            </span>
        );
    }

    let movesList = [];
    for (let i = 0; i < history.length; i++) {
        const step = history[i];
        // if "i" is different from 0
        const desc = i ? `Go to move #${i} ${step.info}` : 'Go to game start';
        const move = [(
            <li key={i}>
                <button
                    className='btn'
                    onClick={() => props.jumpTo(i)}
                    style={i === props.stepNumber ? {fontWeight: 'bold'} : {}}
                >
                    {desc}
                </button>
            </li>
        )];
        if (props.reversedList) {
            movesList = move.concat(movesList);
        } else {
            movesList = movesList.concat(move);
        }
    }

    return (
        <div className='game-info'>
            <h2>{status}</h2>
            <button
                onClick={props.reverseOl}
                className='btn'
            >
                Reverse List
            </button>
            <ol reversed={props.reversedList}>
                {movesList}
            </ol>
        </div>
    );
}