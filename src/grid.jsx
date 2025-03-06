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

export function registerBrickPlacement(grid, color) {
    const binaryGrid = convertGridToBinary(grid);
    let clearCount = 0;
    const newGrid = grid.map((row, rowIndex) => {
        if (binaryGrid[rowIndex].every(cell => cell === 1)) {
            clearCount++;
            return row.map(() => Cell.EMPTY);
        }
        return row;
    });
    for(let col = 0; col < binaryGrid[0].length; col++) {
        var fullCol = true;
        for(let row = 0; row < binaryGrid.length; row++) {
            if(binaryGrid[row][col] === 0) {
                fullCol = false;
                break;
            }
        }
        if(fullCol) {
            clearCount++;
            for(let row = 0; row < binaryGrid.length; row++) {
                newGrid[row][col] = Cell.EMPTY;
            }
        }
    }

    return { grid: newGrid, count: clearCount };
}

export function convertGridToBinary(grid) {
    return grid.map(row => row.map(element => element === Cell.EMPTY ? 0 : 1));
}

export function isGridEmpty(grid) {
    const binaryGrid = convertGridToBinary(grid);
    return binaryGrid.every(row => row.every(cell => cell === 0));
}