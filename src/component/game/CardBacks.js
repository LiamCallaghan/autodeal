import React from 'react'

const Cards = ({ suit }) => {
  return (
    <div className={'cardBack card ' + suit}>
    </div>
  )
}

export default Cards