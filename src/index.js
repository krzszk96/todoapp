import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js"
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBQO-jjhBvLXu3gwqawWD3Yh3tCv8DreyQ",
  authDomain: "todoapp-5e3c3.firebaseapp.com",
  projectId: "todoapp-5e3c3",
  storageBucket: "todoapp-5e3c3.appspot.com",
  messagingSenderId: "1039650869143",
  appId: "1:1039650869143:web:23f0eb663e3bffd0623ed2"
})

const auth = getAuth(firebaseApp)
var signUp = document.getElementById('register')
var login = document.getElementById('login')

signUp.addEventListener('click', () => {

  let email = document.getElementById('email').value
  let password = document.getElementById('passwd').value

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    alert("User created! Now please log in.")
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
  })
})

login.addEventListener('click', () => {

  let email = document.getElementById('email').value
  let password = document.getElementById('passwd').value

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    alert("Signed in!.")
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
  });
})