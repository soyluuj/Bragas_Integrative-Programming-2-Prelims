document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault();
      const form = event.target;
      const username = form.username.value.trim();
      const password = form.password.value;
      const code = form.code.value;

      const endpoint = 'https://prelim-exam.onrender.com/login'; 
      const payload = { 
        username: username,
        password: password,
        authKey: code};

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
          Login is a success!
        `;
        console.log('Login response:', data);

      } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('result').textContent = `Error: ${error.message}`;
      }
    });