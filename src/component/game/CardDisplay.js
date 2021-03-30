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
    fullHand1 = Object.values(fullHand1[0])
    fullHand(this.state.river, this.state.players.hands.two, fullHand2)
    fullHand2 = Object.values(fullHand2[0])
    if (this.state.players.number > 2) {
      fullHand(this.state.river, this.state.players.hands.three, fullHand3)
      fullHand3 = Object.values(fullHand3[0])
    }
    if (this.state.players.number > 3) {
      fullHand(this.state.river, this.state.players.hands.four, fullHand4)
      fullHand4 = Object.values(fullHand4[0])
    }
    if (this.state.players.number > 4) {
      fullHand(this.state.river, this.state.players.hands.five, fullHand5)
      fullHand5 = Object.values(fullHand5[0])
    }
    // console.log(fullHand1, fullHand2, fullHand3, fullHand4, fullHand5)
    let spadesCount = 0
    let clubsCount = 0
    let diamondsCount = 0
    let heartsCount = 0
    let straightCount = 0
    let pairCount = 0
    let threeCount = 0
    let fourCount = 0
    function flat() {
      spadesCount = 0
      clubsCount = 0
      diamondsCount = 0
      heartsCount = 0
      straightCount = 0
      pairCount = 0
      threeCount = 0
      fourCount = 0
    }
    function findResult(hand) {
      // console.log(Object.values(hand))
      function flushTest(count) {
        if (Object.values(count).includes('Spades')) {
          spadesCount += 1
        }
        if (Object.values(count).includes('Clubs')) {
          clubsCount += 1
        }
        if (Object.values(count).includes('Diamonds')) {
          diamondsCount += 1
        }
        if (Object.values(count).includes('Hearts')) {
          heartsCount += 1
        }
      }
      flushTest(hand)
      if (Object.values(hand).includes('Ace')) {
        console.log('ace in hand')
      }
    }
    function test1(card){
      fullHand1.forEach(function(C){
        if (C.number === card.number + 1) {
          fullHand1.forEach(function(C){
            if (C.number === card.number + 2) {
              fullHand1.forEach(function(C){
                if (C.number === card.number + 3) {
                  fullHand1.forEach(function(C){
                    if (C.number === card.number + 4) {
                      fullHand1.forEach(function(C){
                        if (C.number === card.number + 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function straightDown1(card){
      fullHand1.forEach(function(C){
        if (C.number === card.number - 1) {
          fullHand1.forEach(function(C){
            if (C.number === card.number - 2) {
              fullHand1.forEach(function(C){
                if (C.number === card.number - 3) {
                  fullHand1.forEach(function(C){
                    if (C.number === card.number - 4) {
                      fullHand1.forEach(function(C){
                        if (C.number === card.number - 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function pairsTest1(card){
      fullHand1.forEach(function(C){
        if (C.number === card.number && C.suit !== card.suit) {
          const D = C.suit
          console.log('Pair in hand')
          pairCount += 1
          fullHand1.forEach(function(C){
            if (C.number === card.number && C.suit !== card.suit && C.suit !== D) {
              const E = C.suit
              console.log('Three of a kind in hand')
              threeCount += 1
              fullHand1.forEach(function(C){
                if (C.number === card.number && C.suit !== card.suit && C.suit !== D && C.suit !== E) {
                  console.log('Four of a kind in hand')
                  fourCount += 1
                }
              })
            }
          })
        }
      })
    }
    function test2(card){
      fullHand2.forEach(function(C){
        if (C.number === card.number + 1) {
          fullHand2.forEach(function(C){
            if (C.number === card.number + 2) {
              fullHand2.forEach(function(C){
                if (C.number === card.number + 3) {
                  fullHand2.forEach(function(C){
                    if (C.number === card.number + 4) {
                      fullHand2.forEach(function(C){
                        if (C.number === card.number + 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function straightDown2(card){
      fullHand2.forEach(function(C){
        if (C.number === card.number - 1) {
          fullHand2.forEach(function(C){
            if (C.number === card.number - 2) {
              fullHand2.forEach(function(C){
                if (C.number === card.number - 3) {
                  fullHand2.forEach(function(C){
                    if (C.number === card.number - 4) {
                      fullHand2.forEach(function(C){
                        if (C.number === card.number - 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function pairsTest2(card){
      fullHand2.forEach(function(C){
        if (C.number === card.number && C.suit !== card.suit) {
          const D = C.suit
          console.log('Pair in hand')
          fullHand2.forEach(function(C){
            if (C.number === card.number && C.suit !== card.suit && C.suit !== D) {
              const E = C.suit
              console.log('Three of a kind in hand')
              fullHand2.forEach(function(C){
                if (C.number === card.number && C.suit !== card.suit && C.suit !== D && C.suit !== E) {
                  console.log('Four of a kind in hand')
                }
              })
            }
          })
        }
      })
    }
    function test3(card){
      fullHand3.forEach(function(C){
        if (C.number === card.number + 1) {
          fullHand3.forEach(function(C){
            if (C.number === card.number + 2) {
              fullHand3.forEach(function(C){
                if (C.number === card.number + 3) {
                  fullHand3.forEach(function(C){
                    if (C.number === card.number + 4) {
                      fullHand3.forEach(function(C){
                        if (C.number === card.number + 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function straightDown3(card){
      fullHand3.forEach(function(C){
        if (C.number === card.number - 1) {
          fullHand3.forEach(function(C){
            if (C.number === card.number - 2) {
              fullHand3.forEach(function(C){
                if (C.number === card.number - 3) {
                  fullHand3.forEach(function(C){
                    if (C.number === card.number - 4) {
                      fullHand3.forEach(function(C){
                        if (C.number === card.number - 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function pairsTest3(card){
      fullHand3.forEach(function(C){
        if (C.number === card.number && C.suit !== card.suit) {
          const D = C.suit
          console.log('Pair in hand')
          fullHand3.forEach(function(C){
            if (C.number === card.number && C.suit !== card.suit && C.suit !== D) {
              const E = C.suit
              console.log('Three of a kind in hand')
              fullHand3.forEach(function(C){
                if (C.number === card.number && C.suit !== card.suit && C.suit !== D && C.suit !== E) {
                  console.log('Four of a kind in hand')
                }
              })
            }
          })
        }
      })
    }
    function test4(card){
      fullHand4.forEach(function(C){
        if (C.number === card.number + 1) {
          fullHand4.forEach(function(C){
            if (C.number === card.number + 2) {
              fullHand4.forEach(function(C){
                if (C.number === card.number + 3) {
                  fullHand4.forEach(function(C){
                    if (C.number === card.number + 4) {
                      fullHand4.forEach(function(C){
                        if (C.number === card.number + 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function straightDown4(card){
      fullHand4.forEach(function(C){
        if (C.number === card.number - 1) {
          fullHand4.forEach(function(C){
            if (C.number === card.number - 2) {
              fullHand4.forEach(function(C){
                if (C.number === card.number - 3) {
                  fullHand4.forEach(function(C){
                    if (C.number === card.number - 4) {
                      fullHand4.forEach(function(C){
                        if (C.number === card.number - 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function pairsTest4(card){
      fullHand4.forEach(function(C){
        if (C.number === card.number && C.suit !== card.suit) {
          const D = C.suit
          console.log('Pair in hand')
          fullHand4.forEach(function(C){
            if (C.number === card.number && C.suit !== card.suit && C.suit !== D) {
              const E = C.suit
              console.log('Three of a kind in hand')
              fullHand4.forEach(function(C){
                if (C.number === card.number && C.suit !== card.suit && C.suit !== D && C.suit !== E) {
                  console.log('Four of a kind in hand')
                }
              })
            }
          })
        }
      })
    }
    function test5(card){
      fullHand5.forEach(function(C){
        if (C.number === card.number + 1) {
          fullHand5.forEach(function(C){
            if (C.number === card.number + 2) {
              fullHand5.forEach(function(C){
                if (C.number === card.number + 3) {
                  fullHand5.forEach(function(C){
                    if (C.number === card.number + 4) {
                      fullHand5.forEach(function(C){
                        if (C.number === card.number + 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function straightDown5(card){
      fullHand5.forEach(function(C){
        if (C.number === card.number - 1) {
          fullHand5.forEach(function(C){
            if (C.number === card.number - 2) {
              fullHand5.forEach(function(C){
                if (C.number === card.number - 3) {
                  fullHand5.forEach(function(C){
                    if (C.number === card.number - 4) {
                      fullHand5.forEach(function(C){
                        if (C.number === card.number - 5) {
                          console.log(straightCount + 1)
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
    function pairsTest5(card){
      fullHand5.forEach(function(C){
        if (C.number === card.number && C.suit !== card.suit) {
          const D = C.suit
          console.log('Pair in hand')
          fullHand5.forEach(function(C){
            if (C.number === card.number && C.suit !== card.suit && C.suit !== D) {
              const E = C.suit
              console.log('Three of a kind in hand')
              fullHand5.forEach(function(C){
                if (C.number === card.number && C.suit !== card.suit && C.suit !== D && C.suit !== E) {
                  console.log('Four of a kind in hand')
                }
              })
            }
          })
        }
      })
    }

    console.log('checking first hand')
    Object.values(fullHand1).forEach(findResult)
    console.log('Spades: ' + spadesCount, 'Clubs: ' + clubsCount, 'Diamonds: ' + diamondsCount,'Hearts: ' + heartsCount)
    fullHand1.forEach(test1)
    fullHand1.forEach(straightDown1)
    fullHand1.forEach(pairsTest1)
    console.log((threeCount < 1 || fourCount < 1) ? (`pairs: ${pairCount}`) : null)
    flat()
    console.log('checking second hand')
    Object.values(fullHand2).forEach(findResult)
    console.log('Spades: ' + spadesCount, 'Clubs: ' + clubsCount, 'Diamonds: ' + diamondsCount,'Hearts: ' + heartsCount)
    fullHand2.forEach(test2)
    fullHand2.forEach(straightDown2)
    fullHand2.forEach(pairsTest2)
    flat()
    console.log('checking third hand')
    Object.values(fullHand3).forEach(findResult)
    console.log('Spades: ' + spadesCount, 'Clubs: ' + clubsCount, 'Diamonds: ' + diamondsCount,'Hearts: ' + heartsCount)
    fullHand3.forEach(test3)
    fullHand3.forEach(straightDown3)
    fullHand3.forEach(pairsTest3)
    flat()
    console.log('checking fourth hand')
    Object.values(fullHand4).forEach(findResult)
    console.log('Spades: ' + spadesCount, 'Clubs: ' + clubsCount, 'Diamonds: ' + diamondsCount,'Hearts: ' + heartsCount)
    fullHand4.forEach(test4)
    fullHand4.forEach(straightDown4)
    fullHand4.forEach(pairsTest4)
    flat()
    console.log('checking fifth hand')
    Object.values(fullHand5).forEach(findResult)
    console.log('Spades: ' + spadesCount, 'Clubs: ' + clubsCount, 'Diamonds: ' + diamondsCount,'Hearts: ' + heartsCount)
    fullHand5.forEach(test5)
    fullHand5.forEach(straightDown5)
    fullHand5.forEach(pairsTest5)
    flat()
    // findAce(Object.values(fullHand1)[1], '1')
    // findAce(Object.values(fullHand2)[1], '2')
    // findAce(Object.values(fullHand3)[1], '3')
    // findAce(Object.values(fullHand4)[1], '4')
    // findAce(Object.values(fullHand5)[1], '5')
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