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
    xhr.open("GET", API_URL, true);
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
            }else{
                console.log("Error");
            }
        }
    };
    xhr.send();
}


