// DOM Elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const messageDisplay = document.getElementById('message');

// Global Variables
let todos = [];
let currentFilter = 'all'; // 'all', 'active', 'completed'

// --- Utility Functions ---

/**
 * Displays a message to the user.
 * @param {string} msg - The message to display.
 * @param {boolean} isError - True if it's an error message, false otherwise.
 */
function showMessage(msg, isError = false) {
    messageDisplay.textContent = msg;
    messageDisplay.style.color = isError ? '#e74c3c' : '#2ecc71';
    messageDisplay.style.display = 'block';
    setTimeout(() => {
        messageDisplay.style.display = 'none';
        messageDisplay.textContent = '';
    }, 3000); // Hide after 3 seconds
}

// --- Local Storage Functions ---

/**
 * Saves the current todos array to local storage.
 */
function saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Error saving todos to local storage:', error);
        showMessage('Failed to save todos. Local storage might be full or unavailable.', true);
    }
}

/**
 * Loads todos from local storage.
 * @returns {Array} The loaded todos array or an empty array if none found.
 */
function loadTodos() {
    try {
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
        console.error('Error loading todos from local storage:', error);
        showMessage('Failed to load todos. Local storage might be corrupted.', true);
        return [];
    }
}

// --- Todo Management Functions ---

/**
 * Renders the todos to the DOM based on the current filter.
 */
function renderTodos() {
    todoList.innerHTML = ''; // Clear existing list

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') {
            return !todo.completed;
        } else if (currentFilter === 'completed') {
            return todo.completed;
        } else {
            return true; // 'all' filter
        }
    });

    if (filteredTodos.length === 0) {
        const message = document.createElement('li');
        message.className = 'message';
        message.textContent = 'No tasks found for this filter.';
        todoList.appendChild(message);
        return;
    }

    filteredTodos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        listItem.dataset.id = todo.id; // Store ID for easy access

        listItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        todoList.appendChild(listItem);
    });
}

/**
 * Adds a new todo to the list.
 */
function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        showMessage('Todo description cannot be empty!', true);
        return;
    }

    // Check for duplicate todos (case-insensitive and trimmed)
    const isDuplicate = todos.some(todo => todo.text.toLowerCase() === todoText.toLowerCase());
    if (isDuplicate) {
        showMessage('This todo already exists!', true);
        todoInput.value = '';
        return;
    }

    const newTodo = {
        id: Date.now(), // Unique ID based on timestamp
        text: todoText,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = ''; // Clear input
    showMessage('Todo added successfully!');
}

/**
 * Toggles the completion status of a todo.
 * @param {string} id - The ID of the todo to toggle.
 */
function toggleComplete(id) {
    todos = todos.map(todo =>
        todo.id === Number(id) ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos();
    renderTodos();
    showMessage('Todo status updated!');
}

/**
 * Deletes a todo from the list.
 * @param {string} id - The ID of the todo to delete.
 */
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== Number(id));
    saveTodos();
    renderTodos();
    showMessage('Todo deleted successfully!');
}

// --- Event Listeners ---

// Add Todo Button Click
addTodoBtn.addEventListener('click', addTodo);

// Add Todo on Enter Key Press
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// Todo List Event Delegation (for checkboxes and delete buttons)
todoList.addEventListener('click', (event) => {
    const target = event.target;
    const listItem = target.closest('.todo-item');

    if (!listItem) return; // Click wasn't on a todo item

    const todoId = listItem.dataset.id;

    if (target.type === 'checkbox') {
        toggleComplete(todoId);
    } else if (target.classList.contains('delete-btn')) {
        deleteTodo(todoId);
    }
});

// Filter Buttons Click
filterBtns.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        currentFilter = button.dataset.filter;
        renderTodos();
    });
});

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    todos = loadTodos();
    renderTodos();
});
