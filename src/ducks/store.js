import { createStore, compose } from 'redux'
import reducer from './reducer'


const devTools = process.env.NODE_ENV === 'development' 
? 
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() 
: 
null;



const store = createStore(reducer, compose(devTools))

export default store