const router = require('express').Router()
const { Post } = require('../models')
const { loginRedirect } = require('../utils/auth')

router.get('/', loginRedirect, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { userId: req.session.user_id },
    })

    const posts = postData.map((post) => post.get({ plain: true }))

    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/new', loginRedirect, (req, res) => {
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  })
})

router.get('/edit/:id', loginRedirect, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id)

    if (postData) {
      const post = postData.get({ plain: true })

      res.render('editPost', {
        dashboard: true,
        post,
        loggedIn: req.session.logged_in,
      })
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
