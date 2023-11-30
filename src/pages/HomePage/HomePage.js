import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    const { userId } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                console.log('Current userId:', userId);
                const token = sessionStorage.getItem("token"); 
    
                const userResponse = await axios.get(`http://localhost:8087/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setUserData(userResponse.data);
    
                const tasksResponse = await axios.get(`http://localhost:8087/users/${userId}/tasks`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setTasks(tasksResponse.data);
            } catch (error) {
                console.error("Error obtaining data:", error);
            }
        };
    
        getData();
    }, [userId]);

    return (
        <>
            <Header />
            <div className="homepage">
                <div className="homepage__user-info">
                    <UserInfo userData={userData} />
                </div>
                <div className="homepage__tasks">
                        <TaskList tasks={tasks} />
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
