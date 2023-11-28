import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserInfo from "../../components/UserInfo/UserInfo";
import TaskList from "../../components/TaskList/TaskList";
import TaskCounter from "../../components/TaskCounter/TaskCounter";
import Calendar from "../../components/Calendar/Calendar";
import Header from "../../components/Header/Header";
import "./HomePage.scss";


function HomePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const userResponse = await axios.get("http://localhost:8087/users");
                setUserData(userResponse.data);

                const tasksResponse = await axios.get(`http://localhost:8087/users/${userResponse.data.id}/tasks`);
                setTasks(tasksResponse.data);
            } catch (error) {
                console.error("Error obtain data:", error);
            }
        };

        getData();
    }, []);

    return (
        <>
            <Header />
            <div className="homepage">
                <div className="homepage__user-info">
                    <UserInfo userData={userData} />
                </div>
                <div className="homepage__tasks">
                {userData.id ? (
                        <TaskList tasks={tasks} />
                    ) : (
                        <p>Loading tasks...</p>
                    )}
                </div>
                <div className="homepage__bottom-container">
                    <div className="homepage__task-actions">
                        <TaskCounter userId={userData.id} />
                    </div>
                    <div className="homepage__calendar">
                        <Calendar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
