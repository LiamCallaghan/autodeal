import React from 'react'

import Cards from './Cards'
import CardBacks from './CardBacks'

class CardDisplay extends React.Component {
  state = {
    cards: [],
    river: [],
    players: {
      number: 2,
      hands: {
        1: [],
        2: [],
      },
    },
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

    let handsNumber = this.state.players.number
    if (handsNumber = 3) {
      this.setState({
        players: {
          number: 3,
          hands: {
            1: [],
            2: [],
            3: [],
          }
        }
      })
    } else if (handsNumber = 4) {
      this.setState({
        players: {
          number: 4,
          hands: {
            1: [],
            2: [],
            3: [],
            4: [],
          }
        }
      })
    } else {
      this.setState({
        players: {
          number: 5,
          hands: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
          }
        }
      })
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

  handleClick3 = async () => {
    function deal(deck, [hand]) {
      let river = []
      function addToHand(addTo) {
        addTo.push(deck[(deck.length - 1)])
        deck.pop()
      }
      function handDeal() {
        addToHand(hand[0])
        addToHand(hand[1])
        if (hand.length != 2) {
          addToHand(hand[2])
        }
        if (hand.length != 3) {
          addToHand(hand[3])
        }
        if (hand.length != 4) {
          addToHand(hand[4])
        }
        if (hand.length != 5) {
          addToHand(hand[5])
        }
      }
      function riverDeal() {
        let burn = []
        let riverHand = []
        addToHand(burn)
        addToHand(riverHand)
        addToHand(riverHand)
        addToHand(riverHand)
        addToHand(burn)
        addToHand(riverHand)
        addToHand(burn)
        addToHand(riverHand)
        river = riverHand
      }
      handDeal()
      handDeal()
      riverDeal()
      return [hand, river]
    }
    const response = deal(this.state.cards, [...this.state.players.hands])
    console.log(response)
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
        <div><button className='button' onClick={this.handleClick3}>deal</button></div>
      </>
    )
  }
}

export default CardDisplay