import React from "react";
import Login from "../../components/Login/Login";

import "./LoginPage.scss";

function LoginPage() {

    const handleLogin = (userData) => {
        console.log("User logged in:", userData);
    };
    return (
        <div className="login-page">
            <Login onLogin={handleLogin} />
        </div>
    );
}

export default LoginPage;