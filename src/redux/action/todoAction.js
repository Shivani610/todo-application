import axios from "axios"
import { ADD_TODO, COMPLETE_TODO, DELETE_SINGLE_TODO, GET_TODO, UPDATE_TODO } from "../constants/todoConstants"

export const addTodoAction = (todoData) => async (dispatch, getState) => {
    const { data } = await axios.post("http://localhost:5000/todos", todoData)
    dispatch({
        type: ADD_TODO
    })
}
export const updateTodoAction = (updatetodoData) => async (dispatch, getState) => {
    const { data } = await axios.put(`http://localhost:5000/todos/${updatetodoData.id}`, updatetodoData)
    dispatch({
        type: UPDATE_TODO
    })
}
export const getAllTodoAction = () => async (dispatch, getState) => {
    const { data } = await axios.get("http://localhost:5000/todos")
    dispatch({
        type: GET_TODO, payload: data
    })

}
export const deleteSingleTodoAction = (id) => async (dispatch, getState) => {
    const { data } = await axios.delete(`http://localhost:5000/todos/${id}`)
    dispatch({
        type: DELETE_SINGLE_TODO
    })

}
export const completeTodoAction = (id) => async (dispatch, getState) => {
    const { data } = await axios.patch(`http://localhost:5000/todos/${id}`, { completed: true })
    dispatch({
        type: COMPLETE_TODO
    })

}