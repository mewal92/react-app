import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC0izQgBtSQbT7KkXRD7Rv2SLO9D-fmP0U",
  authDomain: "interns-melinda.firebaseapp.com",
  projectId: "interns-melinda",

};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth, app };