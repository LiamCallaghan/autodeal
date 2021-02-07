import React from 'react'

import Cards from './Cards'
import CardBacks from './CardBacks'
// import Hand from './Hand'
// import River from './River'

class CardDisplay extends React.Component {
  state = {
    cards: [],
    savedCards: [],
    river: [],
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
          cards.push(new card(v + 1, values[v], suits[i]))
        }
      }
      return cards
    }

    const response = deck()
    this.setState({
      cards: response,
      savedCards: response,
    })
    // console.log(response)
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
        console.log('shuffle step')
      return o
    }

    const response = shuffle(this.state.cards)
    this.setState({
      cards: response,
      savedCards: response,
    })
  }

  handleClick3 = async () => {
    const handsNumber = this.state.players.number
    // if (handsNumber === 3) {
    //   this.setState({
    //     players: {
    //       number: 3,
    //       hands: {
    //         one: [],
    //         two: [],
    //         three: [],
    //       },
    //     },
    //   })
    // } else if (handsNumber === 4) {
    //   this.setState({
    //     players: {
    //       number: 4,
    //       hands: {
    //         one: [],
    //         two: [],
    //         three: [],
    //         four: [],
    //       },
    //     },
    //   })
    // } else if (handsNumber === 5) {
    //   this.setState({
    //     players: {
    //       number: 5,
    //       hands: {
    //         one: [],
    //         two: [],
    //         three: [],
    //         four: [],
    //         five: [],
    //       },
    //     },
    //   })
    // }
    const hand = [[], [], [], [], []]
    // console.log(this.state.players)
    // if (this.state.players.number === 3) {
    //   hand = [[], [], []]
    // }
    // if (this.state.players.number === 4) {
    //   hand = [[], [], [], []]
    // }
    // if (this.state.players.number === 5) {
    //   hand = [[], [], [], [], []]
    // }
    // console.log(hand)
    function deal(savedDeck) {
      let river = []
      function addToHand(addTo) {
        addTo.push(savedDeck[(savedDeck.length - 1)])
        savedDeck.pop()
        // console.log(this.cards)
      }
      function handDeal() {
        addToHand(hand[0])
        addToHand(hand[1])
        // console.log(hand.length)
        if (handsNumber > 2) {
          addToHand(hand[2])
        }
        if (handsNumber > 3) {
          addToHand(hand[3])
        }
        if (handsNumber > 4) {
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
      return [river, hand[0], hand[1], hand[2], hand[3], hand[4]]
    }
    const response = deal(this.state.cards)

    // {console.log(this.state.players.number)}
    this.setState({
      river: response[0],
      players: {
        number: handsNumber,
        hands: {
          one: response[1],
          two: response[2],
          three: response[3],
          four: response[4],
          five: response[5],
        },
      },
    })
  }

  handleClick4 = async () => {
    let newNumber = this.state.players.number
    newNumber -= 1
    console.log(newNumber)

    this.setState({
      players: {
        number: newNumber,
        hands: {
          one: this.state.players.hands.one,
          two: this.state.players.hands.two,
          three: this.state.players.hands.three,
          four: this.state.players.hands.four,
          five: this.state.players.hands.five,
        },
      },
    })
    // console.log(this.state.players.number)
  }

  handleClick5 = async () => {
    let newNumber = this.state.players.number
    newNumber += 1
    console.log(newNumber)

    this.setState({
      players: {
        number: newNumber,
        hands: {
          one: this.state.players.hands.one,
          two: this.state.players.hands.two,
          three: this.state.players.hands.three,
          four: this.state.players.hands.four,
          five: this.state.players.hands.five,
        },
      },
    })
    // console.log(this.state.players.number)
  }

  handleClick6 = async () => {
    let fullHand1 = []
    let fullHand2 = []
    let fullHand3 = []
    let fullHand4 = []
    let fullHand5 = []

    function fullHand(riv, pers, full) {
      pers[5] = pers[0]
      pers[6] = pers[1]
      delete pers[0]
      delete pers[1]
      // console.log(newDeck)
      // newDeck[1].push(pers)
      // newDeck.push(newHand)
      // full.push({ ...riv, ...pers })
      full.push({ ...riv, ...pers })
    }
    fullHand(this.state.river, this.state.players.hands.one, fullHand1)
    fullHand1 = fullHand1[0]
    fullHand(this.state.river, this.state.players.hands.two, fullHand2)
    fullHand2 = fullHand2[0]
    if (this.state.players.number > 2) {
      fullHand(this.state.river, this.state.players.hands.three, fullHand3)
      fullHand3 = fullHand3[0]
    }
    if (this.state.players.number > 3) {
      fullHand(this.state.river, this.state.players.hands.four, fullHand4)
      fullHand4 = fullHand4[0]
    }
    if (this.state.players.number > 4) {
      fullHand(this.state.river, this.state.players.hands.five, fullHand5)
      fullHand5 = fullHand5[0]
    }
    // console.log(fullHand1, fullHand2, fullHand3, fullHand4, fullHand5)
    function findAce(hand, name) {
      if (Object.values(hand).includes('Ace')) {
        console.log('ace in a hand ' + name)
      }
    }
    Object.values(fullHand1).forEach(findAce, 1)
    Object.values(fullHand2).forEach(findAce, 2)
    Object.values(fullHand3).forEach(findAce, 3)
    Object.values(fullHand4).forEach(findAce, 4)
    Object.values(fullHand5).forEach(findAce, 5)
    // console.log(Object.entries(fullHand1))
    // findAce(fullHand2)
    // findAce(fullHand3)
    // findAce(fullHand4)
    // findAce(fullHand5)
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
        <div><h1>{this.state.players.number}</h1></div>
        <div><button className='button' onClick={this.handleClick4}>Number of players: Down</button></div>
        <div><button className='button' onClick={this.handleClick5}>Number of players: Up</button></div>
        <div><button className='button' onClick={this.handleClick3}>deal</button></div>
        <div><button className='button' onClick={this.handleClick6}>solve</button></div>
        <div className='river'>
          {this.state.river.map(card => (<Cards key={card.id} {...card} />))}
        </div>
        <div className='hand'>
          {this.state.players.hands.one.map(card => (<Cards key={card.id} {...card} />))}
        </div>
        <div className='hand'>
          {this.state.players.hands.two.map(card => (<Cards key={card.id} {...card} />))}
        </div>
        <div className='hand'>
          {this.state.players.number > 2 ? this.state.players.hands.three.map(card => (<Cards key={card.id} {...card} />)) : 'Not playing'}
          {/* {console.log(this.state.players.number)} */}
        </div>
        <div className='hand'>
          {this.state.players.number > 3 ? this.state.players.hands.four.map(card => (<Cards key={card.id} {...card} />)) : 'Not playing'}
        </div>
        <div className='hand'>
          {this.state.players.number > 4 ? this.state.players.hands.five.map(card => (<Cards key={card.id} {...card} />)) : 'Not playing'}
        </div>
      </>
    )
  }
}

export default CardDisplay