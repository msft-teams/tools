import React from "react";
import Home from "./components/Home/Home";
import Learning from "./components/Learning/Learning";
import SampleData from "./assets/data/data.json";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OffShift from "./components/Shift/OffShift";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App" id="wrapper">
        <Switch>
          <Route exact path="/">
            <Home
              data={SampleData}
              configuredData={SampleData.configuredData}
            />
          </Route>
          <Route exact path="/home">
            <Home
              data={SampleData}
              configuredData={SampleData.configuredData}
            />
          </Route>
          <Route exact path="/learning">
            <Learning data={SampleData} />
          </Route>
          <Route exact path="/offshift">
            <OffShift data={SampleData} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
