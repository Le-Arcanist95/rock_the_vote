// Import pre-built and custom hooks
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { axiosClientPrivate } from "../hooks/useAxios";
import AuthContext from "./AuthProvider";

// Create context
const DataContext = createContext();

// Create provider for context
export const DataProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [issues, setIssues] = useState([]);

    // Get all issues
    const getIssues = useCallback(async () => {
        await axiosClientPrivate.get("/issues")
            .then(res => {
                setIssues(res.data)
            })
            .catch(err => console.log(err));
    }, []);

    // Update issue
    const updateIssue = useCallback(async (issueId, updatedIssue) => {
        await axiosClientPrivate.put(`/issues/${issueId}`, updatedIssue)
            .then(res => {
                setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
            })
            .catch(err => console.log(err));
    }, []);

    // Delete issue
    const deleteIssue = useCallback(async (issueId) => {
        await axiosClientPrivate.delete(`/issues/${issueId}`)
            .then(res => {
                setIssues(prevIssues => prevIssues.filter(issue => issue._id !== issueId))
            })
            .catch(err => console.log(err));
    }, []);

    // Add new issue
    const addIssue = useCallback(async (newIssue) => {
        await axiosClientPrivate.post("/issues", newIssue)
            .then(res => {
                setIssues(prevIssues => [...prevIssues, res.data])
            })
            .catch(err => console.log(err));
    }, []);

    // Upvote issue
    const upvoteIssue = useCallback(async (issueId) => {
        if (user) {
            await axiosClientPrivate.put(`/issues/${issueId}/upvote`, { userId: user._id })
                .then(res => {
                    setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
                })
                .catch(err => console.log(err));
        }
    }, [user]);

    // Downvote issue
    const downvoteIssue = useCallback(async (issueId) => {
        if (user) {
            await axiosClientPrivate.put(`/issues/${issueId}/downvote`, { userId: user._id })
                .then(res => {
                    setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
                })
                .catch(err => console.log(err));
        }
    }, [user]);

    // Add comment to issue
    const addComment = useCallback(async (issueId, newComment) => {
        Object.assign(newComment, { userId: user._id, username: user.username });
        if (user) {
            await axiosClientPrivate.put(`/issues/${issueId}/comments`, newComment)
                .then(res => {
                    setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
                })
                .catch(err => console.log(err));
        }
    }, [user]);

    // const deleteComment = useCallback(async (issueId, commentId) => {
    //     await axiosClientPrivate.delete(`/issues/${issueId}/comments/${commentId}`, { userId: user._id })
    //         .then(res => {
    //             setIssues(prevIssues => prevIssues.map(issue => issue._id === issueId ? res.data : issue))
    //         })
    //         .catch(err => console.log(err));
    // }, [user._id]);

    useEffect(() => {
        if( user ) {
            getIssues();
        }
    }, [user, getIssues]);

    // useEffect(() => {
    //     setIssues(issues.sort((a, b) => b.upvotes.length - a.upvotes.length));
    // }, [issues]);

    return (
        <DataContext.Provider value={{
            issues,
            setIssues,
            getIssues,
            updateIssue,
            deleteIssue,
            addIssue,
            addComment,
            // deleteComment,
            upvoteIssue,
            downvoteIssue
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;