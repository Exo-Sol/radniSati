import React, { useState } from "react";
import FirstPage from "./firstPage/FirstPage";
import SecondPage from "./seconPage/SecondPage";
import Page2 from "./components/Page2";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";

const App = () => {
  // to indicate change in added time to update info to second ppage
  const [change, setChange] = useState(false);
  // when you "nuke" delete all data, also delets jobs
  const [deleteAll, setDeleteAll] = useState(false);

  const onAddedTime = (del = false) => {
    setChange(!change);
    if (del) {
      setDeleteAll(!deleteAll);
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
                    deleteAll={deleteAll}
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
        // no data entry display first and second page
        <Router>
          <div className="App">
            <SwipeableRoutes>
              <Route
                path="/first"
                render={(props) => (
                  <FirstPage
                    {...props}
                    onAddedTime={onAddedTime}
                    deleteAll={deleteAll}
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
