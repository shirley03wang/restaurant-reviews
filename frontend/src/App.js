import React from "react"
import {Switch, Route, Link} from "react-router-dom" // use react router to create different URL routes
                                                     // used to route the differnt React components
import "bootstrap/dist/css/bootstrap.min.css" // to style the app

import AddReview from "./components/add-reviews";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
      </nav>
    </div>
  );
}

export default App;
