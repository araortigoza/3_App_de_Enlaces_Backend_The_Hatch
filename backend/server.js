const express = require('express');
const cors = require('cors');
require('dotenv').config();
const conectarDB = require('./config/db');
const linksRouter = require('./routes/links');
const commentsRouter = require('./routes/comments');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/links', linksRouter);
app.use('/api/links/:id/comments', commentsRouter);

conectarDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});