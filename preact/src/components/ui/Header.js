import React from 'react';
import InputWrapper from './InputWrapper';

export default function Header(props) {
    return (
        <header className="header">
            <h1>todos</h1>
            <InputWrapper {...props}/>
        </header>
    );
}
