import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const productReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case actionTypes.LOAD_PRODUCTS_SUCCESS:
            return [...action.payload];
        case actionTypes.INSERT_PRODUCT_SUCCESS:
            return [...state, Object.assign({}, action.payload)];
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            var itemIndex = state.findIndex(p => p.id == action.payload.id);
            state.splice(itemIndex, 1, Object.assign({}, action.payload));
            return [...state];
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return [...state.filter(p=>p.id!=action.payload.id)];
        default:
            return state;
    }
};

export default productReducer;