import React from 'react';

const CounterComponent = props => {
    return (
        <div>
            <h1 className="text-info">Counter Component</h1>
            <h2 className="text-info">Count: {props.count}</h2>
            <button className="btn btn-info" onClick={(e) => props.inc(5, e)}>+</button>
            <button className="btn btn-info" onClick={(e) => props.dec(5, e)}>-</button>
        </div>
    );
}

export default CounterComponent;