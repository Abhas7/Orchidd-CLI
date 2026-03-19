// Get DOM elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// Array to store todo items
let todos = [];

// Function to load todos from Local Storage
const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        try {
            todos = JSON.parse(storedTodos);
            renderTodos();
        } catch (e) {
            console.error("Error parsing todos from localStorage", e);
            todos = []; // Reset on error
        }
    }
};

// Function to save todos to Local Storage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Function to render todos to the DOM
const renderTodos = () => {
    todoList.innerHTML = ''; // Clear existing list

    if (todos.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'todo-item';
        emptyMessage.style.justifyContent = 'center';
        emptyMessage.style.color = '#888';
        emptyMessage.style.cursor = 'default';
        emptyMessage.style.backgroundColor = '#f0f0f0';
        emptyMessage.textContent = 'No todos yet! Add one above.';
        todoList.appendChild(emptyMessage);
        return;
    }

    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        listItem.dataset.index = index; // Store index for easy access

        const todoText = document.createElement('span');
        todoText.textContent = todo.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('aria-label', `Delete todo: ${todo.text}`);

        listItem.appendChild(todoText);
        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    });
};

// Function to add a new todo
const addTodo = () => {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('Please enter a todo item!');
        return;
    }

    const newTodo = {
        id: Date.now(), // Unique ID for each todo
        text: todoText,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
    todoInput.value = ''; // Clear input field
};

// Function to toggle todo completion status
const toggleTodoStatus = (index) => {
    if (index >= 0 && index < todos.length) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    } else {
        console.error("Invalid todo index for toggle status:", index);
    }
};

// Function to delete a todo
const deleteTodo = (index) => {
    if (index >= 0 && index < todos.length) {
        // Confirm deletion for better UX, especially for important tasks
        if (confirm(`Are you sure you want to delete "${todos[index].text}"?`)) {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    } else {
        console.error("Invalid todo index for deletion:", index);
    }
};

// Event Listeners
addTodoBtn.addEventListener('click', addTodo);

// Allow adding todo with 'Enter' key
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if any
        addTodo();
    }
});

// Event delegation for toggling and deleting todos
todoList.addEventListener('click', (event) => {
    const target = event.target;
    const listItem = target.closest('.todo-item');

    if (!listItem) return; // Not a todo item click

    const index = parseInt(listItem.dataset.index);

    if (target.classList.contains('delete-btn')) {
        // Clicked on delete button
        deleteTodo(index);
    } else if (target.tagName === 'SPAN' || target.classList.contains('todo-item')) {
        // Clicked on todo text or the list item itself to toggle completion
        toggleTodoStatus(index);
    }
});

// Initial load of todos when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);
