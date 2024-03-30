const loginRedirect = async (req, res, next) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/login')
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const noAuth = async (req, res, next) => {
  try {
    if (!req.session.logged_in) {
      next()
    } else {
      res.redirect('/')
    }
  } catch (error) {
    next(error)
  }
}

const authedUser = async (req, res, next) => {
  try {
    if (!req.session.logged_in) {
      res.status(403).json({ msg: 'Login first!' })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { loginRedirect, noAuth, authedUser }
