const router = require('express').Router()
const { Comment } = require('../../models/')
const { authedUser } = require('../../utils/auth')

router.post('/', authedUser, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.user_id,
    })
    res.status(201).json({ success: true, data: newComment })
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res
        .status(400)
        .json({
          success: false,
          error: 'Validation Error',
          details: err.errors,
        })
    } else {
      res.status(500).json({ success: false, error: 'Server Error' })
    }
  }
})

module.exports = router
