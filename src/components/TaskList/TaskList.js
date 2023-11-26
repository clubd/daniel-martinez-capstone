
import { Link } from "react-router-dom";
import "./TaskList.scss";

function TaskList({ tasks }) {
    return (
        <div className="task_list">
            {tasks.map((task) => (
                <div key={task.id} className="task__list-item">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <Link to={`/task-list/${task.id}`}>Assign Task</Link>
                </div>
            ))}
        </div>
    );
}

export default TaskList;
