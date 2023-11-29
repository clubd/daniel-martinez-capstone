import React from "react";
import SignUp from "../../components/SignUp/SignUp";
import "./SignUpPage.scss";

function SignUpPage() {
    const handleSignUp = (data) => {
        
        console.log("Signed up:", data);
    };

    return (
        <div>
            <SignUp onSignUp={handleSignUp} />
        </div>
    );
}

export default SignUpPage;
