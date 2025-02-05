import {useState} from 'react';
import "../css/AddTask.css"


function AddTask() {

    interface Task {
        text: string;
        completed: boolean;
        editing: boolean; //track if task is being edited
    }

    const[items, setItems] = useState<Task[]>([]); //list of tasks
    const[task, setTask] = useState(""); //single task input

    //input field
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTask(e.target.value);
    }

    //add item
    function onClick() {
        if (task.trim()) {
            setItems([...items, {text: task, completed: false, editing: false}]); //add new task to array
            setTask(""); //clear inputfield
        }
    }

    //allows user to hit "enter" to add task
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key === "Enter") {
            onClick();
        }
    }

    //toggles task completion
    function toggleTask(index: number) {
        setItems(
            items.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item
            )
        );
    }

    //enable edit mode when cickin on task
    function enableEdit(index: number) {
        setItems(
            items.map((item, i) =>
            i === index ? {...item, editing: true} : item 
            )
        );
    }

    //handles input change when editing task
    function handleEditChange(index:number, newText: string) {
        setItems(
            items.map((item, i) =>
            i === index ? {...item, text: newText} : item
            )
        );
    }

    //saves edited text
    function saveEdit(index:number) {
        setItems(
            items.map((item, i) =>
            i === index ? {...item, editing: false} : item
            )
        );
    }



    return (
        <div className = "container">
            <input
            type="text"
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a task..."
            />

            <button type="button" onClick={onClick} > 
                Add Task
            </button>


            <ul>
                {items.map((item, index) => (
                    <li key={index} style={{ textDecoration: item.completed ? "line-through" : "none" }}>
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleTask(index)}
                        />
                        {item.editing ? (
                            <input
                            type="text"
                            value={item.text}
                            onChange={(e) => handleEditChange(index, e.target.value)}
                            onBlur={() => saveEdit(index)} //save when clicking outside
                            onKeyDown={(e) => e.key === "Enter" && saveEdit(index)} //save when pressing enter
                            
                            />
                        ) : (
                            <span onClick={() => enableEdit(index)}>{item.text}</span> //click to edit
        
                        )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


export default AddTask;