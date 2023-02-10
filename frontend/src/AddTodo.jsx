import { useState, useEffect } from 'react'
import API from './API'

export default function AddTodo(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [todoList, setTodoList] = useState(props.todoList)


useEffect(() => {
    refreshTodos()
}, [])

const refreshTodos = () => {
    API.get("/")
        .then((res) => {
            setTodoList(res.data)
        })
        .catch(console.error)
}

const onSubmit = (e) => {
    e.preventDefault()
    let todo = { title, description, completed }
    API.post("/", todo).then(() => refreshTodos())
}

const onUpdate = (id) => {
    let todo = {title, description, completed}
    API.patch(`/${id}/`, todo).then((res) => refreshTodos())
}

const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => refreshTodos())
}

const selectTodo = (id) => {
    let todo = todoList.filter((todo) => todo.id === id)[0]
    setTitle(todo.title)
    setDescription(todo.description)
    setCompleted(todo.completed)
}

return(
    <> 
      <div>
          {todoList.map((e) => {
              return(
                  <div style={{color: e.completed ? 'green' : 'red', borderRadius: '1px'}} key={e.id}>
                      <h2> {e.title} </h2>
                      <p> {e.description} </p>
                      <button onClick={() => onDelete(e.id)}> Delete </button>
                      <button onClick={() => selectTodo(e.id)}> Select </button>
                      <button onClick={() => setCompleted(true)}> Completed! </button>
                      <button onClick={() => setCompleted(false)}> Not Completed! </button>
                      <button onClick={() => onUpdate(e.id)}> Edit </button>     
                  </div>
                  )
                  })}
          </div>
          <h1>
              Add/Edit a task!             
          </h1>
          <form> 
              <input 
                  value={title}
                  onChange={e=> setTitle(e.target.value)}
                  placeholder={'title'}
                  type='text'
                  name='title'
              />
              <input 
                  value={description}
                  onChange={e=> setDescription(e.target.value)}
                  placeholder={'description'}
                  type='text'
                  name='description'
              />
          </form>
          <button onClick={onSubmit}> Add Todo</ button>
      </>
)
}
