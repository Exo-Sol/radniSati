import React, { useState } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./seconPage/SecondPage";
import Page2 from "./components/Page2";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

const App = () => {
  // to indicate change in added time to pase change notification to second ppage
  const [change, setChange] = useState(false);
  // when you "nuke" delete all data, to delete jobs enered in state also
  const [nukeAll, setNukeAll] = useState(false);

  const onAddedTime = (nuke = false) => {
    setChange(!change);
    if (nuke) {
      setNukeAll(!nukeAll);
      console.log();
    }
  };
  //  const FirstPage = <FirstPage onAddedTime={onAddedTime} />;
  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const retrivedObj = localStorage.getItem(year);

  return (
    <>
      {/* conditional rendering so it dosent display table when there is no entry, this happens at the very start of use */}
      {retrivedObj ? (
        <Router>
          <div className="App">
            <SwipeableRoutes>
              <Route
                path="/first"
                render={(props) => (
                  <FirstPage
                    {...props}
                    onAddedTime={onAddedTime}
                    nuke={nukeAll}
                  />
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
      ) : (
        <Router>
          <div className="App">
            <SwipeableRoutes>
              <Route
                path="/first"
                render={(props) => (
                  <FirstPage
                    {...props}
                    onAddedTime={onAddedTime}
                    nuke={nukeAll}
                  />
                )}
              />
              <Route path="/second" render={(props) => <Page2 />} />
            </SwipeableRoutes>
          </div>
        </Router>
      )}
    </>
  );
};

export default App;
