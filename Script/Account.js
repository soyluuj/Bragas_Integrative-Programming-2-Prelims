document.getElementById('accountForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const userId = form.userId.value.trim();

  const endpoint = `https://prelim-exam.onrender.com/users/${userId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    const resultEl = document.getElementById('result');
    resultEl.innerHTML = `
        <h3>Account Details</h3>
        <p><strong>ID:</strong> ${data.user._id}</p>
        <p><strong>Username:</strong> ${data.user.username}</p>
        <p><strong>Age:</strong> ${data.user.age}</p>
        <p><strong>Code:</strong> ${data.user.code}</p>
        <p><strong>Role:</strong> ${data.user.role}</p>
        <br>
        <p>Want to edit your username?</p>
        <a href="ChangeUsername.html">Here</a>
        <br>
        <p>Want to change your role?</p>
        <a href="EditRole.html">Here</a>

    `;

    console.log("Response:", data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});
