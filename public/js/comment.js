const commentFormHandler = async function (event) {
  event.preventDefault()

  const postIdInput = document.querySelector('input[name="post-id"]')
  const commentBodyInput = document.querySelector(
    'textarea[name="comment-body"]'
  )

  const postId = postIdInput.value.trim()
  const body = commentBodyInput.value.trim()

  if (!body) {
    return
  }

  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      document.location.reload()
    } else if (response.status === 401) {
      document.location.replace('/login')
    } else {
      console.error('Failed to create comment:', response.statusText)
    }
  } catch (error) {
    console.error('Failed to create comment:', error)
  }
}

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler)
