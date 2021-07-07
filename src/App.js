import React, { createElement } from 'react'
import './App.css';
import Header from './composantes/Header';
import Questions from './composantes/Questions';
import AdminQuestion from './composantes/AdminQuestion';

function App() {
   /* const myFunction = () => {
        const sea = document.gquerySelector('body');
        const buble = document.createElement('span');
        let dimension = Math.random() * 50;
        createElement.style.width = 20 + dimension + 'px';
        createElement.style.height = 20 + dimension + 'px';
        createElement.style.left = Math.randomm() * window.innerWidth + "px";
        sea.appendChild(createElement);
        setTimeout(() => {
            createElement.remove()
        },4000)
        setInterval(myFunction,50)
    }*/
    return (
        <div className="allC">
            <Header/>
            <h1 className="setTitle">VOTE YOUR MAN</h1>
            <Questions/>
        </div>
    );
}

export default App;
