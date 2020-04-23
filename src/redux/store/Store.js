import { createStore , applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../reducer/Reducer';
import thunk from 'redux-thunk';

export default function configureStore() {
    let store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(thunk)))

    return store
}