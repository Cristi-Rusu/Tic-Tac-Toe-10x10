import React from 'react';

export default function Square(props) {
    return (
        <button
            className={`square ${props.type}`}
            onMouseDown={props.onClick}
            onTouchStart={props.onClick}
            style={{color: props.color}}
        >
            {props.value}
        </button>
    );
}