import React from 'react'
import logo from '../logo.svg';
import '../App.css';

export default function Login(props) {

    

    const loginHandle = () => {
        props.connectToWeb3();
    }

    const renderLogin = () => {

        if (props.accounts && props.accounts.length > 0) {
            return props.accounts;
        } else {
            return (
                <button><a href="#" type="button" className="centraBottoni" id="LogBott" onClick={loginHandle}> LOGIN</a></button>
            );
        }
    }

    return (
        <>
            {renderLogin()}
        </>
    );
}
