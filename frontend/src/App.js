import React from "react"
import {/*Switch*/ Routes, Route, Link} from "react-router-dom" // use react router to create different URL routes
                                                                // used to route the differnt React components
// https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom
import "bootstrap/dist/css/bootstrap.min.css" // to style the app

import AddReview from "./components/add-reviews";
import Restaurant from "./components/restaurants";
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
    <div>
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

      <div className="container mt-3">
        <Routes> {/* use a switch to switch between differnt routes */}
          <Route path="/" element/*component*/={<RestaurantsList />} />
          <Route path="/restaurants" element/*component*/={<RestaurantsList />} />
          <Route
            path="/restaurants/:restaurant_id/review" 
            element={<AddReview user={user}/>}
          />
          <Route
            path="/restaurants/:restaurant_id"
            element={<Restaurant user={user}/>}
          />
          <Route
            path="/login"
            element={<Login login={login}/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
