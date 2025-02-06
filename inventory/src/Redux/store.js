import { createStore } from 'redux';

const SET_USERNAME = 'SET_USERNAME';

export const setUsername = username => ({
    type: SET_USERNAME,
    payload: username,
});

const initialState = {
    username: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;