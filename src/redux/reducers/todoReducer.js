import { ADD_TODO, COMPLETE_TODO, DELETE_SINGLE_TODO, GET_TODO, UPDATE_TODO } from "../constants/todoConstants"

export const todoReducer = (state = { todos: [] }, { type, payload }) => {
    switch (type) {
        case ADD_TODO: return {

            ...state,
            todoAdded: true
        }
        case GET_TODO: return {
            todos: payload
        }
        case DELETE_SINGLE_TODO: return {
            ...state,
            deleteSingleTodo: true
        }
        case COMPLETE_TODO: return {
            ...state,
            todoUpdated: true
        }
        case UPDATE_TODO: return {
            ...state,
            Updated: true
        }
        default: return state
    }

}