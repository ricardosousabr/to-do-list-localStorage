const input = document.querySelector('.input-value');
const list = document.querySelector('.to-do-list');
const taskArray = localStorage.getItem('task') || [];
const idform = document.querySelector('#taskForm');

function checkValueTask() {
  const valueInput = input.value.trim() != '';

  return valueInput;
}
function createTask() {
  const valueInput = input.value.trim();
  const savingTasks = JSON.parse(localStorage.getItem('task')) || [];

  savingTasks.push(valueInput);
  localStorage.setItem('task', JSON.stringify(savingTasks));
}

function clearList() {
  list.innerHTML = '';
}

function saveItem() {
  const btnSave = document.createElement('button');

  btnSave.innerHTML = 'Salvar';
  btnSave.classList.add('button-save');
  btnSave.addEventListener('click', () => {
    const item = btnSave.closest('li');

    item.classList.remove('editing');
  });

  return btnSave;
}

function editItem() {
  const btnEdit = document.createElement('button');
  const editInput = document.createElement('input');

  btnEdit.innerHTML = 'Editar';
  btnEdit.classList.add('button-edit');
  btnEdit.addEventListener('click', () => {
    const item = btnEdit.closest('li');

    item.classList.add('editing');
    item.prepend(editInput);
  });

  return btnEdit;
}

function removeItem(index) {
  const btnRemove = document.createElement('button');

  btnRemove.innerHTML = 'Remover';
  const itemArray = JSON.parse(localStorage.getItem('task')) || [];

  btnRemove.classList.add('button-remove');
  btnRemove.addEventListener('click', () => {
    itemArray.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(itemArray));
    clearList();
    generateList();
  });

  return btnRemove;
}

function generateList() {
  const savingTasks = JSON.parse(localStorage.getItem('task')) || [];

  for (i = 0; i < savingTasks.length; i++) {
    const item = document.createElement('li');
    const taskItem = document.createElement('span');

    taskItem.innerHTML = savingTasks[i];
    item.appendChild(taskItem);
    item.appendChild(saveItem());
    item.appendChild(editItem());
    item.appendChild(removeItem(i));
    list.appendChild(item);
  }
}

function clearInput() {
  input.value = '';
}

function handleSubmit(event) {
  event.preventDefault();

  if (checkValueTask()) {
    createTask();
    clearList();
    generateList();
  }
  clearInput();
}

generateList();
idform.addEventListener('submit', handleSubmit);
