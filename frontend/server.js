import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = './files';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const app = express();
const port = 3000;

// Configuração do multer para armazenar os arquivos na pasta 'files'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Definir o nome do arquivo como o original, ou você pode gerar um nome único
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para upload de arquivo
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }
  res.send({ filename: req.file.filename }); // Responde com o nome do arquivo enviado
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
