import React, { useState } from "react";

interface StatisBarProps {
    balance: number;
    winnings: number;
    betAmount: number;
}

const StatusBar: React.FC<StatisBarProps> = ({ balance, winnings, betAmount }) => {
  return (
    <div className="status-bar">
      <div className="text-block">Balance: £{balance}</div>
      <div className="text-block">Winnings: £{winnings}</div>
      <div className="text-block">Bet: £{betAmount}</div>
    </div>
  );
};

export default StatusBar;