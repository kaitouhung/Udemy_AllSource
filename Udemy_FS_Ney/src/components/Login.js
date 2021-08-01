import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/users';

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  _handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  _handleSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    const { loginRequest, history } = this.props;
    loginRequest({ username, password, history });
  }

  render() {
    const { username, password } = this.state;
    const { users: { submittingLogin, messageError } } = this.props;
    return (
      <>
        <div className="bootstrap-iso">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <form method="post">
                  <div className="form-group ">
                    <label className="control-label requiredField" htmlFor="name">
                      USERNAME
                      <span className="asteriskField">
                        *
                      </span>
                    </label>
                    <input 
                      className="form-control" 
                      name="username" 
                      type="text" 
                      value={username}
                      onChange={e => this._handleChange(e)}
                      />
                  </div>
                  <div className="form-group ">
                    <label className="control-label requiredField" htmlFor="name1">
                      PASSWORD
                      <span className="asteriskField">
                        *
                      </span>
                    </label>
                    <input 
                      className="form-control" 
                      id="name1" 
                      name="password" 
                      type="text" 
                      value={password}
                      onChange={e => this._handleChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <div>
                      <button className="btn btn-primary " name="submit" type="submit"
                        onClick={e => this._handleSubmit(e)}
                      >
                        {submittingLogin ? 'Loading ...': 'Login'}
                      </button>
                      {messageError && <strong style={{color: 'red'}}>
                        {Object.is(messageError, 'pwd_not_matching') && 'PWD Không Đúng'}
                        </strong>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { users } = state;
  return {
    users: users
  }
}

export default connect(mapStateToProps, { loginRequest })(Login);