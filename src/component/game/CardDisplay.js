import React from 'react'

import Cards from './Cards'
import { createDeck } from '../../lib/deck'

class CardDisplay extends React.Component {
    state = {
        cards: null
    }

    async componentDidMount() {

          const response = await createDeck()
          this.setState({
              cards: response
          })
          console.log(this.state.cards)
    }

    render() {
        if (!this.state.cards) return null
        return (
            <div className='deck'>
                {this.state.categories.map(card => (<Cards key={card.id} {...card} />))}
            </div>
        )
    }
}

export default CardDisplay