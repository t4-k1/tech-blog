const editFormHandler = async function (event) {
  event.preventDefault()

  const postId = document.querySelector('input[name="post-id"]').value
  const title = document.querySelector('input[name="post-title"]').value
  const body = document.querySelector('textarea[name="post-body"]').value

  try {
    await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    document.location.replace('/dashboard')
  } catch (error) {
    console.error('Failed to edit post:', error)
  }
}

const deleteClickHandler = async function () {
  const postId = document.querySelector('input[name="post-id"]').value
  const confirmation = window.confirm(
    'Are you sure you want to delete this post?'
  )

  if (confirmation) {
    try {
      await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      document.location.replace('/dashboard')
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }
}

document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler)
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler)
