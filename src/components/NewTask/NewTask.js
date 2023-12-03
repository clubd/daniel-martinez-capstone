import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import recordOnImage from "../../assets/icons/on.svg";
import recordOffImage from "../../assets/icons/off.svg";

import "./NewTask.scss";

const NewTask = ({ userId }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        importance: "low",
        dueDate: "",
    });
    const [error, setError] = useState("");
    const [transcriptionResult, setTranscriptionResult] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");
    const [isRecordingActive, setIsRecordingActive] = useState(false);
    const navigate = useNavigate();

    let recognition;

    useEffect(() => {

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, []);

    const startRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
        if (!SpeechRecognition) {
            console.error('Speech recognition not supported');
            return;
        }
    
        if (!recognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = selectedLanguage;
    
            recognition.onstart = () => {
                console.log('Recording started...');
                setIsRecording(true);
            };
    
            recognition.onresult = (event) => {
                const result = event.results[event.results.length - 1][0].transcript;
                console.log('Transcription result:', result);
                setTranscriptionResult(result);
            };
    
            recognition.onerror = (event) => {
                console.error('Error during recording:', event.error);
                setIsRecording(false);
            };
    
            recognition.onend = () => {
                console.log('Recording ended...');
                setIsRecording(false);
            };
        }
    
        if (isRecordingActive) {
            console.log('Stopping recording...');
            if (transcriptionResult) {
                setIsRecordingActive(false);
                recognition.stop();
            }
        } else {
            console.log('Starting recording...');
            recognition.start();
            setIsRecordingActive(true);
        }
    };
    

    const sendToWhisperAPI = async (audioText) => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/audio/transcriptions',
                { text: audioText },
                {
                    headers: {
                        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Whisper API response:', response.data);
        } catch (error) {
            console.error('Error sending transcription to Whisper API:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!transcriptionResult && !formData.description && (!formData.title || !formData.description)) {
            setError("Title and description cannot be empty.");
            return;
        }


        try {
            const authToken = sessionStorage.getItem("token");

            await sendToWhisperAPI(transcriptionResult);

            const response = await axios.post(
                `http://localhost:8087/users/${userId}/tasks`,
                {
                    title: formData.title,
                    description: transcriptionResult || formData.description || "",
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
                        <textarea className="new-task__textarea" placeholder="Description" name="description" value={transcriptionResult || formData.description} onChange={handleChange} required></textarea>

                        <img className="new-task__audio-container" src={isRecordingActive ? recordOffImage : recordOnImage} alt={isRecordingActive ? 'Stop Recording' : 'Start Recording'} onClick={startRecording} style={{ cursor: 'pointer' }} />
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