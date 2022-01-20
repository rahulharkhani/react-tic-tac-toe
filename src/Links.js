import React from 'react';
import Game from './Game';
import ToDoList from './Form';
//import './App.css';
import {BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BootstrapDemo from './bootstrapDemo';

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <Game />;
        </div>
    );
}
/*function About() {
    return <h2>About</h2>;
}*/

function Users() {
    return(
        <div>
            <h2>Users</h2>
            <BootstrapDemo />
        </div>    
    );
}

class Links extends React.Component{

    render() {
        return (
            <Router>
              <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <Link class="nav-link active" to="/">Tic Toc Toe Game</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" to="/todo">To Do List</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" to="/users">Users</Link>
                    </li>
                </ul>
                {/*<nav>
                  <ul>
                    <li>
                      <Link to="/">Tic Toc Toe Game</Link>
                    </li>
                    <li>
                      <Link to="/todo">To Do List</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                  </ul>
                </nav>*/}
        
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/todo">
                    <ToDoList />
                    {/*<About />*/}
                  </Route>
                  <Route path="/users">
                    <Users />
                  </Route>
                  <Route path="/">
                    {/*<Game />*/}
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          );
    }
}

export default Links;