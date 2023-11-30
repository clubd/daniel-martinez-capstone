import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewTask.scss";

const NewTask = ({ userId }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        importance: "low",
        dueDate: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError("Title and description cannot be empty.");
            return;
        }

        try {
            const authToken = sessionStorage.getItem("token");

            console.log("Current userId:", userId);

            const response = await axios.post(
                `http://localhost:8087/users/${userId}/tasks`,
                {
                    title: formData.title,
                    description: formData.description,
                    status: formData.importance || "pending",
                    priorityLevel: formData.importance,
                    deadline: formData.dueDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            console.log(response.data);

            setFormData({
                title: "",
                description: "",
                importance: "low",
                dueDate: "",
            });

            navigate(`/users/${userId}`);

            alert("Task added successfully!");
        } catch (error) {
            console.error("Error creating task:", error);
            console.error("Server response:", error.response);
            if (error.response && error.response.data) {
                console.error("Response data:", error.response.data);
            }

            // Handle the error or update the state accordingly
            setError("Error creating task. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="new-task__container">
            <h2 className="new-task__heading">New Task</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="new-task__form-container">
                <form className="new-task__form" onSubmit={handleSubmit}>
                    <div className="new-task__label-container">
                        <label className="new-task__label new-task__label-title">
                            Title:</label>
                        <input className="new-task__input" type="text" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="new-task__textarea-container">
                        <label className="new-task__label"></label>
                        <textarea className="new-task__textarea" placeholder="Description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="new-task__label-container">
                        <label className="new-task__label new-task__label-importance">Order:</label>
                        <select className="new-task__select" name="importance" value={formData.importance} onChange={handleChange}>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="new-task__label-container">
                        <label className="new-task__label new-task__label-date">Due Date:</label>
                        <input className="new-task__input" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required />
                    </div>
                    <button className="new-task__button" type="submit">Add Task</button>
                </form>
            </div>
        </div>
    );
}

export default NewTask;