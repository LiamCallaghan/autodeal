import React from 'react'

import Cards from './Cards'

const River = ({ cards }) => {
  return (
    <div className={'river'}>
      {cards.map(card => (<Cards key={card.id} {...card} />))}
    </div>
  )
}

export default River