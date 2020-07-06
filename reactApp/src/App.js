import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <Router>
      <Route path="/home" component={SearchPage} />
      <Route path="/result" component={ResultPage} />
    </Router>
  );
}

export default App;