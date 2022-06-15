import { firebaseApp } from "./app_init.js"
import { getAuth, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"
import { getDatabase, ref, set, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js"

const auth = getAuth(firebaseApp)
const db = getDatabase(firebaseApp)

// On user login display user emial in navbar if not logged go to login page//
var user_mail = document.getElementById('userMail')

onAuthStateChanged(auth, (user) => {
  if (user) {
    user_mail.innerHTML = user.email
    displayDataFromFirebase(user.uid)
  } else {
    window.location.href='index.html'
  }
})

let add_task = document.getElementById('createnewtask') //target task button
let tasks_container = document.getElementById('tasks-conatiner') //target task container
let newtask = document.getElementById('newtask') //target task input

// add new task to the list
add_task.addEventListener('click', () => {
  if (newtask.value == '') return alert("Please type task name") //check if task is not empty

  // save to firebase database
  let userId = auth.currentUser.uid
  let dbRef = ref(db, 'users/' + userId + '/tasks')
  let taskRef = push(dbRef)
  set(taskRef, {
    task: newtask.value,
    state: 'pending'
  })
  
  // display task in the browser
  let task_html = document.createElement('div')
  task_html.classList.add('task-wrap')
  task_html.setAttribute('id', taskRef.key)
  task_html.innerHTML =`
      <div class="wrap">
        <input type="checkbox" class="checkbox" id="check-state">
        <label class="todo-item">${newtask.value}</label>
      </div>
      <div class="wrap">
        <button class="delete-btn" id="delete-btn">Delete</button>
        <button class="edit-btn" id="edit-btn">Edit</button>
      </div>`
  tasks_container.appendChild(task_html)  
  
  // reset input for new task
  newtask.value = '' 
})

// retrieve and display elements from firebase
function displayDataFromFirebase(uid){
  let userId = auth.currentUser.uid
  let dbRef = ref(db, 'users/' + uid + '/tasks')

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const child = childSnapshot.val()
      const childkey = childSnapshot.key
      let task_html = document.createElement('div')
      task_html.classList.add('task-wrap')
      task_html.setAttribute('id', childkey)
      task_html.innerHTML =`
      <div class="wrap">
        <input type="checkbox" class="checkbox" id="check-state">
        <label class="todo-item" id="task-label">${child.task}</label>
      </div>
      <div class="wrap">
        <button class="delete-btn" id="delete-btn">Delete</button>
        <button class="edit-btn" id="edit-btn">Edit</button>
      </div>`
      tasks_container.appendChild(task_html)
      if (child.state == 'done') task_html.getElementsByClassName("checkbox")[0].toggleAttribute("checked");
    });
  }, {
    onlyOnce: true
  });
}

// delete item
tasks_container.addEventListener('click', (e) => {
  let element = e.target.parentElement.parentElement

  if(e.target.id == 'delete-btn') {
    element.remove()  
  
    // remove from firebase
    let userId = auth.currentUser.uid
    remove(ref(db, 'users/' + userId + '/tasks/' + element.id))
  }
})

// edit item 
tasks_container.addEventListener('click', (e) => {
  let element = e.target.parentNode.parentNode.querySelector('label')

  let userId = auth.currentUser.uid //used for firebase
  let elementid = e.target.parentNode.parentNode.id // used for firebase
  let dbRef = ref(db, 'users/' + userId + '/tasks/' + elementid ) //path to firebase element

  if(e.target.id == 'edit-btn') {
    if (element.contentEditable != 'true') {
      e.target.innerHTML = 'Save'
      element.contentEditable = 'true'
    } else {
      e.target.innerHTML = 'Edit'
      element.contentEditable = 'false'
      // update firebase element      
      update(dbRef,{ task: element.innerHTML })
    }
  }
})

// tick item as done
tasks_container.addEventListener('click', (e) => {
  let checkbox = e.target.parentNode.parentNode.querySelector('input')
    
  let userId = auth.currentUser.uid //used for firebase
  let elementid = e.target.parentNode.parentNode.id // used for firebase
  let dbRef = ref(db, 'users/' + userId + '/tasks/' + elementid ) //path to firebase element

  if(e.target.id == 'check-state') {

    if(!checkbox.checked) {
      update(dbRef,{ state: 'pending' })
    } else {
      update(dbRef,{ state: 'done' })
    }
  }  
})

// logout from app
let logout_btn = document.getElementById('logout')
logout_btn.addEventListener('click', ()=>{
  signOut(auth).then(() => {
    window.location.href='index.html'
  }).catch((error) => {
    alert(error)
  });
})
