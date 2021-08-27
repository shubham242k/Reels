import {BrowserRouter as Router,Switch, Route} from "react-router-dom"
import Login from "./Login";
import Home from "./Home";
import AuthProvider from "./AuthProvider";
import './'
import "./App.css"
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path = "/login">  
            <div className = "login-container">
              <Login />
            </div>
            
            
          </Route>
          <Route exact path = "/">  
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
