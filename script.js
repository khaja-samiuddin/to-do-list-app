const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskListElement = document.getElementById('task-list');

let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function addTask() {
    const task = taskInput.value;
    if (task === '') {
        alert('Please enter a task');
        return;
    }
    const taskObject = { text: task, completed: false };
    taskList.push(taskObject);
    saveTasks();
    renderTask(taskObject);
    taskInput.value = '';
}

function renderTask(taskObject) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'bg-gray-100', 'rounded-lg', 'hover:bg-gray-200', 'transition', 'duration-300');

    const taskContent = document.createElement('div');
    taskContent.classList.add('flex', 'items-center', 'space-x-3');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('h-6', 'w-6', 'rounded-full', 'border-gray-300', 'text-red-500', 'focus:ring-red-400');
    checkbox.checked = taskObject.completed;

    const taskText = document.createElement('span');
    taskText.classList.add('text-gray-800', 'text-lg');
    taskText.textContent = taskObject.text;
    if (taskObject.completed) taskText.classList.add('line-through', 'text-gray-400');

    taskContent.appendChild(checkbox);
    taskContent.appendChild(taskText);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('text-gray-400', 'hover:text-red-500', 'transition', 'duration-300', 'text-2xl', 'font-semibold');
    deleteButton.innerHTML = '&times;';

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    taskListElement.appendChild(taskItem);

    checkbox.addEventListener('change', () => {
        taskObject.completed = checkbox.checked;
        taskText.classList.toggle('line-through', taskObject.completed);
        taskText.classList.toggle('text-gray-400', taskObject.completed);
        saveTasks();
    });

    deleteButton.addEventListener('click', () => {
        taskList = taskList.filter(t => t !== taskObject);
        saveTasks();
        taskItem.remove();
    });
}

function loadTasks() {
    taskList.forEach(renderTask);
}

addTaskButton.addEventListener('click', addTask);
window.addEventListener('load', loadTasks);
