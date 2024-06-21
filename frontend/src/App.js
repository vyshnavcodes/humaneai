// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Auth from './components/Auth';
import Profile from './components/Profile';
import Chatbot from './components/Chatbot';

const ProtectedRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      token ? <Component {...props} token={token} /> : <Redirect to="/auth" />
    }
  />
);

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Humane AI</h1>
          <nav>
            <Link to="/auth">Auth</Link> | <Link to="/profile">Profile</Link> | <Link to="/chatbot">Chatbot</Link>
          </nav>
          <Switch>
            <Route path="/auth" component={Auth} />
            <ProtectedRoute path="/profile" token={token} component={Profile} />
            <ProtectedRoute path="/chatbot" token={token} component={Chatbot} />
            <Route path="/" component={Auth} />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;