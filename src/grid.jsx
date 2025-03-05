import { brickTypes } from './bricks.jsx'

export const NUM_ROWS = 8
export const NUM_COLS = 8

export const Cell = {
    EMPTY: 'white',
    RED: 'red',
    ORANGE: 'orange',
    YELLOW: 'yellow',
    GREEN: 'green',
    TEAL: 'teal',
    BLUE: 'blue',
    PURPLE: 'purple',
};

export function createGrid(rows, cols, defaultValue = Cell.EMPTY) {
    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            grid[i][j] = defaultValue;
        }
    }
    return grid;
};

export function printGridTemp(grid) {
    return (
        <table>
            <tbody>
                {grid.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td key={j} className="main-cell" style={{ backgroundColor: cell }}>
                                &nbsp;
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export function convertGridToBinary(grid) {
    return grid.map(row => row.map(element => element === Cell.EMPTY ? 0 : 1));
}