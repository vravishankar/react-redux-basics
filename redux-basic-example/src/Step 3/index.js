import { createStore,applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// Multiple Reducers
var initialState = {
    posts: [],
    error: null,
    fetching: false,
    fetched: false
}

const postsReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'FETCH_POSTS_START':
            return {...state, fetching: true}
            break
        case 'FETCH_POSTS_ERROR':
            return {
                ...state, 
                fetching: false, 
                error: action.payload
            }
            break
        case 'RECEIVE_POSTS':
            return {
                ...state, 
                fetching: false,
                fetched: true,
                error: null,
                posts: action.payload
            }
            break
        default:
            return state
    }
}

const reducers  = combineReducers({
    posts: postsReducer,
})

const middleware = applyMiddleware(logger,thunk)

const store = createStore(reducers, middleware)

// store.subscribe(() => {
//     console.log("State: ", store.getState())
// })

// Actions
store.dispatch((dispatch) => {
    dispatch({type: 'FETCH_POSTS_START'})
    axios.get("https://jsonplaceholder.typecode.com/posts")
    .then((response) => {
        dispatch({type: 'RECEIVE_POSTS',payload: response.data})
    })
    .catch((error) => {
        dispatch({type:'FETCH_POSTS_ERROR', payload: error.message})
    })
})

