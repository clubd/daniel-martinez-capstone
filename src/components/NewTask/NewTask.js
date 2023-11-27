import { useState } from "react";
import axios from "axios";

const NewTask = () => {
    const [formData, setFormData] = useState({
        title: "", description: "", importance: "low", dueDate: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8087/tasks", formData);

            console.log(response.data);

            setFormData({
                title: "",description: "", importance: "low", dueDate: "",
            });
        } catch (error) {
    
            console.error("Error creating task:", error);
        }
    };

}

export default NewTask;