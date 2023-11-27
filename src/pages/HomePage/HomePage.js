import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfo from "../../components/UserInfo/UserInfo";
import TaskList from "../../components/TaskList/TaskList";
import TaskCounter from "../../components/TaskCounter/TaskCounter";


function HomePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:8087/users");
                setUserData(userResponse.data);

                const tasksResponse = await axios.get("http://localhost:8087/tasks");
                setTasks(tasksResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, []);

    return (
        <div className="homepage">
            <div className="homepage__user-info">
                <UserInfo userData={userData} />
            </div>
            <div className="homepage__tasks">
                <h2>Tasks Not Assigned Yet</h2>
                <TaskList tasks={tasks} />
            </div>
            <div className="homepage__task-actions">
                <h2>Your Task Counter</h2>
                <TaskCounter userId={userData.id} />
            </div>
            <div className="homepage__calendar">
                <h2>Calendar</h2>
                {/* <Calendar /> */}
            </div>
        </div>
    );
}

export default HomePage;
