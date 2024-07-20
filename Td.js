document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(task => {
        tasks.push({
            text: task.querySelector('.task-text').innerText,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        addTaskToDOM({ text: taskText, completed: false });
        newTaskInput.value = '';
        saveTasks();
    }
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.innerText = task.text;
    li.appendChild(taskText);

    const completeButton = document.createElement('button');
    completeButton.className = 'complete';
    completeButton.innerText = 'Complete';
    completeButton.onclick = () => {
        li.classList.toggle('completed');
        saveTasks();
    };
    li.appendChild(completeButton);

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.innerText = 'Edit';
    editButton.onclick = () => {
        const newTaskText = prompt('Edit task', taskText.innerText);
        if (newTaskText) {
            taskText.innerText = newTaskText;
            saveTasks();
        }
    };
    li.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(li);
        saveTasks();
    };
    li.appendChild(deleteButton);

    taskList.appendChild(li);
}
