const express = require('express');
const readFile = require('./middlewares/readFile');
const { validateEmail, validatePassword } = require('./middlewares/validateFields');

const app = express();
app.use(express.json());

const rand = () => Math.random().toString(32).substr(2, 8);

const token = () => rand() + rand();

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
 
app.post('/login', validateEmail, validatePassword, async (req, res) => {
  res.status(200)
  .json({ token: token() }); 
});

app.listen(PORT, () => {
  console.log('Online');
});
