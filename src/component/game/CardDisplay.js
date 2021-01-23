import React from 'react'

import Cards from './Cards'
import CardBacks from './CardBacks'

class CardDisplay extends React.Component {
  state = {
    cards: [],
    display: 'display',
    stack: 'none',
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

  handleClick = async () => {
    if (this.state.display === 'none') {
      this.setState({
        display: 'display',
        stack: 'none',
      })
    } else {
      this.setState({
        display: 'none',
        stack: 'display',
      })
    }
  }

  handleClick2 = async () => {
    function shuffle(o) {
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
        console.log(o)
      return o
    }

    const response = shuffle(this.state.cards)
    this.setState({
      cards: response,
    })
  }

  render() {
    if (!this.state.cards) return null
    return (
      <>
        <div className={'deck ' + this.state.display}>
          {this.state.cards.map(card => (<Cards key={card.id} {...card} />))}
        </div>
        <div className={'stack ' + this.state.stack}>
          {this.state.cards.map(card => (<CardBacks key={card.id} {...card} />))}
        </div>
        <div><button className='button' onClick={this.handleClick}>close</button></div>
        <div><button className='button' onClick={this.handleClick2}>shuffle</button></div>
      </>
    )
  }
}

export default CardDisplay