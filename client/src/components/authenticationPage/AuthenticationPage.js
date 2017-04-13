import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import firebaseApp from '../../base'
import firebaseui from 'firebaseui'
import baseUIConfig from './baseUIConfig'

import { createNewUser } from '../../actions/userActions'

import style from './authenticationPage-css'
const { button } = style
const base = firebaseApp.database()
const auth = firebaseApp.auth()
const ui = new firebaseui.auth.AuthUI(auth)

class AuthenticationPage extends Component {
  constructor () {
    super()
    this.state = {
      email: null,
      password: null,
      user: null,
      authenticating: false,
      loggedIn: true
    }
    /**
     * authentication handlers
     */
    this.createUserWithEmail = this.createUserWithEmail.bind(this)
    this.authenticateWithEmail = this.authenticateWithEmail.bind(this)
    ui.start('#firebaseui-auth-container', baseUIConfig)
  }

  authenticateWithProvider (provider) {
    const { authenticateUser } = this.props
    auth.signInWithPopup(provider)
    .then(result => {
      authenticateUser(result)

      const token = result.credential.accessToken
      const { displayName, UID, email, photoURL } = result.user
      // check if user exists (bento)
      // add to reduxStore
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
      console.log('error code: ', errorCode)
      console.log('error message: ', errorMessage)
      console.log('email: ', email)
      console.log('credential: ', credential)
    })
  }

  /* * saving input to access on submit * */
  handleChange ({ target }, key) {
    const { value } = target
    this.setState({ [key]: value })
  }

  /**
   * Creating new user or authenticating existing user
   */
  createUserWithEmail () {
    const { createNewUser } = this.props
    /* * check for real email * */
    const { email, password } = this.state
    const promise = auth.createUserWithEmailAndPassword(email, password)
    promise.then(user => {
      const { uid, email, photoURL } = user
      createNewUser({ uid, email, photoURL })
      this.context.router.history.push('/setusername')
    })
    promise.catch(error => console.log(error.message))
  }

  authenticateWithEmail () {
    const { email, password } = this.state
    const promise = auth.signInWithEmailAndPassword(email, password)
    promise.catch(error => console.log(error.message))
  }

  render () {
    if (!this.state.authenticating) {
      return (
        <div>
          <div>
            <div >
              <h1>Welcome to Pinballish</h1>
              <div>Join the game using your preferred sign in method</div>
            </div>
            <div id='firebaseui-auth-container' />
            <input type='email' placeholder='Email' onChange={(event) => this.handleChange(event, 'email')} />
            <input type='password' placeholder='Password' onChange={(event) => this.handleChange(event, 'password')} />
            <button ref='btnLogin' type='hidden' style={button} onClick={this.authenticateWithEmail}>
            log in
            </button>
            <button id='btnSignUp' style={button} onClick={this.createUserWithEmail}>
            sign up
            </button>
          </div>
        </div>
      )
    }
  }
}

AuthenticationPage.contextTypes = {
  router: PropTypes.object
}

export default connect(null, { createNewUser })(AuthenticationPage)