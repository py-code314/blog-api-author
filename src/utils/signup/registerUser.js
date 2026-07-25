export async function registerUser(data) {
  return await fetch('http://localhost:8080/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
