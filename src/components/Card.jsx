import React from 'react';
import '../styles/Card.css'

export default function Card({ name, image, rating, reviews }) {
    return (
        <div className='super-card'>

            <div className='card-container'>
                <h3 className='card-name'>{name}</h3>
                <img className='card-img' src={image} style={{
                    maxWidth: 400,
                    maxHeight: 400
                }} alt='img not found' />
                <h5 className='card-rating'>Rating: {rating}</h5> {/* poner un input */}
            </div>

        </div>
    )
}