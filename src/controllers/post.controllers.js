const { Post, Image, Comment, Tag } = require("../db/models");

// Getters
const getPosts = async (_, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Image,
          attributes: ["url", "id"],
        },
        {
          model: Comment,
          attributes: ["content", "publicationDate"],
          required: false,
        },
        {
          model: Tag,
          attributes: ["id", "description"],
          through: {
            attributes: [],
          },
          required: false,
        },
      ],
    }); // status
    const postsFiltered = posts.map((post) => {
      const visibleComments = post.Comments?.filter((c) => c.isVisible);
      const postJSON = post.toJSON();
      postJSON.Comments = visibleComments;
      return postJSON;
    });

    res.status(200).json(postsFiltered);
  } catch (error) {
    console.error(`Error al obtener los posts: ${error}`);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

const getPostByPk = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Image,
          attributes: ["url", "id"],
        },
        {
          model: Comment,
          attributes: ["content", "publicationDate"],
          required: false,
        },
        {
          model: Tag,
          attributes: ["id", "description"],
          through: {
            attributes: [],
          },
          required: false,
        },
      ],
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(`Error al obtener el post: ${error}`);
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

// Post
const createPost = async (req, res) => {
  try {
    const { description, UserId } = req.body;
    const postCreated = await Post.create({ description, UserId });
    const { images } = req.body;
    if (images && images.length > 0) {
      images.forEach(async (img) => {
        const imageNew = await Image.create({
          PostId: postCreated.id,
          url: img.url,
        });
      });
    }
    const fullPost = await Post.findByPk(postCreated.id, {
      include: [
        {
          model: Image,
          attributes: ["url", "id"],
        },
      ],
    });
    res.status(200).json(fullPost);
  } catch (error) {
    console.error(`Error al crear el post: ${error}`);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Put
const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const postEdite = await Post.findByPk(id);
    postEdite.description = description;
    await postEdite.save();
    res.status(200).json(postEdite);
  } catch (error) {
    console.error(`Error al editar el post: ${error}`);
    res.status(500).json({ error: "Error al editar el post" });
  }
};

const editPostImage = async (req, res) => {
  try {
    const { id, imgId } = req.params;
    const { images } = req.body;

    const image = await Image.findByPk(imgId);

    if (!image) {
      return res.status(404).json({
        message: "No se encontró la imagen con ese ID",
        id: imgId,
      });
    }

    if (image.PostId != id) {
      return res.status(404).json({
        message: "La imagen no pertenece al post especificado",
        imagePostId: image.PostId,
        requestedPostId: id,
      });
    }

    image.url = images[0].url;
    await image.save();

    const postUpdated = await Post.findByPk(id, {
      include: [
        {
          model: Image,
          attributes: ["url", "id"],
        },
      ],
    });

    res.status(200).json(postUpdated);
  } catch (error) {
    console.error(`Error al editar la imagen del post: ${error}`);
    res.status(500).json({ error: "Error al editar la imagen del post" });
  }
};

// Delete
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    const removed = await post.destroy();
    res.status(200).json(removed);
  } catch (error) {
    console.error(`Error al eliminar el post: ${error}`);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

const deletePostImage = async (req, res) => {
  try {
    const { id, imgId } = req.params;
    const image = await Image.findByPk(imgId);
    if (image && image.PostId == id) {
      await image.destroy();
    }
    const postUpdated = await Post.findByPk(id, {
      include: [
        {
          model: Image,
          attributes: ["url", "id"],
        },
      ],
    });
    res.status(200).json(postUpdated);
  } catch (error) {
    console.error(`Error al eliminar la imagen del post: ${error}`);
    res.status(500).json({ error: "Error al eliminar la imagen del post" });
  }
};

// Exportacion de todas las funciones
module.exports = {
  getPosts,
  getPostByPk,
  createPost,
  editPost,
  editPostImage,
  deletePost,
  deletePostImage,
};
