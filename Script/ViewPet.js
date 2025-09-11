document.getElementById('accountForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const form = event.target;
  const userId = form.userId.value.trim();

  const endpoint = `https://prelim-exam.onrender.com/users/${userId}/pets`;

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
    let html = `<h3>Your Pets</h3>`;
    for (let pet of data.pets) {
      html += `
        <p><strong>Pet Name:</strong> ${pet.name}</p>
        <p><strong>Pet ID:</strong> ${pet._id}</p>
        <p><strong>Owner ID:</strong> ${pet.owner}</p>
        <p><strong>Pet Type:</strong> ${pet.type}</p>
        <br>
      `;
    }
    html += `
    <p>Want to see all of the pets in the database?</p>
    <a href="ViewPets.html">Here</a>
    `;

    resultEl.innerHTML = html;
    console.log("Response:", data);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});
