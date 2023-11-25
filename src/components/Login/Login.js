import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { EyeVisible, EyeNotVisible } from "../../assets/icons";
import "./Login.scss"

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "", });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login">
            <h1 className="login__heading">Login</h1>
            <form className="login__form">
                <div className="login__container login__container-email">
                    <input
                        className="login__input" placeholder=" " type="text" id="email" name="email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <label className="login__label" htmlFor="email">Email</label>
                </div>
                <div className="login__container login__container-password">
                    <input className="login__input" placeholder=" " type={showPassword ? "text" : "password"} id="password" name="password" value={loginDetails.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <label className="login__label" htmlFor="password">Password</label>
                    <button className="login__show-password" type="button" onClick={togglePasswordVisibility}> {showPassword ? <EyeNotVisible /> : <EyeVisible />}</button>
                </div >
                <button className="login__button" type="submit">Login</button>
            </form>
            <p> Don't have an account? <Link to="/signup">Create one</Link>.</p>
        </div >
    );
}

export default Login;
