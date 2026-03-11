const API_URL = "https://jsonplaceholder.typicode.com/posts";
let tasks = [];

function fetchTasks(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL+"?_limit=4", true);
    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 300){
                try {
                    const data = JSON.parse(xhr.responseText);
                    tasks = data.map(task=>({
                        id: task.id,
                        title: task.title,
                        completed: task.completed,
                    }));
                } catch (error) {
                    
                }
            }
        }
    };
}