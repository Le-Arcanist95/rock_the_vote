const Issue = require('../models/Issue.js');
const Comment = require('../models/Comment.js');

// Create comment and add to issue
exports.addComment = (req, res, next) => {
    req.body.user = { _id: req.body.userId, username: req.body.username };
    const newComment = new Comment(req.body)
    console.log(`This is the newComment: ${newComment}`);
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        Issue.findOneAndUpdate(
            { _id: req.params.issueId },
            { $push: { comments: savedComment } },
            { new: true, safe: true, upsert: true },
            (err, updatedIssue) => {
                if(err){
                    res.status(500)
                    return next(err)
                }
                console.dir(`This is the updatedIssue: ${updatedIssue}`);
                return res.status(201).send(updatedIssue)
            }
        )
    })
}

// Delete comment from issue if user is the author
// exports.deleteComment = (req, res, next) => {
//     Issue.findOneAndUpdate(
//         { _id: req.params.issueId },
//         { $pull: { comments: { _id: req.params.commentId, user: { _id: req.auth._id } } } },
//         { new: true, safe: true, upsert: true },
//         (err, updatedIssue) => {
//             if(err){
//                 res.status(500)
//                 return next(err)
//             }
//             console.log(`This is the updatedIssue: ${updatedIssue}`);
//             return res.status(201).send(updatedIssue)
//         }
//     )
// }