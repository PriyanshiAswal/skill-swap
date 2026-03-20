// Function to show messages in the dedicated div instead of using alert()
function showMessage(message, type) {
  const messageBox = document.getElementById('messageBox');
  // Check if messageBox exists before trying to manipulate it
  if (!messageBox) {
    console.error("Error: messageBox element not found.");
    return;
  }
  
  messageBox.textContent = message;
  messageBox.className = ''; // Reset classes
  messageBox.classList.add(type); // Add 'success' or 'error' class
  messageBox.style.display = 'block';

  // Automatically hide success message after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      messageBox.style.display = 'none';
      messageBox.textContent = '';
    }, 5000);
  }
}

const form = document.getElementById('signupForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous messages
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
      messageBox.style.display = 'none';
    }

    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    try {
      // NOTE: Ensure your backend is running on http://localhost:5001
      const res = await fetch('http://localhost:5001/signup', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await res.json();

      if (res.ok) {
        // Successful registration (2xx status code)
        showMessage(result.message, 'success'); 
        form.reset(); // Clear the form on success
      } else {
        // Server returned an error (4xx or 5xx)
        showMessage(result.message, 'error');
      }
      
    } catch (err) {
      console.error('Network or Fetch Error:', err);
      // This catch block handles connection failures (e.g., server offline)
      showMessage('Error connecting to the server. Please check if the backend is running.', 'error');
    }
  });
}
