import React, { Component } from 'react';
import ErrorHandler from './common/ErrorHandler';
import HeaderComponent from "./header/HeaderComponent";

class RootComponent extends Component {
    render() {
        return (
            <div className="container">
                <ErrorHandler>
                    <HeaderComponent></HeaderComponent>
                </ErrorHandler>
            </div>
        );
    }
}

export default RootComponent;