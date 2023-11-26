import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EyeVisible } from "../../assets/icons/ion_eye-outline.svg";
import { ReactComponent as EyeNotVisible } from "../../assets/icons/basil_eye-closed-outline.svg";
import "./SignUp.scss";

function SignUp({ onSignUp }) {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        firstName: "", lastName: "", email: "", phone: "", password: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);


    const validateForm = () => {
        const newErrors = {};

        if (!userDetails.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!userDetails.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!userDetails.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!userDetails.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\+?\d{1,3}(?:\s?\d{3,})+$/.test(userDetails.phone)) {
            newErrors.phone = 'Invalid phone format';
        }

        if (!userDetails.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post("http://localhost:8087/users/register", userDetails);
                onSignUp(response.data);
                navigate("/login");
            } catch (error) {
                console.error('Error during signup:', error.response.data.message);
            }
        }
    };

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };



    return (
        <div className="signup">
            <h1 className="signup__heading">Sign Up</h1>
            <form className="signup__form" onSubmit={handleSubmit}>
                <div className="signup__container signup__container-first">
                    <input className="signup__input" placeholder=" " type="text" id="firstName" name="firstName" value={userDetails.firstName} onChange={handleChange} />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                    <label className="signup__label signup__label--first" htmlFor="firstName">First Name</label>
                </div>
                <div className="signup__container signup__container-last">
                    <input className="signup__input" placeholder=" " type="text" id="lastName" name="lastName" value={userDetails.lastName} onChange={handleChange} />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                    <label className="signup__label signup__label--last" htmlFor="lastName">Last Name</label>
                </div>
                <div className="signup__container signup__container-email">
                    <input className="signup__input" placeholder=" " type="text" id="email" name="email" value={userDetails.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <label className="signup__label signup__label--email" htmlFor="email">Email</label>
                </div>
                <div className="signup__container signup__container-phone">
                    <input className="signup__input" placeholder=" " type="text" id="phone" name="phone" value={userDetails.phone} onChange={handleChange} />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                    <label className="signup__label signup__label--phone" htmlFor="phone">Phone</label>
                </div>
                <div className="signup__container signup__container-password">
                    <input className="signup__input" placeholder=" " type={showPassword ? "text" : "password"} id="password" name="password" value={userDetails.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                    <label className="signup__label signup__label--password" htmlFor="password">Password</label>
                    <button className="signup__show-password" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeNotVisible /> : <EyeVisible />} 
                </button>
                </div>
                <button className="signup__button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;