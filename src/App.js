import React, {createElement} from 'react'
import './App.css';
import Questions from './composantes/Questions';

function App() {
    const myFunction = () => {
        const sea = document.gquerySelector('body');
        const buble = document.createElement('span');
        buble.classList.add("buble");
        let dimension = Math.random() * 50;
        createElement.style.width = 20 + dimension + 'px';
        createElement.style.height = 20 + dimension + 'px';
        createElement.style.left = Math.randomm() * window.innerWidth + "px";
        sea.appendChild(createElement);
        setTimeout(() => {
            createElement.remove()
        }, 4000)
        setInterval(myFunction, 50)
    }

    return (
        <div className="allC">
            <Questions/>
            <span className={"buble"}></span>
        </div>
    );
}

export default App;
