const input = document.querySelector('.input-value');
const list = document.querySelector('.to-do-list');
const taskArray = [];

function checkValueTask() {
  const valueInput = input.value.trim() != '';

  return valueInput;
}

function createTasks() {
  const item = document.createElement('li');
  const task = document.createElement('span');
  const valueInput = input.value.trim();

  list.appendChild(item);
  item.appendChild(task);
  task.innerHTML = valueInput;
  addTaskArray();
}

function addTaskArray() {
  const valueInput = input.value.trim();

  taskArray.push(valueInput);
  console.log(taskArray);
}

function handleSubmit(event) {
  event.preventDefault();

  if (checkValueTask()) {
    createTasks();
  }
}

taskForm.addEventListener('submit', handleSubmit);
