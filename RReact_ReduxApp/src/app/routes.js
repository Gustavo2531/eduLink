import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import HomeComponent from './components/home/HomeComponent';
import CounterContainer from './containers/counter/CounterContainer';
import ProductsContainer from './containers/products/ProductsContainer';
import ManageProductContainer from './containers/products/ManageProductContainer';

const AboutComponent = Loadable({
    loader: () => import('./components/about/AboutComponent'),
    loading: () => <div>Loading...</div>
});

export default (
    <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/about" component={AboutComponent} />
        <Route path="/counter" component={CounterContainer} />
        <Route path="/products" component={ProductsContainer} />
        <Route path="/product/:id" component={ManageProductContainer} />
        <Route path="/product" component={ManageProductContainer} />
        <Route path="**" render={
            () => (
                <article>
                    <h1 className="text-danger">Component Not Found</h1>
                    <p className="text-danger">Route may not be configured...</p>
                </article>
            )
        } />
    </Switch>
);