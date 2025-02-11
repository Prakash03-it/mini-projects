// Get DOM elements
const inputField = document.getElementById('new-task');
const addButton = document.getElementById('add-task');
const todoList = document.getElementById('todo-list');

// Add a new task
addButton.addEventListener('click', function() {
    const taskText = inputField.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');

        // Create task text
        const text = document.createElement('span');
        text.textContent = taskText;
        li.appendChild(text);

        // Add buttons
        const completeBtn = document.createElement('button');
        completeBtn.classList.add('complete-btn');
        completeBtn.textContent = 'Complete';
        li.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);

        // Add event listeners
        completeBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
        });

        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        // Append to list
        todoList.appendChild(li);

        // Clear input field
        inputField.value = '';
    }
});
