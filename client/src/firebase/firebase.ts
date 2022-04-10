import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDL4dXISILsjIUSq8kvGxQ_0cuVtxDWFZo',
  authDomain: 'open-is-push-notifications.firebaseapp.com',
  projectId: 'open-is-push-notifications',
  storageBucket: 'open-is-push-notifications.appspot.com',
  messagingSenderId: '528337537286',
  appId: '1:528337537286:web:1ba9f06afa5b85e3b43687',
  measurementId: 'G-HDWE95MVH6',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default messaging;
