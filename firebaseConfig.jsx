import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyARou4QL6yQrzZcVNYo2j31zX9VsKLaQF4',
  authDomain: 'bookreviewapp-46d2c.firebaseapp.com',
  projectId: 'bookreviewapp-46d2c',
  storageBucket: 'bookreviewapp-46d2c.appspot.com',
  messagingSenderId: '844865550205',
  appId: '1:844865550205:web:28865e39bfd58713dabe14',
  measurementId: 'G-8VWS7GZNQT',
};

export const app = initializeApp(firebaseConfig);
