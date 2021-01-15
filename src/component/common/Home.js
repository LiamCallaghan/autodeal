import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {

    state = {
      image: null,
    }

    render(){

      return (
        <Link to='/deck'>
          <div>Game</div>
        </Link>
      )
    }
}

export default Home