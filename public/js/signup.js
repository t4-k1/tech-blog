const signupFormHandler = async function (event) {
  event.preventDefault()

  const usernameEl = document
    .querySelector('#username-input-signup')
    .value.trim()
  const passwordEl = document
    .querySelector('#password-input-signup')
    .value.trim()

  if (passwordEl.length < 8) {
    alert('Password must be at least 8 characters long.')
    return
  }

  if (!usernameEl) {
    alert('Please enter a username.')
    return
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username: usernameEl, password: passwordEl }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      const errorMessage = await response.text()
      alert(`Failed to sign up: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Error signing up:', error)
    alert('Signup failed!')
  }
}

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler)
