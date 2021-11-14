import React from "react";
import { Switch, Route, Link } from "react-router-dom"; // use react router to create different URL routes
// used to route the differnt React components
import "bootstrap/dist/css/bootstrap.min.css"; // to style the app

import AddReview from "./components/add-reviews";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  // using react hooks
  // React.useState creates a state variable (null is its initial value)
  // use setUser to later update user variable
  const [user, setUser] = React.useState(null)

  // dummy login system
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            { user? (
              <a onClick={logout} className="nav-link" style={{cursor: 'pointer'}}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
    </div>
  );
}

export default App;
