/* eslint-disable react/jsx-key */
// import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import { FiEdit2 } from 'react-icons/fi'
import { TiDeleteOutline } from 'react-icons/ti'

function ToDo() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editId, setEditId] = useState(0)


  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const addToDo = () => {
    console.log(tasks);
    console.log(task);

    if (task !== '') {

      let exist = tasks.map((x) => x.list === task)

      if (!exist[0]) {
        setTasks([...tasks, { list: task, id: Date.now(), status: false }])
        setTask('')
      }
    }
    console.log(tasks);

    if (editId) {
      const editTask = tasks.find((task) => task.id === editId)
      const updateTodo = tasks.map((to) => to.id === editTask.id
        ? (to = { id: to.id, list: task })
        : (to = { id: to.id, list: to.list }))
      setTasks(updateTodo)
      setEditId(0)
      setTask('')
    }
  }

  const inputRef = useRef('null')

  useEffect(() => {
    inputRef.current.focus()
  })

  const onDelete = (id) => {
    setTasks(tasks.filter((to) => to.id !== id))
  }

  const onComplete = (id) => {
    let complete = tasks.map((list) => {
      if (list.id === id) {
        return ({ ...list, status: !list.status })
      }
      return list
    })
    setTasks(complete)
  }

  const onEdit = (id) => {
    const editTask = tasks.find((tsk) => tsk.id === id)
    setTask(editTask.list)
    setEditId(editTask.id)
  }


  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form className='form-group' onSubmit={handleSubmit} >
        <input type="text" value={task} placeholder='Enter Your Task' ref={inputRef} className='form-control' onChange={(event) => setTask(event.target.value)} />
        <p />
        <button onClick={addToDo}>{editId ? 'EDIT' : 'ADD'}</button>
      </form>


      <div className='list'>
        <ul>
          {
            tasks.map((tsk) => (

              <li key={tsk.id} className='list-items'>
                <div className='list-item-list' id={tsk.status ? 'list-item' : ''}>{tsk.list}</div>
                <span>
                  <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={() => onComplete(tsk.id)} />
                  <FiEdit2 className='list-item-icons' id='edit' title='Edit' onClick={() => onEdit(tsk.id)} />
                  <TiDeleteOutline className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(tsk.id)} />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default ToDo