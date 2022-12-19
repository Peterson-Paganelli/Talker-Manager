const express = require('express');
const talkersRouter = require('./routes/talkersRouter');
const { validateEmail, validatePassword } = require('./middlewares/validateFields');
const token = require('./utils/generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateEmail, validatePassword, async (req, res) => res.status(200)
  .json({ token: token() }));

app.use('/talker', talkersRouter);

app.listen(PORT, () => {
  console.log('Online');
});
