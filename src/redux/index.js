import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import { todoReducer } from "./reducers/todoReducer";

const rootReducer = combineReducers({
    allTodos: todoReducer
})
const reduxstore = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)))

export default reduxstore