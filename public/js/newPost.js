const newFormHandler = async function (event) {
  event.preventDefault()

  const title = document.querySelector('input[name="post-title"]').value.trim()
  const body = document.querySelector('textarea[name="post-body"]').value.trim()

  if (!title || !body) {
    alert('Please enter both title and body for the post.')
    return
  }

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      const errorMessage = await response.text()
      alert(`Failed to create new post: ${errorMessage}`)
    }
  } catch (error) {
    console.error('Failed to create new post:', error)
    alert('Failed to create new post. Please try again later.')
  }
}

document
  .querySelector('#new-post-form')
  .addEventListener('submit', newFormHandler)
