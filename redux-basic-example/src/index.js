import { createStore,applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'
import promise from 'redux-promise-middleware'

// Multiple Reducers
var initialState = {
    posts: [],
    error: null,
    fetching: false,
    fetched: false
}

const postsReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'FETCH_POSTS_PENDING':
            return {...state, fetching: true}
            break
        case 'FETCH_POSTS_REJECTED':
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
            break
        case 'FETCH_POSTS_FULFILLED':
            return {
                ...state, 
                fetching: false,
                fetched: true,
                error: null,
                posts: action.payload.data
            }
            break
        default:
            return state
    }
}

const reducers  = combineReducers({
    posts: postsReducer,
})

const middleware = applyMiddleware(promise(),logger,thunk)

const store = createStore(reducers, middleware)

// store.subscribe(() => {
//     console.log("State: ", store.getState())
// })

// Actions
store.dispatch(
    {type: 'FETCH_POSTS', payload: axios.get("https://jsonplaceholder.typicode.com/posts")
})


