import React from 'react';
import './App.css';
import Header from './components/Header';
import Grid from './components/Grid';
import StatusBar from './components/StatusBar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Grid />
    </div>
  );
};

export default App;
