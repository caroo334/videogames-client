import React from "react";
import '../styles/paginado.css';

export default function Paginado({ gamesPerPage, allGames, paginado }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="paginado">
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li className="list-number" key={number}>
                            <a className="a-number" onClick={() => paginado(number)}>{number}</a>
                            {/*href={() => paginado(number)}*/}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}