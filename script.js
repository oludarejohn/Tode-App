const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const clearCompleted = document.getElementById('clearCompleted');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalTasks.textContent = `${total} task${total !== 1 ? 's' : ''}`;
    completedTasks.textContent = `${completed} completed`;
}

function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">×</button>
        `;
        
        // Toggle complete
        li.querySelector('input').addEventListener('change', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
            updateStats();
        });
        
        // Delete task
        li.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
            updateStats();
        });
        
        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;
    
    tasks.push({
        text: text,
        completed: false
    });
    
    saveTasks();
    renderTasks();
    updateStats();
    taskInput.value = '';
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

clearCompleted.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateStats();
});

// Initialize
renderTasks();
updateStats();