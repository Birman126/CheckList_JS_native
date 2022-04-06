const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task"); //хранит значение из поля input
const todosWrapper = document.getElementById("todos-wrapper");
const removeAllTasksBtn = document.getElementById("remove-all-task");

let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTamplate = (task, index) => {
  return `
    <hr>
    <div class="todo-item ${task.completed ? 'checked' : ''}">
                    <div class="description">${task.description}</div>
                        <div class="buttons">
                            <input onclick="completeTask(${index})" class="btn-complete" type ="checkbox" ${task.completed ? 'checked' : ''}>
                            <button onclick="deleteTask(${index})" class="btn-delete">DELETE</button>
                        </div>        
                </div>
    `
};

const fillHtmlList = () => {
  todosWrapper.innerHTML = "";
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTamplate(item, index);
    });
    todoItemElems = document.querySelectorAll('.todo-item');
  }
};

fillHtmlList();

const updateLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  fillHtmlList();
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  console.log(tasks[index].completed);
  if (tasks[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  updateLocal();
  fillHtmlList();
};

const completeAllTask = () => {
    for (let index=0; index<tasks.length;index++){
        console.log(index);
        tasks[index].completed = true;;
    } 
    

    updateLocal();
    fillHtmlList();
  };


addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(deskTaskInput.value));
  updateLocal();
  deskTaskInput.value = ""; //очищает импут
});

removeAllTasksBtn.addEventListener("click", () => {
  tasks = [];
  updateLocal();
});

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
} 