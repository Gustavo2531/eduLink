import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

const counterReducer = (state = initialState.count, action) => {
    let newState;

    switch (action.type) {
        case actionTypes.INCREMENT_COUNTER:
            newState = state + action.payload;
            return newState;
        case actionTypes.DECREMENT_COUNTER:
            newState = state - action.payload;
            return newState;
        default:
            return state;
    }
};

export default counterReducer;