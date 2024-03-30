const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/')
    } else {
      const errorMessage = await response.text()
      alert(`Logout failed: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Failed to logout:', error)

    alert('Failed to logout. Please try again later.')
  }
}

document.querySelector('#logout').addEventListener('click', logout)
