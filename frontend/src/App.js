import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Doctors from './components/Doctors';
import Departments from './components/Departments';
import Patients from './components/Patients';
import Nurses from './components/Nurses';
import Register from './components/Register';
import Treatments from './components/Treatments';
import Medications from './components/Medications';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Frontend</h1>
        </header>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/homePage" component={HomePage} />
          <Route path="/doctors" component={Doctors} />
          <Route path="/departments" component={Departments} />
          <Route path="/patients" component={Patients} />
          <Route path="/nurses" component={Nurses} />
          <Route path="/register" component={Register} />
          <Route path="/treatments" component={Treatments} />
          <Route path="/medications" component={Medications} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
