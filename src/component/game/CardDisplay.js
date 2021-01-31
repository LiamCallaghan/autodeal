import React from 'react'

import Cards from './Cards'
import CardBacks from './CardBacks'
// import Hand from './Hand'
// import River from './River'

class CardDisplay extends React.Component {
  state = {
    cards: [],
    river: [],
    players: {
      number: 2,
      hands: {
        one: [],
        two: [],
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
    const handsNumber = this.state.players.number
    if (handsNumber === 3) {
      this.setState({
        players: {
          number: 3,
          hands: {
            one: [],
            two: [],
            three: [],
          },
        },
      })
    } else if (handsNumber === 4) {
      this.setState({
        players: {
          number: 4,
          hands: {
            one: [],
            two: [],
            three: [],
            four: [],
          },
        },
      })
    } else if (handsNumber === 5) {
      this.setState({
        players: {
          number: 5,
          hands: {
            one: [],
            two: [],
            three: [],
            four: [],
            five: [],
          },
        },
      })
    }
    let hand = [[], []]
    // console.log(this.state.players.number)
    if (this.state.players.number === 3) {
      hand = [[], [], []]
    }
    if (this.state.players.number === 4) {
      hand = [[], [], [], []]
    }
    if (this.state.players.number === 5) {
      hand = [[], [], [], [], []]
    }
    function deal(deck) {
      let river = []
      function addToHand(addTo) {
        addTo.push(deck[(deck.length - 1)])
        deck.pop()
      }
      function handDeal() {
        addToHand(hand[0])
        addToHand(hand[1])
        console.log(hand.length)
        if (hand.length > 2) {
          addToHand(hand[2])
        }
        if (hand.length > 3) {
          addToHand(hand[3])
        }
        if (hand.length > 4) {
          addToHand(hand[4])
        }
      }
      function riverDeal() {
        const burn = []
        const riverHand = []
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
      return [hand[0], hand[1], river]
    }
    const savedDeck = this.state.cards
    const response = deal(this.state.cards)
    console.log(response)
    this.setState({
      cards: savedDeck,
      river: response[2],
      players: {
        hands: {
          one: response[0],
          two: response[1],
        },
      },
    })
    console.log(this.state.players.hands)
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
        <div className='river'>
          {this.state.river.map(card => (<Cards key={card.id} {...card}/>))}
        </div>
        {/* <div className='hand1'>
          {this.state.players.hands.1.map(card => (<Hand key={card.id} {...card}/>))}
        </div>
        <div className='hand2'>
          {this.state.players.hands.2.map(card => (<Hand key={card.id} {...card}/>))}
        </div> */}
      </>
    )
  }
}

export default CardDisplay