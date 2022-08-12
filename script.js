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

function cancelItem() {
  const btnCancel = document.createElement('button');

  btnCancel.type = 'button';
  btnCancel.type = 'submit';
  btnCancel.innerHTML = 'Cancelar';
  btnCancel.classList.add('button-cancel');
  btnCancel.addEventListener('click', () => {
    const item = btnCancel.closest('li');

    item.classList.remove('editing');
  });

  return btnCancel;
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
    const boxTask = document.createElement('div');
    const boxButton = document.createElement('div');
    const taskItem = document.createElement('span');
    const form = document.createElement('form');
    const editInput = document.createElement('input');

    boxButton.classList.add('box-button');
    taskItem.classList.add('item-list');
    form.classList.add('list-styling');
    editInput.classList.add('input');
    editInput.type = 'text';
    editInput.value = savingTasks[i];
    taskItem.innerHTML = savingTasks[i];
    form.appendChild(boxTask);
    form.appendChild(boxButton);
    boxTask.appendChild(taskItem);
    boxTask.appendChild(editInput);
    boxButton.appendChild(editItem());
    boxButton.appendChild(removeItem(i));
    boxButton.appendChild(saveItem());
    boxButton.appendChild(cancelItem());
    item.appendChild(form);
    list.appendChild(item);
    changeTask(form, i, savingTasks, editInput);
  }
}

function changeTask(form, index, savingTasks, editInput) {
  form.addEventListener('submit', (event) => {
    const valueInput = editInput.value.trim();

    event.preventDefault();
    savingTasks[index] = valueInput;
    localStorage.setItem('task', JSON.stringify(savingTasks));
    clearList();
    generateList();
  });
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
