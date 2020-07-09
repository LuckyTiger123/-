import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from './pages/SearchPage';
import ResultPage from './pages/ResultPage';
import { GameInfo } from './components/GameInfo'

function App() {
  return (
    <Router>
      <Route path="/home" component={SearchPage} />
      <Route path="/result" component={ResultPage} />
      <Route path="/info" component={GameInfo} />
    </Router>
  );
}

export default App;