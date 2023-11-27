import { useEffect, useState } from "react";
import axios from "axios";
import "./TaskCounter.scss";

function TaskCounter({ userId }) {
    const [taskCount, setTaskCount] = useState(0);

    useEffect(() => {
        const getTaskCount = async () => {
            try {
                const response = await axios.get(`http://localhost:8087/users/${userId}/tasks`);
                setTaskCount(response.data.length);
            } catch (error) {
                console.error("Error fetching task count:", error);
            }
        };

        getTaskCount();
    }, [userId]);

    return (
        <div className="task-counter">
            <p>{`You have ${taskCount} tasks left.`}</p>
        </div>
    );
}

export default TaskCounter;