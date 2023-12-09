/** @jsx React.createElement */
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

    const [count, setCount] = useState(0);
    const [todo, setTodo] = useState([]);
    const onClickButton = () => {
        setCount((prev) => prev + 1);
    }
    const onClickDecrementButton = () => {
        if (count === 1) return;
        setCount((prev) => prev - 1);
    }

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/todos/" + count)
        .then((result) => {
            setTodo(result.data);
        })
    }, [count])

    return (
        <div>
            <div>
                <h1>test</h1>
                <p>{count}</p>
                <button onClick={onClickButton}>increment</button>
                <button onClick={onClickDecrementButton}>decrement</button>
                <hr/>
                <p>ID : {todo.id}</p>
                <p>User Id : {todo.userId}</p>
                <p>title : {todo.title}</p>
                <p>completed : {todo.completed ? "Done" : "Not Yet"}</p>
            </div>
        </div>
    )
};

export default App;