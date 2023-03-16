import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoAction, completeTodoAction, deleteSingleTodoAction, getAllTodoAction, updateTodoAction } from './redux/action/todoAction'
import { useFormik } from "formik"
import * as yup from "yup"
export default function App() {
  const { todos, todoAdded, deleteSingleTodo, Updated } = useSelector(state => state.allTodos)
  const [editData, setEditData] = useState("")
  const dispath = useDispatch()
  const formik = useFormik({
    initialValues: {
      task: "learn redux", desc: "redux is learn to easy", priority: "high"
    },
    validationSchema: yup.object({
      task: yup.string().required(),
      desc: yup.string().required(),
      priority: yup.string().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispath(addTodoAction({ ...values, completed: false }))
    }
  })
  useEffect(() => {
    dispath(getAllTodoAction())
  }, [todoAdded, deleteSingleTodo, Updated])


  return <>
    <pre>
      {JSON.stringify(formik.errors, null, 2)}
    </pre>
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <div class="card">
            <div class="card-header bg-dark text-white"  ><h2>Todo Application</h2></div>
            <div class="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label for="task" class="form-label">First task</label>
                  <input
                    type="text"
                    id="task"
                    class={formik.errors.task ?
                      "form-control is-invalid"
                      : "form-control"
                    }
                    name='task'
                    value={formik.values.task}
                    onChange={formik.handleChange}
                    placeholder="Enter Your task"
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please add task.</div>
                </div>
                <div class="mt-2">
                  <label for="desc" class="form-label">Description</label>
                  <input
                    type="text"
                    class={formik.errors.task ?
                      "form-control is-invalid"
                      : "form-control"
                    }
                    id="desc"
                    name='desc'
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    placeholder="Enter task description"
                  />
                  <div class="valid-feedback">Looks good!</div>
                  <div class="invalid-feedback">Please add description</div>
                </div>
                <div class="mt-2">
                  <label for="priority"> Priority</label>
                  <select class="form-select"
                    id="priority"
                    name='priority'
                    // class={formik.errors.task ?
                    //   "form-control is-invalid"
                    //   : "form-control"

                    // }
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                  >
                    <option selected>Select Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-dark w-100 mt-3">
                  Add Todo
                </button>
              </form>
            </div>
          </div>
          {todos.map(item =>
            <div class="card mt-4">
              <div
                class="card-header d-flex justify-content-between"
              // data-bs-toggle="collapse"
              // data-bs-target="#task1"
              >
                <h4>{item.task}</h4>
                <div>
                  <button
                    type="button"
                    class="btn btn-sm btn-dark"
                    onClick={e => dispath(completeTodoAction(item.id))}
                  >
                    <i class="bi bi-check"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-warning"
                    data-bs-target="#editModal"
                    data-bs-toggle="modal"
                    onClick={e => setEditData(item)}
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    data-bs-target="#deleteModal"
                    data-bs-toggle="modal"
                    onClick={e => dispath(deleteSingleTodoAction(item.id))}
                  >
                    <i class="bi bi-trash3-fill"></i>

                  </button>
                </div>
              </div>
              <div class="" id="task1">
                <div class="card-body">{item.desc}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <div class="modal fade" id="editModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModal">Edit Todo</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <label for="mtask" class="form-label">First task</label>
              <input
                type="text"
                class="form-control"
                id="mtask"
                placeholder="Enter Your task"
                value={editData.task}
                onChange={e => setEditData({ ...editData, task: e.target.value })}
              />
              <div class="valid-feedback">Looks good!</div>
              <div class="invalid-feedback">Please add task.</div>
            </div>
            <div class="mt-2">
              <label for="mdesc" class="form-label">Description</label>
              <input
                type="text"
                class="form-control"
                id="mdesc"
                placeholder="Enter task description"
                value={editData.desc}
                onChange={e => setEditData({ ...editData, desc: e.target.value })}
              />
              <div class="valid-feedback">Looks good!</div>
              <div class="invalid-feedback">Please add description</div>
            </div>
            <div class="mt-2">
              <label for="mpriority"> Priority</label>
              <select class="form-select" id="mpriority"
                value={editData.priority}
                onChange={e => setEditData({ ...editData, priority: e.target.value })}
              >
                <option selected>Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button type="button" class="btn btn-dark w-100 mt-3" data-bs-dismiss="modal"
              onClick={e => dispath(updateTodoAction(editData))}
            >
              Update Todo
            </button>

          </div>
        </div>
      </div>
    </div>
    {/* <div class="modal fade" id="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              Are you sure you want delete this todo ?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-danger">
            <p class="text-center text-muted mb-5">
              You can delete this todo at any time. If you change your mind, you
              might not be able to recover it
            </p>
            <div class="btn-group w-100">
              <button type="button" class="btn btn-outline-danger">Yes</button>
              <button type="button" class="btn btn-success">NO</button>
            </div>
          </div>
        </div>
      </div>
    </div> */}
  </>
}
