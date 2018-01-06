import { createStore,applyMiddleware } from 'redux'
import logger from 'redux-logger'

//** Log only in Development Mode */
// const middlewares = [];

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);

//   middlewares.push(logger);
// }

//const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);
//** */

// Reducer
const reducer = (state=0,action) => {
    switch(action.type) {
        case 'INC':
            return state + action.payload
            break
        case 'DEC':
            return state - action.payload
            break
        default:
            return state
    }
}

const middleware = applyMiddleware(logger)

const store = createStore(reducer, middleware)

store.subscribe(() => {
    console.log("State: ", store.getState())
})

// Actions
store.dispatch({type:'INC',payload:1})
store.dispatch({type:'INC',payload:2})
store.dispatch({type:'INC',payload:3})
store.dispatch({type:'DEC',payload:5})