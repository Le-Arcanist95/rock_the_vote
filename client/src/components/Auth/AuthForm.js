import React from 'react';

export default function AuthForm(props) {
    // Destructure props
    const { 
        handleChange, 
        handleSubmit, 
        inputData: {
            username,
            password,
            repeatPassword,
            email
        },
        toggleVal,
        handleToggle,
        errMsg
    } = props;
    
    // Render JSX with ternary to display login or register form.
    // Add Error Message if there is one. Use tailwind css classes to smooth out transition when message appears and disappears.
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {toggleVal ? (
                <>
                    {errMsg ? <p className="text-red-500 text-center mb-4 transition-all duration-500">{errMsg}</p> : null}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="border-2 border-gray-300 p-2 rounded-lg my-2"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="border-2 border-gray-300 p-2 rounded-lg my-2"
                        />
                        <button className="bg-blue-500 text-white p-2 rounded-lg my-2">Login</button>
                    </form>
                    <p className="mt-4">
                        Don't have an account?
                        <span className="text-blue-500 cursor-pointer" onClick={handleToggle}> Register </span>
                    </p>
                </>
            ) : (
                <>
                    {errMsg ? <p className="text-red-500 text-center mb-4 transition-all duration-500">{errMsg}</p> : null}
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="border-2 border-gray-300 p-2 rounded-lg my-2"
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="border-2 border-gray-300 p-2 rounded-lg my-2"
                        />
                        <input
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={handleChange}
                            placeholder="Repeat Password"
                            className="border-2 border-gray-300 p-2 rounded-lg my-2"
                        />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border-2 border-gray-300 p-2 rounded-lg my-2"
                        />
                        <button className="bg-blue-500 text-white p-2 rounded-lg my-2"> Register </button>
                    </form>
                    <p className="mt-4">
                        Already have an account?{" "}
                        <span className="text-blue-500 cursor-pointer" onClick={handleToggle}> Login </span>
                    </p>
                </>
            )}
        </div>
    )
}