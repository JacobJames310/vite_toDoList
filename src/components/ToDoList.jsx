import {FaReact, FaPencilAlt, FaApplePay, FaPlus} from "react-icons/fa";
import {nanoid} from "nanoid";
import ToDoItem from "./ToDoItem";
import {useState, useEffect} from "react";
export default function ToDoList(){
  const [tasks,setTasks] = useState(() => {
    const localValue = localStorage.getItem("TASKS");

    if(localValue==null) return [
    {id:nanoid(),task:"Learn React", isCompleted:true,  editMode:false},
    {id:nanoid(),task:"Pass the exam", isCompleted:false,  editMode:false},
    {id:nanoid(),task:"Get a job", isCompleted:false,editMode:false}
    ];
    //return from local storage if exists
    return JSON.parse(localValue);
    });

  useEffect(() => {
    //Save our items to local storage
    console.log("useEffect called");
    localStorage.setItem("TASKS",JSON.stringify(tasks));
  }), [tasks];

  const[updateTask, setUpdateTask] = useState("");

  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const [newTask, setNewTask] = useState("");

  const [filter, setFilter] = useState("all");

  const onSelectChange =(evt) => {
    setFilter(evt.target.value);
    setFilteredTasks(tasks.filter((task) => {
      if(evt.target.value === "all") return true;
      if(evt.target.value === "completed") return task.isCompleted;
      if(evt.target.value === "incomplete") return !task.isCompleted;
    }));
  }

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
    newTasks[index].editMode = true;
    setUpdateTask(task.task);
    setTasks(newTasks);
  }

  function onSaveTask(task){
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].task = updateTask;
    newTasks[index].editMode = false;
    setTasks(newTasks);
  }

  const onCancelClick = (task) => {
    const newTasks = [...tasks];
    const index = newTasks.indexOf(task);
    newTasks[index].editMode = false;
    setTasks(newTasks);
  }

  

  return(
    <>
    <header className="d-flex">
    <h1>To Do List {filter}</h1>
    <select className="form-select" aria-label="Default select example" onChange={(evt) => onSelectChange(evt)}>
      <option defaultValue='all'>Show All Items</option>
      <option value="completed">Show Completed Items</option>
      <option value="incomplete">Show Incomplete Items</option>
    </select>
    </header>
    <ul>
      {filteredTasks.map((task)=>(
            <ToDoItem 
            task={task} 
            key={task.id} 
            updateTask={updateTask} 
            setUpdateTask={(evt) => setUpdateTask(evt)} 
            onCheckChanged={(evt) => onCheckChanged(evt, task)}
            onDeleteTask={() => onDeleteTask(task)}
            onEditTask={() => onEditTask(task)}
            onSaveTask={() => onSaveTask(task)}
            onCancelClick={() => onCancelClick(task)} />
      ))}
    </ul>
    <div className="d-flex">
    <button className="btn btn-primary rounded-circle ms-5 mb-4" onClick={onAddTask}><FaPlus /></button>
    <input className="form-control mb-2" placeholder="Add a new task" type="text" value={newTask} onChange={(evt) => setNewTask(evt.target.value)}/>
    </div>
    </>
  );
}