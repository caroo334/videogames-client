import React from "react";
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage(){
    return (
        <div className="landing-container">
        <h1 className="landing-h1">WELCOME</h1>
        <Link to='/home'>
            <button className="landingPage-button">Press and Enjoy</button>
        </Link>
        </div>
    )
}