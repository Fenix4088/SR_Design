import React from 'react';
import {T} from '../T/T';


export const Sandbox = () => {
    const [state, setState] = React.useState<boolean>(false);

     const onMouseInHandler = () => console.log("onMouseInHandler")

    return (
        <>
            <div style={{display: 'flex', flexFlow: "column nowrap", alignItems: "center"}}>
                <h2>Typography</h2>
                <T>
                    <h1>H1</h1>
                </T>
                <T fontWeight={'semiBold'}>
                    <h2>H2</h2>
                </T>
                <T>
                    <h3>H3</h3>
                </T>
                <T>
                    <h4>H4</h4>
                </T>
                <T textType={'body-1'} fontWeight={'regular'}>
                    <div style={{background: "red"}}>div</div>
                </T>
                <T textType={'body-2'} fontWeight={'semiBold'}>
                    <span style={{cursor: "pointer"}} onClick={() => setState(!state)}>span</span>
                </T>
                <T textType={'body-3'} fontWeight={'medium'}>
                    <a href={'#'} onMouseOver={onMouseInHandler}>link</a>
                </T>
            </div>

        </>
    )
}