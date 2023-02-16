import React, { useContext } from 'react';
import AuthContext from '../../context/AuthProvider.js';
import IssueList from '../Issues/IssueList.js';

export default function Home() {
    const { accessToken } = useContext(AuthContext);

    // Render JSX with ternary for displaying issues and comments from database if user is logged in. If not, display a message to describe the app.
    return (
        <>
            {accessToken ? (
                <div className="flex flex-col items-center justify-center h-fit">
                    <h1 className="text-3xl font-bold">Issues</h1>
                    <div className="flex flex-col items-center justify-center h-fit">
                        <IssueList />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center h-screen">
                    <h1 className="text-3xl font-bold my-5">Welcome to the homepage!</h1>
                    <p className="text-xl m-3">This is a forum page where you and many others can come together to discuss a variety of political issues. Once you have created an account, this page will be populated with a list of posts others have created and they will be sorted by popularity. You'll be able to comment, upvote, downvote, and even create your own posts as well. Come join the discussion!</p>
                    <p className="text-xl">Please login or register to view issues and comments.</p>
                </div>
            )}
        </>
    );
}