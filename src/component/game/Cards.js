import React from 'react'

const Cards = ({ id, suit, value }) => {
    return (
        <div id={id}>
            <h2>{suit}</h2>
            <h2>{value}</h2>
        </div>
    )
}

export default Cards