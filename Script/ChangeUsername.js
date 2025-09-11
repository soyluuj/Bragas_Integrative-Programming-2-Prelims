document.getElementById('changeUsernameForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const userId = form.userId.value.trim();
  const newUsername = form.newUsername.value.trim();

  const endpoint = `https://prelim-exam.onrender.com/users/${userId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: newUsername})
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    const resultEl = document.getElementById('result');
    console.log('response status', response.status);
    console.log('raw response data:', data);
    console.log('resultEl:', resultEl);
    resultEl.innerHTML = `
        <p>Username changed!</p>
        <p>See for yourself:</p>
        <a href="Account.html">Check your account out.</a>
    `;

    console.log("Response:", data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});
