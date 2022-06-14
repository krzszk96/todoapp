import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js"
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBQO-jjhBvLXu3gwqawWD3Yh3tCv8DreyQ",
  authDomain: "todoapp-5e3c3.firebaseapp.com",
  projectId: "todoapp-5e3c3",
  storageBucket: "todoapp-5e3c3.appspot.com",
  messagingSenderId: "1039650869143",
  appId: "1:1039650869143:web:23f0eb663e3bffd0623ed2"
})

const auth = getAuth(firebaseApp)

let email = 'krzszk96@gmail.com'
let password = '123'

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    // ..
  })

  onAuthStateChanged(auth, user => {
    if(user != null) console.log("logged in!")
    if(user == null) console.log("no user!")
  })