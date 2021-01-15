import React from 'react'

const Cards = ({ suit, value }) => {
  return (
    <div className={'card ' + suit}>
      <p className='suit'>{suit}</p>
      <p className='value'>{value}</p>
    </div>
  )
}

export default Cards