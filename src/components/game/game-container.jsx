import React from 'react';
import Game from './game-view';
import { computeWinLines, calculateWinner } from './win-logic';

const winLines = computeWinLines();

export default class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(100).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            reversedList: false,
            winner: { side: null, line: [] },
        }
        // This binding is necessary to make `this` work inside the callback
        this.handleClick = this.handleClick.bind(this);
        this.reverseOl = this.reverseOl.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
    }

    jumpTo(step) {
        this.setState(state => ({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            winner: calculateWinner(state.history[step].squares, winLines),
        }))
    }

    handleClick(i) {
        // updates the history if a user returned to a previous move (deletes the future)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // if there is a winner or the square is filled
        if (this.state.winner.side || squares[i]) {
            return;
        }
        const side = this.state.xIsNext ? 'X' : 'O';
        squares[i] = side;
        this.setState(state => ({
            history: history.concat({
                squares: squares,
                // (col, row) side
                info: `( ${i % 10}, ${Math.floor(i / 10)} ) ${side}`,
            }),
            stepNumber: history.length,
            xIsNext: !state.xIsNext,
            winner: calculateWinner(squares, winLines),
        }));
    }

    reverseOl() {
        this.setState(state => ({
            reversedList: !state.reversedList,
        }));
    }

    render() {
        const {
            history, stepNumber, reversedList, xIsNext, winner
        } = this.state;
        return (
            <Game
                winner={winner}
                history={history}
                stepNumber={stepNumber}
                xIsNext={xIsNext}
                reversedList={reversedList}
                handleClick={this.handleClick}
                reverseOl={this.reverseOl}
                jumpTo={this.jumpTo}
            />
        );
    }
}