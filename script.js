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

function editItem() {
  const btnEdit = document.createElement('button');

  btnEdit.innerHTML = 'Editar';
  btnEdit.classList.add('button-edit');
  btnEdit.addEventListener('click', () => {
    const item = btnEdit.closest('li');
    item.classList.add('editing');
    console.log('Tudo certo');
  });

  return btnEdit;
}

function saveItem() {
  const btnSave = document.createElement('button');

  btnSave.innerHTML = 'Salvar';
  btnSave.classList.add('button-save');
  btnSave.addEventListener('click', () => {
    const item = btnSave.closest('li');
    item.classList.remove('editing');
    console.log('Tudo certo');
  });

  return btnSave;
}

function removeItem() {
  const btnRemove = document.createElement('button');

  btnRemove.innerHTML = 'Remover';
  btnRemove.classList.add('button-remove');
  btnRemove.addEventListener('click', () => {});

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
    item.appendChild(removeItem());
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
    EditItem();
  }
  clearInput();
}

generateList();
idform.addEventListener('submit', handleSubmit);
