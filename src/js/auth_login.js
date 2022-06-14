import { firebaseApp } from "./app_init.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"

const auth = getAuth(firebaseApp)

var login = document.getElementById('login')

login.addEventListener('click', () => {

  let email = document.getElementById('email').value
  let password = document.getElementById('passwd').value

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    window.location.href="app.html"
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
  });
})