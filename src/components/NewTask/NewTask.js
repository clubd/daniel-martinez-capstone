import { useState } from "react";
import axios from "axios";

const NewTask = () => {
    const [formData, setFormData] = useState({
        title: "", description: "", importance: "low", dueDate: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,[e.target.name]: e.target.value,
        });
    };
}