import React from 'react'

import Cards from './Cards'

const Hand = ({ cards }) => {
  return (
    <div className={'hand'}>
      {cards.map(card => (<Cards key={card.id} {...card} />))}
    </div>
  )
}

export default Hand