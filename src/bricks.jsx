import { convertGridToBinary, Cell } from './grid.jsx';

export function brickValidPlacement(oGrid, brickPos, brickType) {
    var grid = convertGridToBinary(oGrid);
    const [row, col] = brickPos;
    
    // Get brick dimensions
    const brickHeight = brickType.length;
    const brickWidth = brickType[0].length;
    
    // Check if brick fits within grid bounds
    if (row < 0 || col < 0 || row + brickHeight > grid.length || col + brickWidth > grid[0].length) {
        return false;
    }
    
    // Check for overlaps
    for (let i = 0; i < brickHeight; i++) {
        for (let j = 0; j < brickWidth; j++) {
            if (brickType[i][j] === 1 && grid[row + i][col + j] === 1) {
                return false; // Overlapping another brick
            }
        }
    }
    
    return true; // Valid placement
};

export function placeBrick(grid, brickPos, brickType, color = Cell.RED) {
    if (!brickValidPlacement(grid, brickPos, brickType)) {
        return null; // Return original grid if placement is invalid
    }
    
    const [row, col] = brickPos;
    const newGrid = grid.map(row => [...row]); // Create a deep copy of grid
    
    for (let i = 0; i < brickType.length; i++) {
        for (let j = 0; j < brickType[0].length; j++) {
            if (brickType[i][j] !== 0) {
                newGrid[row + i][col + j] = color;
            }
        }
    }
    
    return newGrid; // Return updated grid
}

export function printBrickTemp(brickType, color = Cell.RED, dragging = false) {
    return (
        <table>
            <tbody style={{transform: `scale(${dragging ? 1.46 : 1}) translate(-50%, -50%)`, transformOrigin: 'top left'}}>
                {brickType.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => (
                            <td key={j} className="selection-cell" style={{ backgroundColor: cell === 1 ? color : 'transparent' }}>
                                &nbsp;
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export const brickTypes = {

    // SINGLE ROW-COL BRICKS //
    A1x2: [ [1, 1]], 
    A1x3: [ [1, 1, 1]], 
    A1x4: [ [1, 1, 1, 1]], 
    A1x5: [ [1, 1, 1, 1, 1]], 
    A2x1: [ [1], 
            [1]], 
    A3x1: [ [1], 
            [1], 
            [1]], 
    A4x1: [ [1], 
            [1], 
            [1], 
            [1]], 
    A5x1: [ [1], 
            [1], 
            [1], 
            [1], 
            [1]], 
    
    // 2x3 BRICKS //
    A2x3: [ [1, 1, 1], 
            [1, 1, 1]], 
    B2x3: [ [0, 1, 1], 
            [1, 1, 0]], 
    C2x3: [ [1, 1, 0], 
            [0, 1, 1]], 
    D2x3: [ [1, 1, 1], 
            [0, 1, 0]], 
    E2x3: [ [1, 1, 1], 
            [0, 1, 0]], 
    F2x3: [ [1, 0, 0], 
            [1, 1, 1]], 
    G2x3: [ [0, 0, 1], 
            [1, 1, 1]], 
    H2x3: [ [1, 1, 1], 
            [0, 0, 1]], 
    I2x3: [ [1, 1, 1], 
            [1, 0, 0]], 

    // 3x2 BRICKS //
    A3x2: [ [1, 1], 
            [1, 1], 
            [1, 1]], 
    B3x2: [ [1, 0], 
            [1, 1], 
            [0, 1]], 
    C3x2: [ [0, 1], 
            [1, 1], 
            [1, 0]], 
    D3x2: [ [1, 0], 
            [1, 1], 
            [1, 0]], 
    E3x2: [ [0, 1], 
            [1, 1], 
            [0, 1]], 
    F3x2: [ [1, 0], 
            [1, 0], 
            [1, 1]], 
    G3x2: [ [1, 1], 
            [1, 0], 
            [1, 0]], 
    H3x2: [ [0, 1], 
            [0, 1], 
            [1, 1]], 
    I3x2: [ [1, 1], 
            [0, 1], 
            [0, 1]], 

    // 2x2 BRICKS //
    A2x2: [ [1, 1], 
            [1, 1]], 
    B2x2: [ [1, 1], 
            [1, 0]], 
    C2x2: [ [1, 0], 
            [1, 1]], 
    D2x2: [ [0, 1], 
            [1, 1]], 
    E2x2: [ [1, 1], 
            [0, 1]], 
    
    // 3x3 BRICKS //
    A3x3: [ [1, 1, 1], 
            [1, 1, 1], 
            [1, 1, 1]], 
    B3x3: [ [1, 1, 1], 
            [0, 0, 1], 
            [0, 0, 1]], 
    C3x3: [ [1, 1, 1], 
            [1, 0, 0], 
            [1, 0, 0]], 
    D3x3: [ [1, 0, 0], 
            [1, 0, 0], 
            [1, 1, 1]], 
    E3x3: [ [0, 0, 1], 
            [0, 0, 1], 
            [1, 1, 1]], 
    
};