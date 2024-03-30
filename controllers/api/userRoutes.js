const router = require('express').Router()
const { User } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)
    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.username = userData.username
      req.session.logged_in = true
      res.status(200).json(userData)
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    })

    console.log('userData:', userData) // Add this line to check the userData

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password' })
      return
    }

    let validPassword // Define validPassword variable here

    try {
      validPassword = await userData.checkPassword(req.body.password)
    } catch (error) {
      console.error('Error checking password:', error)
      res.status(400).json({ message: 'Error checking password' })
      return
    }

    console.log('validPassword:', validPassword) // Add this line to check the validPassword

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password' })
      return
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.username = userData.username
      req.session.logged_in = true
      res.status(200).json({ userData, message: 'Login successful' })
    })
  } catch (error) {
    console.error('Error in login route:', error) // Add this line to log any errors
    res.status(400).json({ error: error.message })
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
