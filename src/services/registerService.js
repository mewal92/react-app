import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

const registerUserWithFirebaseAndBackend = async (email, password, additionalUserData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;


    const userData = {
      uid: user.uid,
      ...additionalUserData 
    };

    const response = await fetch('https://userapi-cke324lauq-lm.a.run.app/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error('Failed to register additional user details.');

    console.log('User registered with Firebase and additional details stored in backend.');
  
  } catch (error) {
    console.error('Registration error:', error);
  
  }
};
