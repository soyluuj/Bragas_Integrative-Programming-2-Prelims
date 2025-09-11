document.getElementById('userForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.username.value.trim();
  const password = form.password.value;
  const age = form.age.value;

  const endpoint = 'https://prelim-exam.onrender.com/signup';
  const payload = {username, password, age};

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const data = await response.json();
    const resultEl = document.getElementById('result');
    resultEl.innerHTML = `
      Signup is a success!
      <br>
      Here are your ID and Code, please do take note of them:
      <br><br>
      <strong>ID: ${data.id}</strong>
      <br>
      <strong>Code:${data.code}</strong> 
      <br><br>
      <a href="Login.html">Go to Login</a>
    `;
    
    localStorage.setItem('userCode', data.code); //stores the code and id, for future uses
    localStorage.setItem('userId', data.id);

    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});