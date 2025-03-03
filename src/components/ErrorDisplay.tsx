import React from 'react';

export default function ErrorDisplay(
    {title, message, retryFn}: {
        title: string,
        message: string,
        retryFn: () => void
    }) {
    return (
        <div style={{color: 'red', padding: '20px', border: '1px solid red'}}>
            <h3>{title}</h3>
            <p>{message}</p>
            <button onClick={retryFn}>재시도</button>
        </div>
    );
}