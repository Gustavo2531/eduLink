import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProductFormComponent from '../../components/products/ProductFormComponent';

import * as productActions from '../../actions/productActions';

function getProductById(products, id) {
    const product = products.find(p => p.id == id);
    return product;
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.id;

    let product = {
        id: "",
        name: "",
        description: "",
        status: ""
    };

    if (productId && state.productReducer.length > 0) {
        product = getProductById(state.productReducer, productId);
    }

    var pText = product.id == "" ? "Create Product" : "Edit Product";

    return {
        product, pText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActions, dispatch)
    };
    // return {
    //     insertProduct: (p) => dispatch(productActions.insertProduct(p)),
    //     updateProduct: (p) => dispatch(productActions.updateProduct(p)),
    // };
}

class ManageProductContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { product: Object.assign({}, this.props.product) };
        this.updateProductState = this.updateProductState.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }

    updateProductState(e) {
        const field = e.target.name;
        let product = this.state.product;
        product[field] = e.target.value;
        this.setState({ product: product });
    }

    
    

    saveProduct(e) {
        e.preventDefault();
        if (this.state.product.id) {
            this.props.actions.updateProduct(this.state.product);
        } else {
            this.props.actions.insertProduct(this.state.product);
        }

        this.props.history.push("/products");
    }

    render() {
        return (
            <div>
                <ProductFormComponent pageText={this.props.pText} product={this.state.product}
                    onSave={this.saveProduct} onChange={this.updateProductState} onDelete={this.deleteProduct}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(ManageProductContainer);