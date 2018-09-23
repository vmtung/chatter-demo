const mongoose = require('mongoose')

const QuestionModel = mongoose.model('question')

const questionController = {}

questionController.allQuestions = (req, res) => {
  QuestionModel.find()
    .then(results => res.json(results))
    .catch(err => res.json({ success: false, message: err, statusCode: 500 }))
}

questionController.newQuestion = (req, res) => {
  const newQuestion = new QuestionModel(req.body)

  newQuestion
    .save()
    .then(() =>
      res.json({ success: true, message: 'Question created with success!', statusCode: 201 })
    )
    .catch(err => res.json({ success: false, message: err, statusCode: 500 }))
}

module.exports = questionController
