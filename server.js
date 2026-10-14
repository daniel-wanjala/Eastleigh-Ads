import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Explicit page route so Vercel's serverless bundler includes the application HTML.\napp.get('/apply.html', (req, res) => {\n  res.sendFile(path.join(__dirname, 'apply.html'));\n});\n\napp.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

if (!process.env.VERCEL) {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });
}

export default app;
