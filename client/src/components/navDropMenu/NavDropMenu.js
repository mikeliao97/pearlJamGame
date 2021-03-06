import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

/* * Utils * */
import { firebaseApp } from '../../base'

/* * Styles * */
import style from './navDropMenu-css'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'

const auth = firebaseApp.auth()

class NavDropMenu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount () {
  }

  handleTouchTap (event) {
    event.preventDefault()
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose () {
    this.setState({
      open: false
    })
  }

  handleLogout (event) {
    event.preventDefault()
    const self = this
    auth.signOut()
    .then(function () {
      console.log('handled logout')
      console.log(this )
      self.context.router.history.push('/')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render () {
    const { button2 } = style
    return (
      <div>
        <FlatButton
          style={button2}
          label='More'
          onTouchTap={::this.handleTouchTap}
          secondary />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={::this.handleRequestClose}>
          <Menu>
            <MenuItem containerElement={<Link to='/' />} primaryText='Leaderboard' />
            <MenuItem containerElement={<Link to='/' />} primaryText='Add Friend' />
            <Divider />
            <MenuItem label='Logout' onClick={::this.handleLogout} primaryText='Logout' />
          </Menu>
        </Popover>
      </div>
    )
  }
}

NavDropMenu.contextTypes = {
  router: PropTypes.object
}

export default NavDropMenu
