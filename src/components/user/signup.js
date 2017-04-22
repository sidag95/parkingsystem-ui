import React from 'react'
import {Button} from '@blueprintjs/core'

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password: '',
      name: ''
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
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

  handleName(e){
    this.setState({
      name: e.target.value,
    })
  }

  handleSignUp() {
    this.props.handleUserSignUp(this.state.username, this.state.password, this.state.name)
    this.props.onClose()
  }

  render(){
    return (
      <div className="pt-overlay-content">
        <div className="pt-form-group" >
          <label className="pt-label" htmlFor="name" >
            Name
            <span className="pt-text-muted" >(required)</span>
          </label>
          <div className="pt-form-content" >
            <input
              id="name"
              type="text"
              value={this.state.name}
              onChange={this.handleName}
            />
          </div>
        </div>
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
        <Button text="Signup" iconName="tick" onClick={this.handleSignUp} />
      </div>
    )
  }
}

export default SignUp
