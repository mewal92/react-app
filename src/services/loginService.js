
const login = async ({ email, password }) => {
    return fetch('http://localhost:8082/users/login', { // Make sure the URL matches your backend endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

  };
export default { login };

