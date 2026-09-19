const Comment = require('../models/Comment');
const Link = require('../models/Link');

const getCommentsByLink = async (req, res) => {
  try {
    const comments = await Comment.find({ linkId: req.params.id }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los comentarios' });
  }
};

const createComment = async (req, res) => {
  try {
    const { autor, text } = req.body;
    if (!autor || !text) {
      return res.status(400).json({ mensaje: 'Autor y texto son obligatorios' });
    }
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ mensaje: 'Enlace no encontrado' });
    }
    const nuevoComentario = await Comment.create({
      linkId: req.params.id,
      autor,
      text
    });
    res.status(201).json(nuevoComentario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el comentario' });
  }
};

module.exports = { getCommentsByLink, createComment };