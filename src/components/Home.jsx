import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres, filterCreated, orderByName, orderByRating } from '../actions';
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import '../styles/Home.css'
import { useHistory } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.games); // es lo mismo que hacer maps state to props
    const allGenres = useSelector((state) => state.genres);
    const history = useHistory();

    const [orden, setOrden] = useState('');
    //Paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGame = allGames.slice(indexOfFirstGame, indexOfLastGame); //es el arreglo del estado //guarda todos los juegos que voy a tener en cada pagina

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getGames()); //es lo mismo que hacer maps dispatch to props
        dispatch(getGenres());

    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getGames());
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value)) // e.target.value es el payload
    }

    const handleSelectGenres = (e) => {
        e.preventDefault()
        dispatch(getGames(String(e.target.value).toLowerCase()));
    }

    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1); // seteo la pg principal
        setOrden(`Ordenado ${e.target.value}`) // mofifica el estado local y se renderiza
    }
    function handleOrderByRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value);
    }

    return (
        <div className="home-container">
            <nav className="home-nav">
                <Link to='/game-create'>
                    <button className="home-button">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span> Create Game
                    </button>
                </Link>
                <SearchBar />

                <button className="home-button reload" onClick={e => { handleClick(e) }}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span> Reload Games
                </button>
            </nav>

            <div>
                <h1>GAMES</h1>
                {/* filtrar por generos y por videojuego */}
                <select onChange={e => handleOrderByName(e)} className='select-alf'>
                    <option value='asc'> A - Z </option>
                    <option value='desc'> Z - A </option>
                </select>
                {
                    allGenres && <select className="select-alf" onChange={e => handleSelectGenres(e)}>
                        <>
                            <option value={null}>Todos</option>
                            {
                                allGenres.map((genre, index) => <option key={`${genre.id}_${index}`} value={genre.name} >{genre.name}</option>)
                            }
                        </>
                    </select>
                }
                {/*hacer esto con un map  o estados locales para traer los generos. martes 50*/}

                <select className="select-alf" onChange={e => handleOrderByRating(e)}>
                    <option value='high'> low rating </option>
                    <option value='low'> high rating </option>
                </select>

                <select className="select-alf" onChange={e => handleFilterCreated(e)}>
                    <option value='All'>All Games</option>
                    <option value="api">Existing</option>
                    <option value="created">Created</option>
                </select>

                {/* <SearchBar /> */}
                <Paginado
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paginado={paginado} />



                <div className="home-cards-container">
                    {

                        currentGame.length > 0 ? currentGame.map(a => {
                            return (


                                <Link to={"/game/" + a.id} style={{textDecoration: 'none', color: 'white'}}>
                                    <div className="Cards">
                                        <Card name={a.name} image={a.background_image ? a.background_image : a.image ? a.image : <img src='https://i.pinimg.com/originals/b3/85/29/b3852980264d563f343cfa0f2de41833.jpg' />} rating={a.rating} reviews={a.reviews_text_count} key={a.id} />
                                    </div>
                                </Link>

                            )
                        }) : <div className="container-loader"> <div class="loader"></div> </div>

                    }

                </div>

            </div>
        </div>
    );
};

// a.image? a.image : <img src='' />



