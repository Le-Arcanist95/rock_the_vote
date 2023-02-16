const Issue = require('../models/Issue.js');
const Comment = require('../models/Comment.js');

// Get All Todos
exports.getAllIssues = (req, res, next) => {
   Issue.find((err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
}

// Add new Issue
exports.addIssue = (req, res, next) => {
    req.body.user = req.auth._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
}

// Get Issue by ID
exports.getIssue = (req, res, next) => {
    Issue.findOne(
        { _id: req.params.issueId },
        (err, foundIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(foundIssue)
        }
    )
}

// Update Issue
exports.updateIssue = (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
}

// Upvote Issue - If user has already upvoted, remove upvote. If user has downvoted, remove downvote and add upvote. If user has not voted, add upvote.
exports.upvoteIssue = (req, res, next) => {
    Issue.findOne(
        { _id: req.params.issueId },
        (err, foundIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // If user has already upvoted, remove upvote
            if(foundIssue.upvotes.includes(req.body.userId)){
                Issue.findOneAndUpdate(
                    { _id: req.params.issueId },
                    { $pull: { upvotes: req.body.userId } },
                    { new: true },
                    (err, updatedIssue) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        return res.status(201).send(updatedIssue)
                    }
                )
            }
            // If user has downvoted, remove downvote and add upvote
            else if(foundIssue.downvotes.includes(req.body.userId)){
                Issue.findOneAndUpdate(
                    { _id: req.params.issueId },
                    { $pull: { downvotes: req.body.userId } },
                    { new: true },
                    (err, updatedIssue) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        Issue.findOneAndUpdate(
                            { _id: req.params.issueId },
                            { $push: { upvotes: req.body.userId } },
                            { new: true },
                            (err, updatedIssue) => {
                                if(err){
                                    res.status(500)
                                    return next(err)
                                }
                                return res.status(201).send(updatedIssue)
                            }
                        )
                    }
                )
            }
            // If user has not voted, add upvote
            else {
                Issue.findOneAndUpdate(
                    { _id: req.params.issueId },
                    { $push: { upvotes: req.body.userId } },
                    { new: true },
                    (err, updatedIssue) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        return res.status(201).send(updatedIssue)
                    }
                )
            }
        }
    )
}

// Downvote Issue - If user has already downvoted, remove downvote. If user has upvoted, remove upvote and add downvote. If user has not voted, add downvote.
exports.downvoteIssue = (req, res, next) => {
    Issue.findOne(
        { _id: req.params.issueId },
        (err, foundIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            // If user has already downvoted, remove downvote
            if(foundIssue.downvotes.includes(req.body.userId)){
                Issue.findOneAndUpdate(
                    { _id: req.params.issueId },
                    { $pull: { downvotes: req.body.userId } },
                    { new: true },
                    (err, updatedIssue) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        return res.status(201).send(updatedIssue)
                    }
                )
            }
            // If user has upvoted, remove upvote and add downvote
            else if(foundIssue.upvotes.includes(req.body.userId)){
                Issue.findOneAndUpdate(
                    { _id: req.params.issueId },
                    { $pull: { upvotes: req.body.userId } },
                    { new: true },
                    (err, updatedIssue) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        Issue.findOneAndUpdate(
                            { _id: req.params.issueId },
                            { $push: { downvotes: req.body.userId } },
                            { new: true },
                            (err, updatedIssue) => {
                                if(err){
                                    res.status(500)
                                    return next(err)
                                }
                                return res.status(201).send(updatedIssue)
                            }
                        )
                    }
                )
            }
            // If user has not voted, add downvote
            else {
                Issue.findOneAndUpdate(
                    { _id: req.params.issueId },
                    { $push: { downvotes: req.body.userId } },
                    { new: true },
                    (err, updatedIssue) => {
                        if(err){
                            res.status(500)
                            return next(err)
                        }
                        return res.status(201).send(updatedIssue)
                    }
                )
            }
        }
    )
}

// Delete Issue
exports.deleteIssue = (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.auth._id },
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted issue ${deletedIssue.title} from the database`)
        }
    )
}

// Get Issues by User
exports.getIssuesByUser = (req, res, next) => {
    Issue.find({ user: req.auth._id }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    });
};