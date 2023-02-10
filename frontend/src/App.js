
// frontend/src/App.js
import './App.css'
import { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from './AddTodo';

function App() {
	const [todoList, setTodoList] = useState([])

  useEffect(()=>{
    //don't forget the slash at the end of the url
    axios
    .get("http://localhost:8000/api/todos/")
    .then((res) => {
      console.log(res.data)
      setTodoList(res.data)
    })
    .catch((err) => console.log(err))
  }, [])

	return(
		<div className = "App">
      <div>
        <AddTodo todoList = {todoList}/>
      </div>
		</div>
	)
}

export default App;