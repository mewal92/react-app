
const login = async ({ email, password }) => {
    return fetch('https://userapi-cke324lauq-lm.a.run.app/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

  };
export default { login };

