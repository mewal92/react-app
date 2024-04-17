import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config'; // Assuming this is your Firebase auth module

const registerUserWithFirebaseAndBackend = async (email, password, additionalUserData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Now, send additional user details to your backend for storage in Firestore
    const userData = {
      uid: user.uid,
      ...additionalUserData // Any additional user details you want to store
    };

    const response = await fetch('http://localhost:8082/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) throw new Error('Failed to register additional user details.');

    console.log('User registered with Firebase and additional details stored in backend.');
    // Proceed with user registration flow

  } catch (error) {
    console.error('Registration error:', error);
    // Handle registration error
  }
};
