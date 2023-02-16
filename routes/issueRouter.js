const express = require("express");
const issueRouter = express.Router();
const { getAllIssues, addIssue, getIssue, updateIssue, deleteIssue, getIssuesByUser, upvoteIssue, downvoteIssue } = require("../controllers/IssueController.js");
const { addComment, deleteComment } = require("../controllers/CommentController.js");

issueRouter.route("/")
  .get(getAllIssues)
  .post(addIssue);

issueRouter.route("/:issueId")
  .get(getIssue)
  .put(updateIssue)
  .delete(deleteIssue);

issueRouter.route("/:issueId/comments")
  .put(addComment);

// issueRouter.route("/:issueId/comments/:commentId")
//   .delete(deleteComment);

issueRouter.route("/:issueId/upvote")
  .put(upvoteIssue);

issueRouter.route("/:issueId/downvote")
  .put(downvoteIssue);

issueRouter.route('/user')
  .get(getIssuesByUser);

module.exports = issueRouter;