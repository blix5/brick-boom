import './Main.css';
import React, { useState, useEffect, useRef } from 'react';
import { Cell, createGrid, printGridTemp, registerBrickPlacement, isGridEmpty, NUM_ROWS, NUM_COLS } from './grid.jsx';
import { placeBrick, brickTypes, printBrickTemp, brickValidPlacement, canFitAnyBrick, findFirstFit } from './bricks.jsx';
import Draggable from 'react-draggable';
import useWindowSize from './utils/Window.jsx';
import sum from './utils/MathUtils.jsx';

function Main() {
  const [mainGrid, setMainGrid] = useState(createGrid(NUM_ROWS, NUM_COLS));
  const [randomBricks, setRandomBricks] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const gridRef = useRef(null);
  const bricksRef = useRef([]);
  const { width, height } = useWindowSize();

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(score);

  useEffect(() => {
    bricksRef.current = bricksRef.current.slice(0, randomBricks.length);
    if (randomBricks.every(brick => !brick)) { // Generate new bricks if all bricks are placed
      generateRandomBricks();
    }
  }, [randomBricks]);

  useEffect(() => {
    generateRandomBricks();
  }, []);

  useEffect(() => {
    if(!canFitAnyBrick(mainGrid, randomBricks.map(brick => brick && brick.type))) {
      alert('womp womp');
      setScore(0);
      setMainGrid(createGrid(NUM_ROWS, NUM_COLS));
      generateRandomBricks();
    } else {
      setFit(findFirstFit(mainGrid, randomBricks.map(brick => brick && brick.type)));
    }
  }, [mainGrid])

  const generateRandomBricks = () => {
    const colors = Object.values(Cell).filter(cell => cell !== Cell.EMPTY);
    const brickKeys = Object.keys(brickTypes);
    const bricks = Array.from({ length: 3 }, () => ({
      type: brickTypes[brickKeys[Math.floor(Math.random() * brickKeys.length)]],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setRandomBricks(bricks);
  };

  const handleStart = (e, data, index) => {
    setDraggingIndex(index);
    const rect = bricksRef.current[index].getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const [globalRow, setRow] = useState(0);
  const [globalCol, setCol] = useState(0);

  const [fit, setFit] = useState(null);

  const handleDrag = (e, data, brick) => {
    const centerX = e.clientX - width / 2 - dragOffset.x;
    const centerY = e.clientY - dragOffset.y - height * 0.4;
    const col = Math.floor((centerX / (3 * 17.3)) + 4.5 - brick.type[0].length / 2);
    const row = Math.floor((centerY / (3 * 17.3)) + 4.5 - brick.type.length / 2);
    setRow(row);
    setCol(col);
    setHoverPosition({ x: col, y: row, brick: brick });
  };

  const handleStop = (e, data, brick, index) => {
    setDraggingIndex(null);
    const newGrid = placeBrick(mainGrid, [globalRow, globalCol], brick.type, brick.color);
    if(newGrid) { // If placement is valid
      setRandomBricks(prevBricks => prevBricks.map((brick, i) => i === index ? null : brick));

      // Check for cleared rows and columns
      const registered = registerBrickPlacement(newGrid, brick.color);

      setMainGrid(registered.grid);
      var scoreInc = 0;
      if(registered.count === 0) { // No rows or columns cleared
        scoreInc = sum(brick.type.map(row => sum(row)));
      } else {
        scoreInc = registered.count * 10;
        if(isGridEmpty(registered.grid)) {
          scoreInc += 500;
        }
      }
      setScore(prevScore => prevScore + scoreInc);
      setHighScore(prevScore => Math.max(score + scoreInc, highScore));
    }
    setHoverPosition(null); // Placement not valid
  };

  return (
    <div className="main">
      <header>
        <h1>Score: {score}</h1>
        <h2>High Score: {highScore}</h2>
        {/* fit && <h3>Fit at {fit.row}, {fit.col}</h3> */}
      </header>
      <div className="main-grid" ref={gridRef}>
        {printGridTemp(mainGrid)}
      </div>
      <div>
        {randomBricks.map((brick, index) => (
          (brick) && (
            <Draggable key={index} position={{x: 0, y: 0}}
              onStart={(e, data) => handleStart(e, data, index)}
              onDrag={(e, data) => handleDrag(e, data, brick)}
              onStop={(e, data) => handleStop(e, data, brick, index)}
              className="selection-brick"
            >
              <div ref={el => bricksRef.current[index] = el}
                style={{ position: 'absolute', top: `80%`, left: `calc(50% + ${(index - 1) * 12}rem)`, cursor: 'grab'}}
              >
                {printBrickTemp(brick.type, brick.color, draggingIndex === index)}
              </div>
            </Draggable>
          )
        ))}

        {(((draggingIndex + 1) && hoverPosition) && brickValidPlacement(mainGrid, [hoverPosition.y, hoverPosition.x], hoverPosition.brick.type)) && (
          <div className="selection-brick" style={{ position: 'absolute',
              top: `calc(39.9% + ${(hoverPosition.y + hoverPosition.brick.type.length / 2 - 4) * 3 * 17.3}px)`,
              left: `calc(49.9% + ${(hoverPosition.x + hoverPosition.brick.type[0].length / 2 - 4) * 3 * 17.3}px)`, opacity:0.5}}>
            {printBrickTemp(hoverPosition.brick.type, hoverPosition.brick.color, true)}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;