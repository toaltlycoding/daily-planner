import {useState} from 'react';

function AddDaily() {

    const [list, setList] = useState([]);
    const [task, setTask] = useState("");

    function handleClick = () => {
       if (task.trim()) {
        setList([...list, {text: task, completed: false }]);
        setTask("");
       }

    }

    function handleChange(e) {
        setDone(e.target.checked);
    }


    return (
        <div className = "Container">
        <label>
            <input
            type="text"
            value={task}
            onChange={handleChange} />
        </label>
            <button onClick={handleClick}>
             Add Task
            </button>

        </div>
    );

}


export default AddDaily