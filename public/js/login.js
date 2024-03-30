const loginFormHandler = async function (event) {
  event.preventDefault()

  const username = document.querySelector('#username-input-login').value.trim()
  const password = document.querySelector('#password-input-login').value.trim()

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      const errorMessage = await response.text()
      alert(`Login failed: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Failed to login:', error)

    alert(`Login failed: ${error.message}`)
  }
}

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler)
