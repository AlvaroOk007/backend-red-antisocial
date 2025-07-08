const userSchema = require("./user.schema");
const postSchema = require("./post.schema");
const tagSchema = require("./tag.schema");
const commentSchema = require("./comment.schema");
const imageSchema = require("./image.schema");
const postTagSchema = require("./tagpost.schema");
// Exportacion
module.exports = {
  userSchema,
  postSchema,
  tagSchema,
  commentSchema,
  imageSchema,
  postTagSchema,
};

