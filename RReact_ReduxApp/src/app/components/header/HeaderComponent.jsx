import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SwitchComponent from '../../routes';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/counter">Counter</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                    </ul>
                </nav>
                {SwitchComponent}
            </div>
        );
    }
}

export default HeaderComponent;