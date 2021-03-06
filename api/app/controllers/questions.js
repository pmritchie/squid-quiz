// load in the question model
const { Questions } = require('../models');
// grab all questions from quiz
exports.getQuizQuestions = async (req, res) => {
  const { quizId } = req.query;
  const publicQuestions = await Questions.findAll({ where: { quizId } });
  res.json(publicQuestions);
};

exports.getOneById = async (req, res) => {
  const { id } = req.params;
  const question = await Questions.findByPk(id);
  if (!question) {
    res.sendStatus(404);
    return;
  }
  res.json(question);
};

exports.createQuestion = async (req, res) => {
  const { title, quizId } = req.body;
  try {
    const newQuestion = await Questions.create({ title, quizId });
    res.json({ id: newQuestion.id });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const [, [updatedQuestion]] = await Questions.update(req.body, {
      where: { id },
      returning: true,
    });
    res.json({ updatedQuestion });
  } catch (e) {
    const errors = e.errors.map(err => err.message);
    res.status(400).json({ errors });
  }
};

exports.removeQuestion = async (req, res) => {
  const { id } = req.params;
  await Questions.destroy({ where: { id } });
  res.sendStatus(200);
};
