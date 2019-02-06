import * as actionTypes from './actionTypes';
import productsApiClient from '../services/product.service';

function loadProductsSuccess(products) {
    return { type: actionTypes.LOAD_PRODUCTS_SUCCESS, payload: products };
}

function insertProductSuccess(product) {
    return { type: actionTypes.INSERT_PRODUCT_SUCCESS, payload: product };
}

function updateProductSuccess(product) { 
    return { type: actionTypes.UPDATE_PRODUCT_SUCCESS, payload: product };
}

 function deleteProductSuccess(product) {
    return { type: actionTypes.DELETE_PRODUCT_SUCCESS, payload: product };
 }

export function loadProducts() {
    return function (dispatch) {
        return productsApiClient.getAllProducts().then((products) => {
            dispatch(loadProductsSuccess(products));
        }, (eMsg) => {
            throw eMsg;
        });
    }
}

export function insertProduct(product) {
    return function (dispatch) {
        return productsApiClient.insertProduct(product).then((insertedProduct) => {
            dispatch(insertProductSuccess(insertedProduct));
        }, (eMsg) => {
            throw eMsg;
        });
    }
}

export function updateProduct(product) { 
    return function (dispatch) {
        return productsApiClient.updateProduct(product).then((updatedProduct) => {
            dispatch(updateProductSuccess(updatedProduct));
        }, (eMsg) => {
            throw eMsg;
        });
    }
}

 export function deleteProduct(product) {
   return function (dispatch) {
        return productsApiClient.deleteProduct(product).then(() => {
            dispatch(deleteProductSuccess(product));
        }, (eMsg) => {
            throw eMsg;
        });
    }
 }
