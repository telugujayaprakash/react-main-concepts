import { createStore } from 'redux';
import { likeReducer } from './Reducer';

const store = createStore(likeReducer);

export default store;
