import React, { useState, useEffect } from "react";
import StatusBar from "./StatusBar";
import GameOverModal from "./GameOverModal";

// Define a basic set of slot items (symbols)
const slotItems = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍀"];

const winningLines = [
    // Horizontal Wins
    [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 }
    ],
    [
        { row: 1, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
        { row: 1, col: 3 }
    ],
    [
        { row: 2, col: 0 },
        { row: 2, col: 1 },
        { row: 2, col: 2 },
        { row: 2, col: 3 }
    ],
    [
        { row: 3, col: 0 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
        { row: 3, col: 3 }
    ],
    
    // Vertical Wins
    [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 }
    ],
    [
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 2, col: 1 },
        { row: 3, col: 1 }
    ],
    [
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 3, col: 2 }
    ],
    [
        { row: 0, col: 3 },
        { row: 1, col: 3 },
        { row: 2, col: 3 },
        { row: 3, col: 3 }
    ],

    // Diagonal Wins
    [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
        { row: 2, col: 2 },
        { row: 3, col: 3 }
    ],
    [
        { row: 0, col: 3 },
        { row: 1, col: 2 },
        { row: 2, col: 1 },
        { row: 3, col: 0 }
    ]
];


// Generate a 4x4 grid of random slot items
const generateGrid = () => {
    const grid: string[][] = [];
    for (let i = 0; i < 4; i++) {
        grid[i] = [];
        for (let j = 0; j < 4; j++) {
            const randomItem = slotItems[Math.floor(Math.random() * slotItems.length)];
            grid[i].push(randomItem);
        }
    }
    return grid;
};
const Grid: React.FC = () => {
    const [grid, setGrid] = useState(generateGrid());
    const [balance, setBalance] = useState(100);
    const [betAmount, setBetAmount] = useState(15);
    const [winnings, setWinnings] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (balance <= 0) {
            setGameOver(true);
        }
    }, [balance]);

    const spinGrid = () => {
        setIsSpinning(true);
        
        setTimeout(() => {
            const newGrid = generateGrid();
            setGrid(newGrid);
            const winAmount = checkForWins(newGrid);
    
            // Update balance after win and bet is deducted
            setBalance(prevBalance => {
                const updatedBalance = prevBalance + winAmount - betAmount;
                
                // After balance is updated, adjust bet amount based on new balance
                const adjustedBetAmount = Math.min(updatedBalance, betAmount);
                setBetAmount(adjustedBetAmount); 
                
                return updatedBalance; 
            });
            
            setWinnings(winAmount);
            setIsSpinning(false); 
        }, 300); // Wait for animation to finish before updating the grid
    };

    const checkForWins = (newGrid: string[][]) => {
        let winAmount = 0;
        const highlightedSquares: Set<string> = new Set();
    
        // Check for horizontal, vertical, and diagonal winning lines
        winningLines.forEach(line => {
            const firstSymbol = newGrid[line[0].row][line[0].col];
    
            // Check if all items in the line are the same
            const isWin = line.every(({ row, col }) => newGrid[row][col] === firstSymbol);
    
            if (isWin) {
                // Add the winning squares to the highlightedSquares set
                line.forEach(({ row, col }) => {
                    highlightedSquares.add(`${row}-${col}`);
                });
    
                winAmount += betAmount * 20; 
            }
        });
    
        // Highlight the winning squares
        highlightWinningSquares(highlightedSquares);
    
        return winAmount;
    };

    const highlightWinningSquares = (highlightedSquares: Set<string>) => {
        const gridItems = document.querySelectorAll('.grid-item');
    
        gridItems.forEach((item, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const squareKey = `${row}-${col}`;
    
            // Add the 'highlight' class to winning squares
            if (highlightedSquares.has(squareKey)) {
                item.classList.add('highlight');
            } else {
                item.classList.remove('highlight');
            }
        });
    };

    return (
        <div className="content-container">
            <div className="game-content-container">
                <div className="left-content-container">
                    <div className="grid-container">

                        <div className="grid">
                            {grid.map((row, rowIndex) => (
                                <div key={rowIndex} className={`grid-row ${isSpinning ? 'spinning' : ''}`}>
                                    {row.map((item, colIndex) => (
                                        <div key={colIndex} className={`grid-item ${isSpinning ? 'spinning' : ''}`}>
                                            <div className="grid-item-text">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="right-content-container">
                    <button className="button-spin" onClick={spinGrid} disabled={isSpinning}>Spin</button>
                    <div className="bet-controls">
                        <button className="button-bet" onClick={() => setBetAmount(prevBet => Math.min(balance, prevBet + 1))}>+</button>
                        <p>Bet: £{betAmount}</p>
                        <button className="button-bet" onClick={() => setBetAmount(prevBet => Math.max(1, prevBet - 1))}>-</button>
                    </div>
                </div>
            </div>
            <StatusBar balance={balance} winnings={winnings} betAmount={betAmount} />
            {gameOver && <GameOverModal setBalance={setBalance} setGameOver={setGameOver} setBetAmount={setBetAmount}/>}
        </div>
    );
};

export default Grid;