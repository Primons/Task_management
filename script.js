firebase.initializeApp({
    apiKey: "AIzaSyAZqZ5OUFbhzv74UdR5IIR47OYa0ZJFGGk",
    authDomain: "hairdress-ba512.firebaseapp.com",
    projectId: "hairdress-ba512",
    storageBucket: "hairdress-ba512.appspot.com",
    messagingSenderId: "829044318591",
    appId: "1:829044318591:web:b3df496ceb6ffa94777a4a",
    measurementId: "G-7SWTYGQRLF"

});

const db = firebase.firestore();

//function to add tasks
function addTask(){
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();
    if(task !==""){
        db.collection('tasks').add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        taskInput.value = "";
        console.log('Tasks Added');

    }
}

function renderTasks(doc){
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
.orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type === "added"){
                renderTasks(change.doc);
        
        }
    });
});

function deleteTask(id){
    db.collection("tasks").doc(id).delete();
}