import React, { useState, useContext, useEffect, useCallback } from 'react';
import Issue from './Issue.js';
import DataContext from '../../context/DataProvider.js';

export default function IssueList() {
    const [issueList, setIssueList] = useState([]);
    const { issues } = useContext(DataContext);

    // Sort issues by upvotes
    const sortIssues = useCallback(() => {
        const sortedIssues = issues.sort((a, b) => b.upvotes.length - a.upvotes.length);
        setIssueList(sortedIssues);
    }, [issues]);

    useEffect(() => {
        sortIssues();
    }, [issues, sortIssues]);

    // Render JSX
    return (
        <div className="flex flex-col items-center justify-center w-full">
            {issueList.map(issue => ( <Issue key={issue._id} issue={issue} /> ))}
        </div>
    );
}
