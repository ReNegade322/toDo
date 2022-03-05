const addTaskBtn = document.getElementById('submit');
const todosWrapper = document.querySelector('.todo--wrapper');
const inputText = document.getElementById('task__input--name');
const checkFiller = document.querySelector('.checkbox--filler');

let tasks = [];
let checkTask = [];
let close = [];

function NewTask(description){
    this.description = description;
    this.completed = false;
}


const createTemplate = (task, index) => {
    return `
        <div class="new--task ${task.completed ? 'checked': ''}">
            <div class="center">
                <label class="task__label">
                    <input class="toggle ${task.completed ? 'checked' : ''}" type="checkbox" value="${index}" ${task.completed ? 'checked' : ''}>     
                    <span>${task.description}</span>
                </label>
            </div>
            <button class="close" value="${index}"></button>
        </div>
    `
} 

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    checkTask = [];
    close = [];
    checkFiller.style.display = 'none';
    
    if(tasks.length > 0){
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });

        checkTask = document.querySelectorAll('.toggle');

        checkTask.forEach((checkTask) => {
            checkTask.addEventListener('click', (event) => {
                const target = event.target;
                toggler(target);
                console.log(target)
            });
        });

        close = document.querySelectorAll('.close');

        close.forEach((close) => {
            close.addEventListener('click', (event) => {
                const target = event.target;
                deleter(target);
            }); 
        });

        checkFiller.style.display = 'block';
    };  
};
fillHtmlList();



// adding task by hitting enter

addTaskBtn.addEventListener('click', (event) => {
    if (inputText.value != ''){
        event.preventDefault();
        tasks.push(new NewTask(inputText.value));
        fillHtmlList();
        inputText.value = '';
    } else {
        event.preventDefault();
    }
});


// adding check-all-button

checkFiller.addEventListener('click', () => {


    let checkedCounter = 0;
    checkTask.forEach((taskElem) => {
        if (taskElem.className.includes("checked")){
            checkedCounter++;
        };
    });   

    checkTask.forEach((taskElem, index) => {
        if (checkedCounter == 0) {
            taskElem.classList.add("checked");
            tasks[index].completed = true;  
            taskElem.checked = true;
        } else if (checkedCounter == checkTask.length) {
            taskElem.classList.remove("checked");
            tasks[index].completed = false;  
            taskElem.checked = false; 
        } else {
            if (taskElem.className.includes("checked")){
            } else {
                taskElem.classList.add("checked");
                tasks[index].completed = true; 
                taskElem.checked = true;
            };
        };
    });
    console.log(tasks)
});


// adding checked checkboxes

function toggler(checkTask){
    console.log({value:checkTask.value, tasks, checkTask});
    let task = tasks[+checkTask.value];
    task.completed = !task.completed;
    console.log(tasks);
    fillHtmlList();
} 


// deliting task

function deleter(close) {
    tasks.splice (close.value, 1);
    fillHtmlList();
}


