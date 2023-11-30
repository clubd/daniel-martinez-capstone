import "./TaskPage.scss"
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const TaskPage = () => {
    const userId = sessionStorage.getItem("userId");
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const taskData = async () => {
            try {
                const authToken = sessionStorage.getItem("token");
                const response = await axios.get(`http://localhost:8087/users/${userId}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setError("Error fetching tasks. Please try again.");
            }
        };

        taskData();
    }, [userId]);

    return (
        <>
            <Header />
            <div className="tasks">
                <h2 className="tasks__title">Tasks</h2>
                <ul className="tasks__lists">
                    {tasks.map((task) => (
                        <li className="tasks__lists-item" key={task.id}>
                            <strong className="tasks__title-name">Title:</strong><p className="tasks__title-definiton"> {task.title} </p>, <strong className="tasks__title-name">Status:</strong> {task.status}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};


export default TaskPage;