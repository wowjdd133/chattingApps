import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJaNYQeRzpb8W6A6RIDky-jiha__-b8Kw",
  authDomain: "chattingapp-cbabd.firebaseapp.com",
  databaseURL: "https://chattingapp-cbabd.firebaseio.com",
  projectId: "chattingapp-cbabd",
  storageBucket: "chattingapp-cbabd.appspot.com",
  messagingSenderId: "642036016444",
  appId: "1:642036016444:web:8e3cdd482d28c8095d6a39",
  measurementId: "G-4W0D1JLMHL"
};

firebase.initializeApp(firebaseConfig);

export default firebaseConfig;