import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { logout } from '../actions/users';
// import { getListProducts } from '../actions/products';

export class Dashboard extends Component {

  _handleLogout = () => {
    const { history } = this.props;
    logout(history);  
  }

  // componentDidMount = async () => {
  //   getListProducts();
  // }

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand">
              <Link to='/dashboard/users'>Users</Link>
          </span>
          <span className="navbar-brand">
              <Link to='/dashboard/products'>Products</Link>
          </span>
          <span className="navbar-brand">
              <Link to='/dashboard/comments'>Comments</Link>
          </span>
          <span className="navbar-brand">
            <button className="btn btn-danger" onClick={() => this._handleLogout()}>Logout</button>
          </span>
        </nav>  
      </>
    );
  }
}