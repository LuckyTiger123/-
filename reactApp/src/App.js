import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPageContainer from "./pages/SearchPage";
import ResultPageContainer from "./pages/ResultPage";
import { GameInfo } from "./components/GameInfo";

function App() {
  return (
    <Router>
      <Route path="/home" component={SearchPageContainer} />
      <Route path="/result" component={ResultPageContainer} />
      <Route path="/info/:id" component={GameInfo} />
    </Router>
  );
}

export default App;
