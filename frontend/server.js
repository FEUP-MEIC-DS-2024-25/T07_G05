import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const dir = './files';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const app = express();
const port = 3000;
app.use(bodyParser.json()); // Para processar o JSON enviado pelo cliente

// Habilitar o CORS para todas as origens
app.use(cors());

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const type = req.headers['x-file-type'] || 'default'; // Leia o cabeçalho
      if (type === 'code') {
        cb(null, 'code_file' + path.extname(file.originalname));
      } else if (type === 'test') {
        cb(null, 'test-file' + path.extname(file.originalname));
      } else {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    },
  }),
});

// Endpoint de upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send({ filename: req.file.filename });
});


app.post('/save-context', (req, res) => {
  const { context } = req.body; // Recebe o campo 'context' do corpo da requisição

  if (!context) {
    return res.status(400).send('O campo context está vazio.');
  }

  const filePath = path.join(dir, 'context.txt');

  fs.writeFile(filePath, context, (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      return res.status(500).send('Erro ao salvar o arquivo.');
    }
    res.send({ message: 'Contexto salvo com sucesso!' });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
