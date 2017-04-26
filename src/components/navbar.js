import React from 'react'
import {Overlay, Button} from '@blueprintjs/core'

import Login from './user/login'
import SignUp from './user/signup'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginVisible: false,
      signUpVisible: false,
    }

    this.toggleLoginVisible = this.toggleLoginVisible.bind(this)
    this.toggleSignUpVisible = this.toggleSignUpVisible.bind(this)
  }

  toggleLoginVisible () {
    this.setState({
      loginVisible: !this.state.loginVisible,
    })
  }

  toggleSignUpVisible () {
    this.setState({
      signUpVisible: !this.state.signUpVisible,
    })
  }

  render () {
    if (this.state.loginVisible) {
      return (
        <Overlay isOpen={this.state.loginVisible} isClose={!this.state.loginVisible} >
          <Login
            handleUserLogin = {this.props.handleUserLogin}
            onClose={this.toggleLoginVisible}
          />
        </Overlay>
      )
    }

    if (this.state.signUpVisible) {
      return (
        <Overlay isOpen={this.state.signUpVisible} isClose={!this.state.signUpVisible} >
          <SignUp
            handleUserSignUp={this.props.handleUserSignUp}
            onClose={this.toggleSignUpVisible}
          />
        </Overlay>
      )
    }

    return (
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-header">
            <div className="title">'Placeholder'</div>
            <div className="button-group">
              <Button text="Login" onClick={this.toggleLoginVisible} />
              <Button text="SignUp" onClick={this.toggleSignUpVisible} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
