import React from 'react'

const Cards = ({ id, suit, value }) => {
    return (
        <div className='card' id={id}>
            <p className='suit'>{suit}</p>
            <p className='value'>{value}</p>
        </div>
    )
}

export default Cards