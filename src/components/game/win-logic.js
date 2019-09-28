export function computeWinLines() {
    const winLines = [];
    // diagonal line solutions
    for (let x = 0; x <= 5; x++) {
        for (let y = 0; y <= 5; y++) {
            const sol = [];
            for (let k = 0; k < 5; k++) {
                sol[k] = x + (y * 10) + k * 11;
            }
            winLines.push(sol);
        }
    }
    // reversed diagonal line solutions
    for (let x = 9; x >= 4; x--) {
        for (let y = 0; y <= 5; y++) {
            const sol = [];
            for (let k = 0; k < 5; k++) {
                sol[k] = x + (y * 10) + k * 9;
            }
            winLines.push(sol);
        }
    }
    // horizontal line solutions
    for (let x = 0; x <= 5; x++) {
        for (let y = 0; y < 10; y++) {
            const sol = [];
            for (let k = 0; k < 5; k++) {
                sol[k] = x + (y * 10) + k;
            }
            winLines.push(sol);
        }
    }
    // vertical line solutions
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y <= 5; y++) {
            const sol = [];
            for (let k = 0; k < 5; k++) {
                sol[k] = x + (y * 10) + k * 10
            }
            winLines.push(sol);
        }
    }
    return winLines;
}

export function calculateWinner(squares, winLines) {
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c, d, e] = winLines[i];
        if (squares[a]
            && squares[a] === squares[b]
            && squares[b] === squares[c]
            && squares[c] === squares[d]
            && squares[d] === squares[e]) {
            return {
                // 'X' or 'O'
                side: squares[a],
                line: winLines[i],
            };
        }
    }
    return {
        side: null,
        line: [],
    };
}