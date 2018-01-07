import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

const logging = store => next => action => {
    console.log('action received', action);
    return next(action);
};

export default function makeStore() {
    return createStore(reducer, applyMiddleware(logging));
}