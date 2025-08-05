const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.textContent = text;

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '✏️';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.innerHTML = '&times;';

  taskText.onclick = () => li.classList.toggle('completed');

  editBtn.onclick = () => {
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = taskText.textContent;
    inputEdit.className = 'edit-input';

    inputEdit.onkeypress = e => {
      if (e.key === 'Enter') finishEdit();
    };
    inputEdit.onblur = finishEdit;

    function finishEdit() {
      const newText = inputEdit.value.trim();
      if (newText) taskText.textContent = newText;
      taskText.style.display = '';
      inputEdit.remove();
    }

    taskText.style.display = 'none';
    li.insertBefore(inputEdit, taskText);
    inputEdit.focus();
  };

  removeBtn.onclick = () => li.remove();

  li.append(taskText, editBtn, removeBtn);
  list.appendChild(li);
  input.value = '';
}
