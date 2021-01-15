export const createDeck = () => {
    
    function card(number, value, suit) {
        this.number = number
        this.value = value
        this.suit = suit
      }
      
      function deck(){
        this.values = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']
        this.suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds']
        let cards = []
      
        for (i = 0; i < this.suits.length; i++) {
          for (v = 0; i < this.values.length; i++) {
            cards.push( new card( v + 1, this.values[v], this.suits[i]))
          }
        }
        return cards
      }
}

