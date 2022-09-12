import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postGames } from '../actions';
import '../styles/GameCreate.css';
// Me falta Hacer el post 

const validate = (input) => {
    let errors = {};
    if (!input.name) {
        errors.name = 'Se requiere un Nombre';

    }

    return errors;
}

export default function GameCreate() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const history = useHistory();
    const [errors, setErrors] = useState({});

    //El formulario lo tengo que guardar en algun lado
    const [input, setInput] = useState({
        name: '',
        img: '',
        rating: 0,
        detail: '',
        reviews: '',
        genres: [],
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

        console.log('Esto me trae el INPUT', input);
    }

    const handleDelete = (genre) => {
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== genre)
        })
    }

    const handleRating = (e) => {
        if (e.target.value) {
            setInput({
                ...input,
                rating: e.target.value
            })
        }
        console.log('Esto me trae el Rating', input);
    }

    const handleSelect = (e) => {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])]
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)

        dispatch(postGames(input));
        alert('Game Created successfully');

        setInput({
            name: '',
            img: '',
            rating: 0,
            detail: '',
            reviews: '',
            genres: []
        })
        history.push('/home');
    }


    useEffect(() => {
        dispatch(getGenres());
    }, []);

    return (
        <div className="create-game-container">
            <Link to='/home'><button className="form-button">
                <span> Return</span>
            </button></Link>
            <h1>Create your Game!</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <div className="label-name">
                    <label for='name' className="name">Name:</label>
                    <input
                        onChange={(e) => handleChange(e)}
                        type='text'
                        value={input.name}
                        name='name'
                        id='name'
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div className="label-detail">
                    <label for='detail' className="detail" >Details</label>
                    <textarea id='detail' onChange={(e) => handleChange(e)} type='text' name="detail" rows="5" cols="50" value={input.detail}>Escribe tu comentario: </textarea>
                </div>
                <div className="label-reviews">
                    <label for='reviews' className="reviews">Reviews</label>
                    <textarea id='reviews' onChange={(e) => handleChange(e)} name="reviews" rows="5" cols="50" value={input.reviews}> </textarea>
                </div>
                <div className="label-image">
                    <label for='image' className="image">Submit Image</label>
                    <input
                        id='image'
                        type='text'
                        value={input.img}
                        name='img'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="label-genres">
                    <label for='genres' className="genres">
                        <select id="genres" onChange={(e) => handleSelect(e)}>
                            {genres.map((g) => (
                                <option value={g.name}>{g.name}</option>

                            ))}
                        </select>
                    </label>

                </div>
                {
                    input.genres.map((g, index) => <div className="genre-card" key={`${g}_${index}`}>

                        <span>{g}</span>
                        <button type="button" onClick={() => handleDelete(g)}>X</button>
                    </div>)
                }

                {/* <ul> <li> {input.genres.map(e => e + `  ,`)} </li> </ul> */}








                <div className="ratings">
                    <label>
                        <input
                            onChange={(e) => handleRating(e)}
                            type="radio" name="rating" value={1} />
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input onChange={(e) => handleRating(e)} type="radio" name="rating" value={2} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input onChange={(e) => handleRating(e)} type="radio" name="rating" value={3} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input onChange={(e) => handleRating(e)} type="radio" name="rating" value={4} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input onChange={(e) => handleRating(e)} type="radio" name="rating" value={5} />
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    {
                        // $(':radio').change(function () {
                        //     console.log('New star rating: ' + this.value);
                        // })
                    }
                </div>

                <button type='submit' className="form-button">
                    <span> Create Game </span>
                </button>




            </form>

            {/* {input.genres.map(e =>
                <div className="div-button-x">
                    <p>{e}</p>
                    <button className="button-x" onClick={(e) => handleDelete(e)} >x</button>
                </div>
            )} */}
        </div>
    )
}