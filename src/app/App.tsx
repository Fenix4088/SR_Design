import React from 'react';
import './App.scss';
import {Sandbox} from "../components/Sandbox/Sandbox";
import {L} from "../components/L/L";
import {T} from "../components/T/T";

function App() {

    return (
        <div className="App">
            <Sandbox/>
            <T textType={'body-1'} fontWeight={'regular'}>
                <p>paragraph</p>
            </T>
            <T fontWeight={'bold'} textType={'body-1'}>
                <span>Some text with{' '}
                    <L>
                        <a href="#">my link</a>
                    </L>
                </span>
            </T>

        </div>
    );
}

export default App;

