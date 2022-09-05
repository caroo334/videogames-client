import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import '../styles/Details.css';


export default function Detail(props) {
    console.log('esto me traen las props', props);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id)) //accedo al id del dettale
    }, [dispatch])

    const myGames = useSelector((state) => state.detail)

    const renderGenres = () => {
        if (myGames && myGames.genres && myGames.genres.length > 0) {
            return <div>
                <h1 className='detail-genre-title'>Genres: </h1>
                <div className='detail-genre'>
                    {
                        myGames.genres.map(genre => <h3 className='detail-genre-list'>  {genre.name},  </h3>)
                    }
                </div>
            </div>
        }
    }

    const renderPlatforms = () => {
        if (myGames && myGames.platforms && myGames.platforms.length > 0) {
            return <div>

                <ul className='detail-platform'>
                    <h4>You can play on the platforms:</h4>
                    {myGames.platforms.map(p => <li className='detail-list'>{p.platform.name}</li>)}

                </ul>
            </div>
        }
    }

    return (

        <div className='detail-container'>
            <Link to='/home'>
                <button className='detail-button'>Home</button>
            </Link>
            {
                myGames ?
                    <div className='detail-subcontainer'>

                        <h1 className='detail-name'>{myGames.name}</h1>
                        <img className='detail-img' src={myGames.background_image} alt='Imagen del Juego' />

                        {renderGenres()}
                        <span className='detail-rating'>rating: {myGames.rating}</span>
                        <p className='detail-description'>{myGames.description_raw}</p>
                        {renderPlatforms()}
                        <span className='detail-span-website'><a href={myGames.website} target="_blank" className='detail-website'> Website: {myGames.website}</a> </span>
                    </div> : <p className='details-loading'> Loading...</p>
            }

        </div>
    )
}