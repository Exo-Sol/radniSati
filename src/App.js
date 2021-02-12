import React, { useState } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./seconPage/SecondPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

const App = () => {
  // to indicate change in added time to pase change notification to second ppage
  const [change, setChange] = useState(false);

  const onAddedTime = () => {
    setChange(!change);
  };
  //  const FirstPage = <FirstPage onAddedTime={onAddedTime} />;

  return (
    <Router>
      <div className="App">
        <SwipeableRoutes>
          <Route
            path="/first"
            render={(props) => (
              <FirstPage {...props} onAddedTime={onAddedTime} />
            )}
          />
          <Route
            path="/second"
            render={(props) => (
              <SecondPage
                {...props}
                change={change}
                onAddedTime={onAddedTime}
              />
            )}
          />
        </SwipeableRoutes>
      </div>
    </Router>
  );
};

export default App;
