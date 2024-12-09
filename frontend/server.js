import express from 'express';
import multer from 'multer';
import path from 'path';
import fs, { promises as fsPromises } from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = './files';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const type = req.headers['x-file-type'] || 'default';
      const filenameMap = {
        code: 'code_file',
        test: 'test-file',
        default: Date.now().toString(),
      };
      cb(null, `${filenameMap[type] || filenameMap.default}${path.extname(file.originalname)}`);
    },
  }),
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ filename: req.file.filename });
});

app.post('/save-context', async (req, res) => {
  const { context, language } = req.body;
  if (!context) return res.status(400).send('O campo context está vazio.');

  const filePath = path.join(dir, 'context.txt');

  console.log(filePath)
  console.log(context)

  try {
    // Salvar o contexto em context.txt
    await fsPromises.writeFile(filePath, context);

    // Mapear os arquivos por linguagem
    const fileMappings = {
      python: { codeFile: 'code_file.py', testFile: 'test-file.py' },
      java: { codeFile: 'code_file.java', testFile: 'test-file.java' },
      javascript: { codeFile: 'code_file.js', testFile: 'test-file.js' },
    };

    const languageFiles = fileMappings[language];
    if (!languageFiles) return res.status(400).send('Linguagem não suportada.');

    const sourceDir = path.join(__dirname, './files');
    const targetDir = path.join(__dirname, '../');

    const sourcePaths = [];
    const targetPaths = [];

    // Adicionar arquivos válidos à lista
    if (fs.existsSync(path.join(sourceDir, languageFiles.codeFile))) {
      sourcePaths.push(path.join(sourceDir, languageFiles.codeFile));
      targetPaths.push(path.join(targetDir, languageFiles.codeFile));
    }
    
    if (fs.existsSync(path.join(sourceDir, languageFiles.testFile))) {
      sourcePaths.push(path.join(sourceDir, languageFiles.testFile));
      targetPaths.push(path.join(targetDir, languageFiles.testFile));
    }

    // Sempre adicionar o context.txt
    sourcePaths.push(filePath);
    targetPaths.push(path.join(targetDir, 'context.txt'));

    // Mover os arquivos válidos
    await Promise.all(sourcePaths.map((src, idx) => fsPromises.rename(src, targetPaths[idx])));

    const scriptPath = path.join(__dirname, '../juncao.py');
    
    console.log(targetPaths)
    const pythonProcess = spawn('python3', [scriptPath, language, ...targetPaths]);

    pythonProcess.on('close', async (code) => {
      if (code === 0) {
        // Restaurar os arquivos para seus caminhos de origem
        await Promise.all(targetPaths.map((tgt, idx) => fsPromises.rename(tgt, sourcePaths[idx])));
        res.send({ message: 'Processo concluído com sucesso!' });
      } else {
        res.status(500).send('Erro no script Python.');
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('Erro ao executar o script Python:', err);
      res.status(500).send('Erro ao executar o script.');
    });
  } catch (err) {
    console.error('Erro no processo:', err);
    res.status(500).send('Erro no processo.');
  }
});

// Rota para servir o arquivo mutations.txt
app.get("/files/mutations.txt", (req, res) => {
  const mutationsFile = path.join("files", "mutations.txt");

  if (fs.existsSync(mutationsFile)) {
    res.download(mutationsFile); // Permite o download do arquivo
  } else {
    res.status(404).json({ message: "Mutations file not found" });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
