import { createContext, useState } from "react";
import { axiosClient } from "../hooks/useAxios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || null,
        accessToken: localStorage.getItem("accessToken") || "",
    }
    const [userState, setUserState] = useState(initState);
    const [errMsg, setErrMsg] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleAuthErr = (err) => {
        setErrMsg(err.response.data.errMsg);
        setTimeout(() => setErrMsg(""), 10000);
    };

    const register = (credentials) => {
        axiosClient.post("/auth/register", credentials)
            .then(res => {
                console.log(res.data);
                const { user, accessToken } = res.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessToken", accessToken);
                setUserState({...userState, user, accessToken});
                setRedirect(true);
            })
            .catch(err => handleAuthErr(err));
    };

    const login = (credentials) => {
       axiosClient.post("/auth/login", credentials)
            .then(res => {
                const { user, accessToken } = res.data;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("accessToken", accessToken);
                setUserState({...userState, user, accessToken});
                setRedirect(true);
            })
            .catch(err => handleAuthErr(err));
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        setUserState({...userState, user: null, accessToken: ""});
    };

    return (
        <AuthContext.Provider value={{
            ...userState,
            register,
            login,
            logout,
            errMsg,
            redirect,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;