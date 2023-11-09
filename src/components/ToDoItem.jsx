import React from 'react';
export default function ToDoItem({task, updateTask, setUpdateTask, onCheckChanged, onDeleteTask, onEditTask, onSaveTask, onCancelClick}){
  return (
    <>

    <li className="list-group-item mt-2">
          {task.editMode ? 
          <>
            <input className="form-control mb-4" type="text" value={updateTask} onChange={(evt) => setUpdateTask(evt.target.value)} />
            <button className="btn btn-primary ms-5" onClick={() => onSaveTask(task)}>Save Task</button>
            <button className="btn btn-info ms-1" onClick={() => onCancelClick(task)}>Cancel</button>
          </>
          :
          <>
          <label className="form-check-label">
          <input type="checkbox" className="form-check-input" checked={task.isCompleted} onChange={(evt) => onCheckChanged(evt,task)} />
          {task.task}</label>
          <button className="btn btn-danger ms-5" onClick={() => onDeleteTask(task)}>Delete Task</button>
          <button className="btn btn-info ms-1" onClick={() => onEditTask(task)}>Edit Task</button>
          </>
          }
        </li>    
    </>
  )
}