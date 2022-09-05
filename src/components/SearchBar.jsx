import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../actions";
import '../styles/SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    //Tengo que guardar en mi estado local lo que aparece en el input
    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);

    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameGames(name));
        //setName('');
    }

    return (
        <div className="search-container">
            <input
                className="search-input"
                type='text'
                placeholder="Buscar..."
                value={name}
                onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" className="search-button" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}