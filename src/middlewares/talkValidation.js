function validatedWatched(req, res) {
  const { talk } = req.body;
  if (!(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/).test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function validateRate(req, res) {
    const { talk } = req.body;
    if (talk.rate === undefined) {
      return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!Number.isInteger(talk.rate) && (Number(talk.rate) < 1 && Number(talk.rate) > 5)) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
}

function validateTalk(req, res, next) {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  validatedWatched(req, res);
  validateRate(req, res);
  next();
}

module.exports = validateTalk;
