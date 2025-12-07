"use client"

import { useState } from "react";


export default function TodoList() {
    const [todos, setTodos] = useState([
        { id: 1, text: "Learn React" },
        { id: 2, text: "Build App" },
        { id: 3, text: "Deploy App" }
    ]);

    const removeFirst = () => {
        setTodos(todos.slice(1)); // removes first item
    };

    return (
        <>
            <button onClick={removeFirst}>Remove First</button>

            {todos.map((todo, index) => (
                <div key={index}>
                    <input defaultValue={todo.text} />
                </div>
            ))}
        </>
    );
}