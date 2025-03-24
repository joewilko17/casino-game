import React, { useState } from 'react';

interface GameOverModalProps {
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setBetAmount: React.Dispatch<React.SetStateAction<number>>;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ setBalance, setGameOver, setBetAmount }) => {
    const [newBalance, setNewBalance] = useState(100); // Default new balance
    const [newBetAmount, setNewBetAmount] = useState(5);

    const handleRestartGame = () => {
        setBalance(newBalance); // Set the balance to the new amount
        setGameOver(false); // Close the game over modal
        setBetAmount(newBetAmount);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Game Over</h2>
                <p>Your balance is 0! Would you like to start a new game?</p>
                <label>
                    Choose a new balance: £
                    <input className='new-game-input'
                        value={newBalance}
                        onChange={(e) => setNewBalance(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <button className='button-new-game' onClick={handleRestartGame}>Start New Game</button>
            </div>
        </div>
    );
};

export default GameOverModal;