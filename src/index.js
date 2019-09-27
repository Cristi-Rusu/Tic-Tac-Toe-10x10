import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker.js';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

const lines = [];
// diagonal line solutions
for (let x = 0; x <= 5; x++) {
    for (let y = 0; y <= 5; y++) {
        const sol = [];
        for (let k = 0; k < 5; k++) {
            sol[k] = x + (y * 10) + k * 11;
        }
        lines.push(sol);
    }
}
// reversed diagonal line solutions
for (let x = 9; x >= 4; x--) {
    for (let y = 0; y <= 5; y++) {
        const sol = [];
        for (let k = 0; k < 5; k++) {
            sol[k] = x + (y * 10) + k * 9;
        }
        lines.push(sol);
    }
}
// horizontal line solutions
for (let x = 0; x <= 5; x++) {
    for (let y = 0; y < 10; y++) {
        const sol = [];
        for (let k = 0; k < 5; k++) {
            sol[k] = x + (y * 10) + k;
        }
        lines.push(sol);
    }
}
// vertical line solutions
for (let x = 0; x < 10; x++) {
    for (let y = 0; y <= 5; y++) {
        const sol = [];
        for (let k = 0; k < 5; k++) {
            sol[k] = x + (y * 10) + k * 10
        }
        lines.push(sol);
    }
}

function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d, e] = lines[i];
        if (squares[a]
            && squares[a] === squares[b]
            && squares[b] === squares[c]
            && squares[c] === squares[d]
            && squares[d] === squares[e]) {
            return {
                // 'X' or 'O'
                side: squares[a],
                line: lines[i],
            };
        }
    }
    return {
        side: null,
        line: [],
    };
}

function Square(props) {
    return (
        <button
            className={`square ${props.type}`}
            onClick={props.onClick}
            style={{color: props.color}}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        const tileVal = this.props.squares[i];
        let type = '';
        if (tileVal) {
            type = tileVal === 'X' ? 'x' : 'o';
            if (this.props.winLine.includes(i)) {
                type = 'win';
            }
        }
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                type={type}
            />
        );
    }

    render() {
        const Row = (props) => {
            const squareRow = [];
            const i = props.index;
            for (let j = i * 10; j < i * 10 + 10; j++) {
                squareRow.push(this.renderSquare(j));
            }
            return (
                <div className='board-row'>
                    {squareRow}
                </div>
            );
        }
        const Rows = [];
        for (let i = 0; i < 10; i++) {
            Rows.push(<Row index={i} key={i} />);
        }

        return (
            <div className='game-board'>
                {Rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            reversed: false,
        }
        // This binding is necessary to make `this` work inside the callback
        this.handleClick = this.handleClick.bind(this);
        this.reverseOl = this.reverseOl.bind(this);
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    handleClick(i) {
        // updates the history if a user returned to a previous move (deletes the future)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        // if there is a winner or the square is filled
        if (calculateWinner(squares).side || squares[i]) {
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
        }));
    }

    reverseOl() {
        this.setState(state => ({
            reversed: !state.reversed,
        }));
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let movesList = [];
        for (let i = 0; i < history.length; i++) {
            const step = history[i];
            // if "i" is different from 0
            const desc = i ? `Go to move #${i} ${step.info}` : 'Go to game start';
            const move = [(
                <li key={i}>
                    <button
                        onClick={() => this.jumpTo(i)}
                        style={i === this.state.stepNumber ? {fontWeight: 'bold'} : {}}
                    >
                        {desc}
                    </button>
                </li>
            )];
            if (this.state.reversed) {
                movesList = move.concat(movesList);
            } else {
                movesList = movesList.concat(move);
            }
        }

        let status;
        if (winner.side) {
            status = `Winner: ${winner.side}`;
        // if there are no empty squares left
        } else if (!current.squares.includes(null)) {
            status = 'It\'s a draw';
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className='game'>
                <Board
                    squares={current.squares}
                    winLine={winner.line}
                    onClick={this.handleClick}
                />
                <div className='game-info'>
                    <div>{status}</div>
                    <button
                        onClick={this.reverseOl}
                    >
                        Reverse List
                    </button>
                    <ol reversed={this.state.reversed}>{movesList}</ol>
                </div>
            </div>
        );
    }
}

// ────────────────────────────────────────────────────────────────────────────────

ReactDOM.render(
    <Game />,
    document.getElementById('root'),
);
