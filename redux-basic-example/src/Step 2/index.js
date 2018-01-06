import { createStore,applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'

// Multiple Reducers
const postsReducer = (state=[],action) => {
    switch(action.type) {
        case 'ADD_POST':
            return [...state, {id:action.payload.id, post:action.payload.post} ]
        case 'SHOW_POST':
            return state
            break
        default:
            return state
    }
}

const commentsReducer = (state=[],action) => {
    switch(action.type) {
        case 'ADD_COMMENT':
            return [...state, {post: action.payload.post_id, comment:action.payload.comment} ]
            break
        case 'SHOW_COMMENT':
            return state
        default:
            return state
    }
}

const reducers  = combineReducers({
    posts: postsReducer,
    comments: commentsReducer
})

const middleware = applyMiddleware(logger)

const store = createStore(reducers, middleware)

// store.subscribe(() => {
//     console.log("State: ", store.getState())
// })

// Actions
store.dispatch({type:'ADD_POST',payload:{id:1, post:"My First Post"}})
store.dispatch({type:'ADD_POST',payload:{id:2, post:"My Second Post"}})
store.dispatch({type:'ADD_COMMENT',payload:{id:1, post_id:1, comment: 'My First Comment'}})
store.dispatch({type:'SHOW_COMMENT'})
