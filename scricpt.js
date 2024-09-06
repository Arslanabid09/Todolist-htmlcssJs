let Input = document.getElementById('todo-input');
let list = document.getElementById('todo-list');

// Load stored tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks from the array
function renderTasks() {
    list.innerHTML = '';  // Clear the list before rendering
    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.innerHTML = `
             <div class="task">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">${task.completed ? '' : ''}</input>
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.name}</span>
        </div>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    let newInput = Input.value.trim();  // Get the input value and trim whitespace

    if (newInput !== '') {  // Check if input is not empty
        tasks.push({ name: newInput, completed: false });  // Add new task as an object with name and completed flag
        localStorage.setItem('tasks', JSON.stringify(tasks));  // Store updated array in localStorage
        renderTasks();  // Render the updated task list
        Input.value = '';  // Clear the input field after adding the task
    } else {
        alert('Please enter a task');  // Alert if input is empty
    }
}

// Function to toggle task status (Done/Undone)
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;  // Toggle the completed status
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Update localStorage
    renderTasks();  // Re-render the task list
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);  // Remove task from array
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Update localStorage
    renderTasks();  // Re-render the task list
}

// Call renderTasks when the page loads to retrieve stored tasks
renderTasks();
