import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
function Routing() {
  return (
    <Router>
      <div className="main-container">
        <Route exact path="/" component={Dashboard} />
        <Route path="/:boardID" component={Home} />
      </div>
    </Router>
  );
}

export default Routing;
