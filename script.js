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

function generateList() {
  const savingTasks = JSON.parse(localStorage.getItem('task')) || [];

  for (i = 0; i < savingTasks.length; i++) {
    const item = document.createElement('li');
    const taskItem = document.createElement('span');
    const btnSave = document.createElement('button');
    const btnEdit = document.createElement('button');
    const btnRemove = document.createElement('button');

    taskItem.innerHTML = savingTasks[i];
    item.appendChild(taskItem);
    btnSave.innerHTML = 'Salvar';
    btnSave.classList.add('button-save');
    item.appendChild(btnSave);
    btnEdit.innerHTML = 'Editar';
    btnEdit.classList.add('button-edit');
    item.appendChild(btnEdit);
    btnRemove.innerHTML = 'Remover';
    item.appendChild(btnRemove);
    list.appendChild(item);

    btnEdit.addEventListener('click', () => {
      const item = btnEdit.closest('li');
      item.classList.add('editing');
    });

    btnSave.addEventListener('click', () => {
      const item = btnEdit.closest('li');
      item.classList.remove('editing');
    });
  }
}

/*function EditItem() {
  const btnEdit = document.querySelector('.button-edit');

  btnEdit.addEventListener('click', () => {
    console.log('test');
    btnEdit.closest('li').classList.remove('.editing');
  });
}*/

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
