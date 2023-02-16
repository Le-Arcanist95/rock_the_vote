import React, { useContext } from "react";
// import DataContext from "../../context/DataProvider";

export default function Comment (props) {
    // const { deleteComment } = useContext(DataContext);

    return (
        <div className="flex flex-row items-center justify-between border-2 border-gray-300 p-2 rounded-lg my-2 mx-1">
            <div>
                <h3 className="text-lg font-semibold">{props.user.username}</h3>
                <p className="text-sm">{props.comment}</p>
            </div>
            <div>
                <p className="text-sm">{new Date(props.date).toLocaleString()}</p>
            </div>
            {/* <div>
                <button className="bg-red-500 text-white px-2 py-1 rounded-lg" onClick={() => deleteComment(props.issueId, props._id)}>X</button>
            </div> */}
        </div>
    );
}