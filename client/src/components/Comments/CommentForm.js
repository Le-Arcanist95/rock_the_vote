import React, { useContext } from "react";
import DataContext from "../../context/DataProvider";

export default function CommentForm({ issueId }) {
    const { addComment } = useContext(DataContext);
    const [inputs, setInputs] = React.useState({
        comment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({...prevInputs, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(issueId, inputs);
    }

    return (
        <div className="col-span-6 w-full">
            <form onSubmit={handleSubmit} className="grid grid-cols-4 items-center mx-auto w-full">
                <input
                    type="text"
                    name="comment"
                    value={inputs.comment}
                    onChange={handleChange}
                    placeholder="Comment"
                    className="border-2 border-gray-300 p-2 rounded-lg my-2 mx-1 col-span-3"
                />
                <button className="bg-blue-500 text-white p-2 rounded-lg my-2 mx-1 col-span-1">Add Comment</button>
            </form>
        </div>
    );
}