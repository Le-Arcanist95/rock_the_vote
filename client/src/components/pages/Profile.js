import React, { useContext, useState } from 'react';
import AuthContext from "../../context/AuthProvider.js";
import DataContext from "../../context/DataProvider.js";
import IssueForm from "../Issues/IssueForm.js";
import Issue from "../Issues/Issue.js";

export default function Profile() {
    const { user } = useContext(AuthContext);
    const { issues } = useContext(DataContext);
    const userIssues = issues.filter(issue => issue.user_id === user.id);

    
    return (
        <main className="flex flex-grow flex-col items-center justify-center h-fit">
            <section className="flex flex-col items-center justify-center h-1/3 w-3/4 border-2 border-gray-400 my-3">
                <h1 className="text-3xl font-bold mt-3">Profile</h1>
                <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
                <p className="text-xl font-bold mb-4">Your email is: {user.email}</p>
            </section>
            <section className="flex flex-col items-center justify-center h-1/3 w-3/4 border-2 border-gray-400 mb-3">
                <h2 className="text-2xl font-bold mb-4">Create an Issue</h2>
                <IssueForm />
            </section>
            <section className="flex flex-col items-center h-1/3 w-3/4 border-2 border-gray-400 mb-3">
                <h2 className="text-2xl font-bold mb-4">Your Issues</h2>
                {/* Map through issues connected to user's ID. Each issue should include title, description, vote counter with buttons to upvote or downvote, a status marker for "Resolved" if true and "Ongoing" if false. */}
                {userIssues.map((issue) => <Issue key={issue._id} issue={issue} />)}
            </section>
        </main>
    );
}