const addTaskBtn = document.getElementById('submit');
const todosWrapper = document.querySelector('.todo--wrapper');
const inputText = document.getElementById('task__input--name');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));


function NewTask(description){
    this.description = description;
    this.completed = false;
}


const createTemplate = (task, index) => {
    return `
        <div class="new--task ${task.completed ? 'checked': ''}">
            <div>
                <input class="toggle" type="checkbox"> ${task.completed ? 'checked' : ''}     
                <label class="task__label"><span>${task.description}</span></label>
            </div>
            <button class="close"></button>
        </div>
    `
} 

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index)
        })
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new NewTask(inputText.value));
    updateLocal();
    fillHtmlList();
});






//получаю текст из инпута


//записываю контент в массив


// добавление таски в html







