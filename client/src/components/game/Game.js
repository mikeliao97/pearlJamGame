import React from 'react'
import { connect } from 'react-redux'
import UserNavBar from '../userNavBar/UserNavBar'
import Modal from 'boron/OutlineModal'


import style from './game-css.js'

class Game extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    var scripts = document.getElementById('scripts')

    let script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js'
    script.async = false
    scripts.appendChild(script)

    let script1 = document.createElement('script')
    script1.src = 'https://ddu0j6ouvozck.cloudfront.net/phaser.min.js'
    script1.async = false
    scripts.appendChild(script1)

    let script2 = document.createElement('script')
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js'
    script2.async = false
    scripts.appendChild(script2)

    let script3 = document.createElement('script')
    script3.src = 'https://ddu0j6ouvozck.cloudfront.net/socket.js'
    script3.async = false
    scripts.appendChild(script3)

    let script4 = document.createElement('script')
    script4.src = 'https://ddu0j6ouvozck.cloudfront.net/deployment.min.js'
    script4.async = false
    scripts.appendChild(script4)


    this.showModal();
  }

  componentDidUpdate() {
    this.showModal();
  }

  showModal () {
    this.refs.modal.show()
  }

  hideModal () {
    this.refs.modal.hide()
  }


  render () {
    const { user } = this.props
    const { games } = this.props
    const { currentGame } = games
   var modalStyle = {
      height: '90%',
      width: '90%',
    }
    return (
      <div id='scripts'>
        <UserNavBar  />
          <div style={style.container}>
            <div id='game' />
          </div>
      </div>
    )
  }
}

const mapStateToProps = ({ games, user }) => {
  return { games, user }
}

export default connect(mapStateToProps)(Game)
