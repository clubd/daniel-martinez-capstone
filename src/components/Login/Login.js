import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as EyeVisible } from "../../assets/icons/ion_eye-outline.svg";
import { ReactComponent as EyeNotVisible } from "../../assets/icons/basil_eye-closed-outline.svg";
import logo from "../../assets/logo/logo-white.svg"
import "./Login.scss"

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "", });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!loginData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!loginData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);
            try {
                const response = await axios.post("http://localhost:8087/users/login", loginData);
                if (response) {
                    sessionStorage.setItem("token", response.data.token);
                    onLogin(response.data);

                    if (response.data.token) {
                        navigate(`/users/${response.data.userId}`);
                    } else {
                        console.error("User not approved. Please try again");
                    }
                }
            } catch (error) {
                console.error("Error during login:", error.response?.data?.message);

                if (error.response?.status === 401) {
                    window.alert("Wrong email or password. Please check and try again.");
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    return (
        <div className="login">
            <div className="login__container-top">
            <img src={logo} alt="Logo" className="login__logo" />
            <h1 className="login__heading">Login</h1>
            </div>
            <form className="login__form" onSubmit={handleSubmit}>
                <div className="login__container login__container-email">
                    <input
                        className="login__input" placeholder=" " type="text" id="email" name="email" value={loginData.email}
                        onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <label className="login__label" htmlFor="email">Email</label>
                </div>
                <div className="login__container login__container-password">
                    <input className="login__input" placeholder=" " type={showPassword ? "text" : "password"} id="password" name="password" value={loginData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <label className="login__label" htmlFor="password">Password</label>
                    <button className="login__show-password" type="button" onClick={togglePasswordVisibility}> {showPassword ? <EyeNotVisible /> : <EyeVisible />}</button>
                </div >
                <button className="login__button" type="submit" disabled={loading}> {loading ? "Logging in..." : "Login"}</button>
            </form>
            <p className="login__new"> Don't have an account? <Link className="login__link" to="/signup">Create one</Link>.</p>
        </div >
    );
}

export default Login;
