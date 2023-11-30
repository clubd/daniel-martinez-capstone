import { Link } from "react-router-dom";
import { useState } from "react";
import "./TaskList.scss";

function TaskList({ tasks }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setAlertMessage("");
    };

    const handleAssignClick = () => {
        openModal();
    };

    const handleYesClick = () => {
        setAlertMessage("Task assigned to you!, Thank you");
        setTimeout(() => {
            closeModal();
        }, 2000);
    };

    const handleNoClick = () => {
        
        closeModal();
    };

    return (
        <>
            <h2 className="task__heading">Tasks</h2>
            <div className="task__list">
                {tasks.map((task) => (
                    <div key={task.id} className="task__list-item">
                        <div className="task__list-container">
                            <h3 className="task__title">{task.title}</h3>
                            <p className="task__description">{task.description}</p>
                            <button className="task__link" onClick={handleAssignClick}>
                                Assign Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    {alertMessage ? (
                            <p>{alertMessage}</p>
                        ) : (
                            <>
                                <p>Do you want to assign this task to yourself?</p>
                        <button className="modal-content__button" onClick={handleYesClick}>Yes</button>
                        <button className="modal-content__button" onClick={handleNoClick}>No</button>
                        </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskList;