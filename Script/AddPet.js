document.getElementById('addPetForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const ownerId = form.ownerId.value.trim();
  const name = form.name.value.trim();
  const type = form.type.value.trim();

  const endpoint = 'https://prelim-exam.onrender.com/pets/new'; 
  const payload = {ownerId, name, type};

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
      <p>Your pet has been added!</p>
      <a href="ViewPet.html">Check your pets</a>
    `;
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});