import { firebaseApp } from "./app_init.js"
import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js"

const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

var signUp = document.getElementById('register')

signUp.addEventListener('click', () => {

  let email = document.getElementById('email').value
  let password = document.getElementById('passwd').value

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user
    set(ref(db, 'users/' + user.uid), {
      email: email
    })
    alert("User created! Now please log in.")
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
  })
})

