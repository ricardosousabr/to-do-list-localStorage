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

  btnSave.type = 'button';
  btnSave.type = 'submit';
  btnSave.innerHTML = 'Salvar';
  btnSave.classList.add('button-save');

  return btnSave;
}

function editItem() {
  const btnEdit = document.createElement('button');

  btnEdit.type = 'button';
  btnEdit.innerHTML = 'Editar';
  btnEdit.classList.add('button-edit');
  btnEdit.addEventListener('click', () => {
    const item = btnEdit.closest('li');

    item.classList.add('editing');
  });

  return btnEdit;
}

function removeItem(index) {
  const btnRemove = document.createElement('button');

  btnRemove.type = 'button';
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
    const form = document.createElement('form');
    const editInput = document.createElement('input');

    editInput.classList.add('input');
    editInput.type = 'text';
    editInput.value = savingTasks[i];
    taskItem.innerHTML = savingTasks[i];
    form.appendChild(taskItem);
    form.appendChild(editInput);
    form.appendChild(editItem());
    form.appendChild(removeItem(i));
    form.appendChild(saveItem());
    item.appendChild(form);
    list.appendChild(item);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      handleInput(i, editInput);
    });
  }
}

function handleInput(i, editInput) {
  console.log(i, editInput);

  editInput.value = 'Hello';
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
