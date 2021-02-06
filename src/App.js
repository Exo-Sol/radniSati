import React from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./seconPage/SecondPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

const App = () => {
  return (
    <Router>
      <div className="App">
        <SwipeableRoutes>
          <Route path="/first" component={FirstPage} />
          <Route path="/second" component={SecondPage} />
        </SwipeableRoutes>
      </div>
    </Router>
  );
};

export default App;
