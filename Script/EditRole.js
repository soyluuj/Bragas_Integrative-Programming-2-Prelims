document.getElementById('changeRoleForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const userId = form.userId.value.trim();
  const newRole = form.newRole.value.trim();

  const endpoint = `https://prelim-exam.onrender.com/users/${userId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({role: newRole})
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
        <p>Role changed!</p>
        <p>See for yourself:</p>
        <a href="Account.html">Check your account out.</a>
    `;

    console.log("Response:", data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});
