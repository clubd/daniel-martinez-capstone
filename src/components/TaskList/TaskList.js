
import { Link } from "react-router-dom";
import "./TaskList.scss";

function TaskList({ tasks }) {
    return (
        <>
        <h2 className="task__heading">Task</h2>
        <div className="task__list">
            {tasks.map((task) => (
                <div key={task.id} className="task__list-item">
                    <div className="task__list-container">
                    <h3 className="task__title">{task.title}</h3>
                    <p className="task__description">{task.description}</p>
                    <Link className="task__link" to={`/task-list/${task.id}`}>Assign Task</Link>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default TaskList;
