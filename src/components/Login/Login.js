import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeVisible, EyeNotVisible } from "../../assets/icons";
import "./Login.scss"

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "",});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>

        </div>
    )
}

export default Login;
