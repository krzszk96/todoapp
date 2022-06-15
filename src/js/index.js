import { firebaseApp } from "./app_init.js"
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js"
import { getDatabase, ref, set, push, onChildAdded, onChildRemoved, remove } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js"

const auth = getAuth(firebaseApp)

// On user login display user emial in navbar if not logged go to login page//
var user_mail = document.getElementById('userMail')

onAuthStateChanged(auth, (user) => {
  if (user) {
    user_mail.innerHTML = user.email
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
  
  let task_html = document.createElement('div')
  task_html.classList.add('task-wrap')
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
  newtask.value = ''  
})

// delete item
tasks_container.addEventListener('click', (e) => {
  if(e.target.id == 'delete-btn') e.target.parentNode.parentNode.remove()  
})

// edit item 
tasks_container.addEventListener('click', (e) => {
  let element = e.target.parentNode.parentNode.querySelector('label')
  if(e.target.id == 'edit-btn') {
    if (element.contentEditable == 'true') {
      element.contentEditable = 'false'
    } else {
      element.contentEditable = 'true'
    }
  }
})

// tick item as done
tasks_container.addEventListener('click', (e) => {
  let element = e.target.parentNode.parentNode.querySelector('label')
  if(e.target.id == 'check-state') {
    if (element.style.textDecoration === 'line-through') {
      element.style.textDecoration = 'none'
    } else {
      element.style.textDecoration = 'line-through'
    }
  }  
})

