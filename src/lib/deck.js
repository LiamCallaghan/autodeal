export const createDeck = () => {
    
  function card(number, value, suit) {
    this.number = number
    this.value = value
    this.suit = suit
  }
  
  function deck(){
    this.values = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']
    this.suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds']
    const cards = []
  
    for (let i = 0; i < this.suits.length; i++) {
      for (let v = 0; i < this.values.length; i++) {
        cards.push( new card( v + 1, this.values[v], this.suits[i]))
      }
    }
    return cards
  }

  deck()
}


export const stackDeck = (deck, stack) => {
  if (deck.classList.contains('display')) {
    deck.classList.remove('display')
    stack.classList.add('display')
  } else {
    deck.classList.add('display')
    stack.classList.remove('display')
  }
}
