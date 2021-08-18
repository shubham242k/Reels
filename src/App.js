import {BrowserRouter as Router,Switch, Route} from "react-router-dom"
import Login from "./Login";
import Home from "./Home";
import AuthProvider from "./AuthProvider";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path = "/login">  
            <Login />
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
