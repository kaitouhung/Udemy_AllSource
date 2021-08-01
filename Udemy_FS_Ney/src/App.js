import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { PrivateRoute, PublicRouter } from './helpers';
import { Dashboard,  }  from './components';
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import Comments from './components/Comments';
import Products from './components/Products';

function App() {
  return (
    <>
      <Router>
        <div class="container">
          <ul class="list-group">
            <li class="list-group-item">
              <Link to='/'>Home</Link>
            </li>
            <li class="list-group-item">
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>

          <PublicRouter exact={true} path={'/'} component={Home}/>
          <PublicRouter path={'/login'} component={Login}/>
          <PrivateRoute path={'/dashboard'} component={Dashboard}/>
          <PrivateRoute path={'/dashboard/users'} component={Users}/>
          <PrivateRoute path={'/dashboard/products'} component={Products}/>
          <PrivateRoute path={'/dashboard/comments'} component={Comments}/>
        </div>
      </Router>
    </>
  );
}

export default App;
