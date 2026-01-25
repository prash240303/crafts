"use client"
import React, { useState } from 'react'

type Props = {}

const initalTask = [
  {
    id: 0,
    text: "new task",
    done: false
  },
  {
    id: 1,
    text: "new 2 task",
    done: false
  },
  {
    id: 2,
    text: "new 3 task",
    done: true
  }
]



function AddTaskComponent({ onAddTask }: any) {
  const [text, setText] = useState('');
  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        className='border mr-4'
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}


function TaskList({ tasks, onChangeTask, onDeleteTask }: any) {
  return (
    <>
      <ul className='flex flex-col gap-3'>
        {tasks.map((task: any) => (
          <TaskComponent key={task.id} task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        ))}
      </ul>
    </>
  );
}

function TaskComponent({ task, onChange, onDelete }: any) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          aria-label='task'
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <div className= 'flex gap-2 text-black'>
        {task.text}
        <button className='border border-black' onClick={() => setIsEditing(true)}>Edit</button>
      </div>
    );
  }
  return (
    <>
      <label className='flex gap-3 border mt-3'>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            onChange({
              ...task,
              done: e.target.checked,
            });
          }}
        />
        {taskContent}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </label>
    </>
  );
}




function UseStateExample({ }: Props) {
  const [tasks, setTasks] = useState(initalTask);

  let nextID = 3;

  function handleChangeTask(updatedTask: any) {
     console.log("here",  tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setTasks(
      tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }

  function addTask(text: string) {
    setTasks([
      ...tasks,
      {
        id: nextID++,
        text: text,
        done: false
      }
    ]);
  }

  function handleDeleteTask(taskId: number) {
    setTasks(tasks.filter((t:any) => t.id !== taskId));
  }

  return (
    <div className='text-black'>
      <AddTaskComponent onAddTask={addTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default UseStateExample;
