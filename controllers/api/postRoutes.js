const router = require('express').Router()
const { Post } = require('../../models/')
const { authedUser } = require('../../utils/auth')

const handleErrors = (res, error) => {
  console.error(error)
  res.status(500).json({ error: 'Server Error' })
}

router.post('/', authedUser, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.user_id,
    })
    res.status(201).json(newPost)
  } catch (error) {
    handleErrors(res, error)
  }
})

router.put('/:id', authedUser, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: { id: req.params.id },
    })
    res.status(affectedRows > 0 ? 200 : 404).end()
  } catch (error) {
    handleErrors(res, error)
  }
})

router.delete('/:id', authedUser, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({ where: { id: req.params.id } })
    res.status(affectedRows > 0 ? 200 : 404).end()
  } catch (error) {
    handleErrors(res, error)
  }
})

module.exports = router
