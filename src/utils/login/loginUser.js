/* Function to submit log-in data */
export async function loginUser(data) {
  return await fetch('http://localhost:8080/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}