 import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/* * Utils * */
import { firebaseApp, checkDisplaynameUnique } from '../../base'

/* * Components * */
import ColorPicker from '../colorPicker/ColorPicker'

/* * Actions * */
import { updateUserInfo } from '../../actions/userActions'

/* * Styles * */
import TextField from 'material-ui/TextField'
import style from './setDisplayNamePage-css'

const auth = firebaseApp.auth()
const base = firebaseApp.database()

class SetDisplayNamePage extends Component {
  constructor () {
    super()
    this.state = {
      hovering: false,
      displayName: '',
      instructions: 'pick a color and set your username',
      colorHex: '#f44336'
    }
  }

  /* * { target } is deconstructed from event.target * */
  handleInputChange ({ target }) {
    const displayName = target.value
    this.setState({ displayName })
  }



  handleSubmit (event) {
    const { updateUserInfo, user } = this.props
    const { displayName, colorHex, colorIdx } = this.state
    const { uid } = user
    const baseUser = auth.currentUser
    const promise = checkDisplaynameUnique(displayName)
    promise.then(unique => {
      if (unique) {
        updateUserInfo({ uid, displayName, avatarColorID: colorIdx })
        this.context.router.history.push('/home')
      } else {
        const instructions = 'oh snap, that username\
        has been taken!\
        try a different one :)'
        this.setState({ instructions })
      }
    })
  }

  toggleHover () {
    this.setState({hovering: !this.state.hovering})
  }

  getColorThroughProps (colorHex, colorIdx) {
    this.setState({ colorHex: colorHex.hex, colorIdx })
  }
  render () {
    const { container, title, colorPicker, inputContainer, textField, input, underLine, buttonContainer, button, buttonHover } = style
    const { hovering, displayName, instructions, colorHex } = this.state

    return (
      <div style={container}>
        <div style={title}>{instructions}</div>
        <div style={colorPicker}>
        <ColorPicker
          getColorThroughProps={::this.getColorThroughProps}
          color={colorHex}/>
          </div>
        <div style={inputContainer}>
          <TextField
            style={textField}
            inputStyle={{...input, ...{ color: colorHex }}}
            underlineFocusStyle={underLine}
            value={displayName}
            onChange={(event) => this.handleInputChange(event)}
            />
        </div>
        <div style={buttonContainer}>
          <button
            style={hovering ? buttonHover : button}
            onMouseEnter={::this.toggleHover}
            onMouseLeave={::this.toggleHover}
            onClick={::this.handleSubmit }>
        submit
        </button>
        </div>
      </div>
    )
  }
}

SetDisplayNamePage.contextTypes = {
  router: PropTypes.object
}

const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps, { updateUserInfo })(SetDisplayNamePage)
