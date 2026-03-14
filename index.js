const API_URL = "https://jsonplaceholder.typicode.com/posts";
let tasks = [];

document.addEventListener("DOMContentLoaded", function(){
    fetchTasks();
});

function showLoading(show){
    const loading = document.getElementById("loading");
    loading.classList.toggle("hidden", !show);
}

function fetchTasks(){
    showLoading(true);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL+"?_limit=4", true);
    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4) {
            showLoading(false);
            if(xhr.status >= 200 && xhr.status < 300){
                
                const data = JSON.parse(xhr.responseText);
                    tasks = data.map(task=>({
                        id: task.id,
                        title: task.title,
                        completed: task.completed,
                    }));
                    console.log(tasks);
                    renderTasks()
            }else{
                console.log("Error!");
            }
        }
    };
    xhr.send();
}

function createTask(){
    const taskInput = document.getElementById("taskInput");
    const title = taskInput.value;
    // console.log(title);
    if(!title){
        alert("Please enter a task title");
        return;
    }
    const newTask = {
        userId: 1,
        title,
        completed: false,
    };
    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newTask),
    }).then((response) => {
        if(!response.ok) throw new Error();
        return response.json();
    }).then((data)=>{
        // console.log(data);
        tasks.unshift(data);
        renderTasks();
    });
}


function renderTasks() {
    const tasksList = document.getElementById("tasksList");
    if(tasks.length === 0){
        tasksList.innerHTML = 
        '<p class="text-center text-gray-500 py-8">No Task found. add your first task above!</p>';
        return;
    }
    tasksList.innerHTML=tasks.map(task=>{

        return `<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div class="flex items-center gap-3 w-full">
                    <input 
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"/>  
                    <span>${task.title}</span>
                </div>
            <div class="flex items-center gap-2 pl-3">
                <button class="px-3 py-1 bg-gray-100 text-balck text-sm rounded hover:bg-blue-700 transition-colors">Edit</button>
                <button class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-600 transition-colors">Delete</button>
            </div>
            </div>`;

    })
    .join("");
}

