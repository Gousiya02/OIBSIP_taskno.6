const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterSelect = document.getElementById('filter-select');

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const currentTime = new Date();
    const timestamp = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <div>
      <span class="task-time">${timestamp}</span>
      <button onclick="editTask(this)" class="edit-btn">Edit</button>
        <button onclick="completeTask(this)" class="complete-btn">Complete</button>
        <button onclick="deleteTask(this)" class="del-btn">Delete</button>
      
      </div>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
    filterTasks();
  }
}

function completeTask(button) {
  const taskItem = button.parentElement.parentElement;
  taskItem.classList.toggle('completed');
  filterTasks();
}

function deleteTask(button) {
  const taskItem = button.parentElement.parentElement;
  taskItem.remove();
  filterTasks();
}


function editTask(button) {
  const taskItem = button.parentElement.parentElement;
  const span = taskItem.querySelector('span');
  span.contentEditable = true;
  span.focus();
  button.style.display = 'none';
  span.classList.add('editing');
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-btn');
  button.parentElement.insertBefore(saveButton, button);

  saveButton.addEventListener('click', function () {
    span.contentEditable = false;
    button.style.display = 'inline';
    saveButton.remove();
    span.classList.remove('editing');
    filterTasks();
  });
}



function filterTasks() {
  const filterValue = filterSelect.value;
  const tasks = document.querySelectorAll('#task-list li');
  tasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');
    if ((filterValue === 'all') ||
      (filterValue === 'completed' && isCompleted) ||
      (filterValue === 'incomplete' && !isCompleted)) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}
