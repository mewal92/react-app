
const login = async ({ email, password }) => {
    return fetch('users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

  };
export default { login };

