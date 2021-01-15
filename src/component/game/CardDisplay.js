import React from 'react'

import Cards from './Cards'
// import { createDeck } from '../../lib/deck'

class CardDisplay extends React.Component {
  state = {
    cards: [],
  }

  async componentDidMount() {
    function card(number, value, suit) {
      this.number = number
      this.value = value
      this.suit = suit
    }
    
    function deck() {
      const values = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']
      const suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds']
      const cards = []
    
      for (let i = 0; i < suits.length; i++) {
        for (let v = 0; v < values.length; v++) {
          cards.push( new card( v + 1, values[v], suits[i]))
        }
      }
      return cards
    }


    const response = deck()
    this.setState({
      cards: response,
    })
    console.log(response)
  }

  render() {
    if (!this.state.cards) return null
    return (
      <div className='deck'>
        {this.state.cards.map(card => (<Cards key={card.id} {...card} />))}
      </div>
    )
  }
}

export default CardDisplay