import React from 'react'
import logo from '../logo.svg';
import '../App.css';

export default function Header(props) {

    const myFunction = () => {
        const dropD = document.getElementById('topnav');
        const logo = document.getElementById('leftLogo');
        if (dropD.className === "topnav-right") {
            dropD.className += " responsive";
            logo.style.display = "none";
        } else {
            dropD.className = "topnav-right";
            logo.style.display = "block";
        }
    }

    /*const loginHandle = () => {
        props.connectToWeb3();
    }

    const renderLogin = () => {

        if (props.accounts && props.accounts.length > 0) {
            return props.accounts;
        } else {
            return (
                <a href="#" type="button" className="sparisci" onClick={loginHandle}> LOGIN</a>
            );
        }
    }*/

    const renderLastResponse = () => {
        if (props.lastVote && props.lastVote.length > 0) {
            return (
                <>
                <span style={{fontWeight: "bold", marginRight: 15}}>
                    {props.lastVote[0]}
                </span>
                    Votre réponse : {props.lastVote[1]}
                </>
            );
        }
    }

    return (
        <>
            <nav id="navAlto">
                <div id="leftLogo">
                    <img src={logo} className="App-logo" alt="logo"/><br/>
                    <a href="#" className="btpc sparisci" alt="logo">CRYPTO VOTE</a>
                </div>
                
            </nav>
            <div id="topline">
                    <div id="slide">
                        {renderLastResponse()}
                    </div>
            </div>
        </>
    );
}
