const express = require('express');
const readFile = require('./middlewares/readFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talker = await readFile();
  res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readFile();  
    const findTalker = talker.find((tal) => Number(tal.id) === Number(id));
    if (findTalker) {
      return res.status(200).json(findTalker);
    } 
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.listen(PORT, () => {
  console.log('Online');
});
