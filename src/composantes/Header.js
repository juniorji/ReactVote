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

    const loginHandle = () => {
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
    }

    return (
        <nav>
            <div id="aHaut">
                <div className="topnav-left" id="leftLogo">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <a href="#" className="btpc sparisci" alt="logo">CRYPTO VOTE</a>
                </div>
                <div className="topnav-right" id="topnav">
                    {/*<a href="#" type="button" className="sparisci">ABOUT</a>*/}
                    {/*<a href="#" type="button" className="sparisci"> CONTACT</a>*/}
                    {renderLogin()}
                    {/*<a href="#" type="button" className="sparisci"> SIGN IN</a>*/}
                    <a href="#"
                       id="btn-mobile"
                       type="button"
                       onClick={(event) => {
                           event.preventDefault();
                           myFunction();
                       }}
                    >MENU</a>
                </div>
                <br/>
                <div id="topline">
                    <div id="slide">Anis has just voted Yes for Elon Musk</div>
                </div>
            </div>
        </nav>
    );
}
