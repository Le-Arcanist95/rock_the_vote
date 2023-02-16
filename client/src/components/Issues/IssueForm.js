import React, { useState, useContext } from "react";
import DataContext from "../../context/DataProvider.js";

const initInputs = {
    title: "",
    description: ""
}

export default function IssueForm() {
    const { addIssue } = useContext(DataContext);
    const [inputs, setInputs] = useState(initInputs);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevInputs => ({...prevInputs, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addIssue(inputs);
        setInputs(initInputs);
    }

    return (
        <div className="flex flex-col items-center justify-center h-min">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input
                    type="text"
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border-2 border-gray-300 p-2 rounded-lg my-2"
                />
                <input
                    type="text"
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border-2 border-gray-300 p-2 rounded-lg my-2"
                />
                <button className="bg-blue-500 text-white p-2 rounded-lg my-2">Add Issue</button>
            </form>
        </div>
    );
}
// Path: client/src/components/Issues/IssueForm.js