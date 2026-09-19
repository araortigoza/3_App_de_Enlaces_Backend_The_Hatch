const Link = require('../models/Link');

const getLinks = async (req, res) => {
  try {
    const { tag } = req.query;
    const filtro = tag ? { tags: tag } : {};
    const links = await Link.find(filtro).sort({ createdAt: -1 });
    res.json(links);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los enlaces' });
  }
};

const getLinkById = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ mensaje: 'Enlace no encontrado' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el enlace' });
  }
};

const createLink = async (req, res) => {
  try {
    const { title, url, tags } = req.body;
    if (!title || !url) {
      return res.status(400).json({ mensaje: 'Titulo y url son obligatorios' });
    }
    const nuevoLink = await Link.create({ title, url, tags });
    res.status(201).json(nuevoLink);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el enlace' });
  }
};

const voteLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    if (!link) {
      return res.status(404).json({ mensaje: 'Enlace no encontrado' });
    }
    res.json(link);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al votar el enlace' });
  }
};

module.exports = { getLinks, getLinkById, createLink, voteLink };