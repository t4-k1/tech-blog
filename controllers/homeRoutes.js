const router = require('express').Router()
const { Post, Comment, User } = require('../models/')
const { noAuth } = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [User] })
    const posts = postData.map((post) => post.get({ plain: true }))
    res.render('home', { posts, loggedIn: req.session.logged_in })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [User, { model: Comment, include: [User] }],
    })

    if (postData) {
      const post = postData.get({ plain: true })
      res.render('post', { post, loggedIn: req.session.logged_in })
    } else {
      res.status(404).end()
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/login', noAuth, (req, res) => {
  res.render('login')
})

router.get('/signup', noAuth, (req, res) => {
  res.render('signup')
})

module.exports = router
