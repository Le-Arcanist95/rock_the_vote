import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import AuthForm from "../Auth/AuthForm.js";

const initInputs = { username: "", password: "", repeatPassword: "", email: "" };

export default function Auth() {
    // State for login or register
    const { register, login, errMsg, redirect } = useContext(AuthContext);
    const [inputData, setInputData] = useState(initInputs);
    const [isLogin, setIsLogin] = useState(true);

    // Check if user is logging in or registering and call the appropriate function
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            login(inputData);
        } else {
            register(inputData);
        }
    };
    // Handle input change    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData(prevInputs => ({ ...prevInputs, [name]: value }));
    }
    // Toggle between login and register -- handles setting state for nested ternary.
    const handleToggle = () => {
        setIsLogin(prevState => !prevState);
    };

    // Render JSX with ternary for AuthForm component to handle login and register forms.
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {redirect ? <Navigate to="/home" /> : null}
            <AuthForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleToggle={handleToggle}
                inputData={inputData}
                toggleVal={isLogin}
                errMsg={errMsg}
            />
        </div>
    );
};