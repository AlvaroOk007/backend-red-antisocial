const { Router } = require("express");
const { Post, Image } = require("../db/models");
const { postControllers } = require("../controllers");
const { genericMiddlewares, postMiddlewares } = require("../middlewares");
const { postSchema } = require("../schemas");
const postRoutes = Router();

// Metodos
// Get
postRoutes.get("/", postControllers.getPosts);

postRoutes.get(
  "/:id",
  genericMiddlewares.existID(Post),
  genericMiddlewares.validateID(Post),
  postControllers.getPostByPk
);

// Post
postRoutes.post(
  "/",
  postMiddlewares.canPost,
  genericMiddlewares.validatorSchema(postSchema),
  postControllers.createPost
);

// Put
postRoutes.put(
  "/:id",
  genericMiddlewares.validatorSchema(postSchema),
  genericMiddlewares.existID(Post),
  genericMiddlewares.validateID(Post),
  postControllers.editPost
);

postRoutes.put("/:id/images/:imgId", postControllers.editPostImage);

// Delete
postRoutes.delete(
  "/:id",
  genericMiddlewares.existID(Post),
  genericMiddlewares.validateID(Post),
  postControllers.deletePost
);

postRoutes.delete("/:id/images/:imgId", postControllers.deletePostImage);

// Exportacion
module.exports = postRoutes;
