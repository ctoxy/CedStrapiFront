import React from 'react';
import {BrowserRouter , Switch, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <h2>Ced Application</h2>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
