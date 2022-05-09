import React from 'react';
import './App.scss';
import s from './Test.module.scss';

function App() {
    return (
        <div className="App">
            <p className={s['hello']}>Hello Searates</p>
        </div>
    );
}

export default App;
