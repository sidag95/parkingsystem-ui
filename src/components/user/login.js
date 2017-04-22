import React from 'react'
import {Button} from '@blueprintjs/core'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username : '',
        password: ''
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleUsername(e){
    this.setState({
      username: e.target.value,
    })
  }

  handlePassword(e){
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin() {
    this.props.handleUserLogin(this.state.username, this.state.password)
    this.props.onClose()
  }

  render(){
    return (
      <div className="pt-overlay-content">
        <div className="pt-form-group" >
          <label className="pt-label" htmlFor="username" >
            Username
            <span className="pt-text-muted" >(required)</span>
          </label>
          <div className="pt-form-content" >
            <input
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.handleUsername}
            />
          </div>
        </div>
        <div className="pt-form-group" >
          <label className="pt-label" htmlFor="password" >
            Password
            <span className="pt-text-muted" >(required)</span>
          </label>
          <div className="pt-form-content" >
            <input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.handlePassword}
            />
          </div>
        </div>
        <Button text="Submit" iconName="tick" onClick={this.handleLogin} />
      </div>
    )
  }
}

export default Login
