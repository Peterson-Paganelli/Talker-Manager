const express = require('express');
const { writeFile } = require('fs/promises');
const readFile = require('../middlewares/readFile');
const ValidateAuthorization = require('../middlewares/authorization');
const { validateTalk, validateRate } = require('../middlewares/talkValidation');
const { validateName, validateAge } = require('../middlewares/validateFields');

const router = express.Router();

router.get('/search', ValidateAuthorization, async (req, res) => {
  const { q } = req.query;
  const talker = await readFile();
  const searchTalker = talker.filter((tal) => tal.name.includes(q));
  res.status(200).json(searchTalker);
});
  
router.get('/', async (req, res) => {
  const talker = await readFile();
  res.status(200).json(talker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();  
  const findTalker = talker.find((tal) => Number(tal.id) === Number(id));
  if (findTalker) {
    return res.status(200).json(findTalker);
  } 
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/', ValidateAuthorization, validateName, 
validateAge, validateTalk, validateRate, async (req, res) => {
  const { name, age, talk } = req.body;
  const talker = await readFile();
  const id = talker.length + 1;
  const newTalker = {
    id,
    name,
    age,
    talk,
  };
  const newList = [...talker, newTalker];
  await writeFile('./src/talker.json', JSON.stringify(newList));
  res.status(201).json(newTalker);
});

router.put('/:id', ValidateAuthorization, validateName, 
validateAge, validateTalk, validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talker = await readFile();
  const editedTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const editedList = talker.filter((tal) => Number(tal.id) !== Number(id));
  const newList = [...editedList, editedTalker];
  await writeFile('./src/talker.json', JSON.stringify(newList));
  res.status(200).json(editedTalker);
});

router.delete('/:id', ValidateAuthorization, async (req, res) => {
  const { id } = req.params;
  const talker = await readFile();
  const editedList = talker.filter((tal) => Number(tal.id) !== Number(id));
  await writeFile('./src/talker.json', JSON.stringify(editedList));
  res.status(204).json();
});

module.exports = router;