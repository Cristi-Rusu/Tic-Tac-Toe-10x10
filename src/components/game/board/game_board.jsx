import React from 'react';
import Square from './square';

export default class Board extends React.Component {
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