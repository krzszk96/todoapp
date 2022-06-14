import { firebaseApp } from "./app_init.js"
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js"

const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

var userMail = document.getElementById('userMail')

onAuthStateChanged(auth, (user) => {
  if (user) {
    userMail.innerHTML = user.email
  } else {
    userMail.innerHTML = 'anonymous user'
  }
});

