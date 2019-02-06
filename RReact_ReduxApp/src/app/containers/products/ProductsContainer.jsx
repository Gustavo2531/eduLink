import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as productActions from '../../actions/productActions';
import ProductListComponent from '../../components/products/ProductListComponent';
import AddProductButton from '../../components/products/AddProductButton';

function mapStateToProps(state, ownProps) {
    return {
        products: state.productReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadProducts: () => dispatch(productActions.loadProducts()),
        deleteProduct: product=> dispatch(productActions.deleteProduct(product))
    };
}

class ProductsContainer extends Component {
    constructor(props) {
        super(props);
        
        this.deleteProduct = this.deleteProduct.bind(this);
        
       
    }
    deleteProduct(p,e) {
        e.preventDefault();
        this.props.deleteProduct(p);
        
    }


    render() {
        return (
            <div>
                <AddProductButton/>
                <ProductListComponent products={this.props.products}  onDelete={this.deleteProduct}/>
            </div>
        );
    }

    componentDidMount() {
        this.props.loadProducts();
        
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ProductsContainer);