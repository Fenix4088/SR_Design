import React from 'react';
import {T} from '../T/T';


export const Sandbox = () => {
    return (
        <>
            <div style={{display: 'flex', flexFlow: "column nowrap"}}>
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
                    <div>div</div>
                </T>
                <T textType={'body-2'} fontWeight={'semiBold'}>
                    <span>span</span>
                </T>
                <T textType={'body-3'} fontWeight={'medium'}>
                    <a href={'#'}>link</a>
                </T>
            </div>

        </>
    )
}