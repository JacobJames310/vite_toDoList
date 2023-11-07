import {FaReact, FaPencilAlt, FaApplePay, FaPlus} from "react-icons/fa";
import {nanoid} from "nanoid";
import {useState} from "react";
export default function ToDoList(){

  const [tasks,setTasks] = useState([
    {id:nanoid(),task:"Learn React", isCompleted:false, icon:<FaReact />},
    {id:nanoid(),task:"Pass the exam", isCompleted:false, icon:<FaPencilAlt />},
    {id:nanoid(),task:"Get a job", isCompleted:false, icon:<FaApplePay />}
  ]);

  const [newTask, setNewTask] = useState("");

  function onCheckChanged(evt,task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].isCompleted = evt.target.checked;
    setTasks(newTasks);
  }

  function onAddTask(){
    const newTasks= [...tasks];
    newTasks.push({id:nanoid(),task:newTask,isCompleted:false});
    setTasks(newTasks);
    setNewTask("");
  }

  function onDeleteTask(task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks.splice(index,1);
    setTasks(newTasks);
  }

  function onEditTask(task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].task = prompt("Edit task",task.task);
    setTasks(newTasks);
  }

  return(
    <>
    <h1>To Do List</h1>
    <ul>
      {tasks.map((task)=>(
        <li key={task.id} className="list-group-item mt-2">
        <label className="form-check-label">
          <input type="checkbox" className="form-check-input" checked={task.isCompleted} onChange={(evt) => onCheckChanged(evt,task)} />
          {task.task} {task.icon}</label>
          <button className="btn btn-danger ms-5" onClick={() => onDeleteTask(task)}>Delete Task</button>
          <button className="btn btn-info ms-1" onClick={() => onEditTask(task)}>Edit Task</button>
        </li>
        
      ))}
    </ul>
    <div className="d-flex">
    <button className="btn btn-primary rounded-circle ms-5 mb-4" onClick={onAddTask}><FaPlus /></button>
    <input className="form-control mb-2" placeholder="Add a new task" type="text" value={newTask} onChange={(evt) => setNewTask(evt.target.value)}/>
    </div>
    </>
  );
}