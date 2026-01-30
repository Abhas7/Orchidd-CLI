document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all'; // 'all', 'active', 'completed'

    /**
     * Saves the current todos array to localStorage.
     */
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    /**
     * Renders the todo list based on the current filter.
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

        if (filteredTodos.length === 0 && todos.length > 0) {
            const message = document.createElement('p');
            message.textContent = `No ${currentFilter} tasks to show.`;
            message.style.textAlign = 'center';
            message.style.color = '#888';
            todoList.appendChild(message);
        } else if (todos.length === 0) {
             const message = document.createElement('p');
            message.textContent = `Start by adding a new todo!`;
            message.style.textAlign = 'center';
            message.style.color = '#888';
            todoList.appendChild(message);
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.setAttribute('data-id', todo.id);

            li.innerHTML = `
                <div class="todo-item-content">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} id="checkbox-${todo.id}">
                    <label for="checkbox-${todo.id}">${escapeHTML(todo.text)}</label>
                </div>
                <button class="delete-btn">Delete</button>
            `;

            todoList.appendChild(li);
        });
    }

    /**
     * Adds a new todo item to the list.
     */
    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') {
            alert('Todo cannot be empty!');
            return;
        }

        const newTodo = {
            id: Date.now(), // Simple unique ID
            text: text,
            completed: false
        };

        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = ''; // Clear input field
    }

    /**
     * Toggles the completion status of a todo.
     * @param {number} id - The ID of the todo to toggle.
     */
    function toggleTodoComplete(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
        renderTodos();
    }

    /**
     * Deletes a todo item from the list.
     * @param {number} id - The ID of the todo to delete.
     */
    function deleteTodo(id) {
        // Confirmation for deletion
        if (!confirm('Are you sure you want to delete this todo?')) {
            return;
        }
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    /**
     * Clears all completed todo items.
     */
    function clearCompletedTodos() {
        if (!confirm('Are you sure you want to clear all completed todos?')) {
            return;
        }
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    }

    /**
     * Clears all todo items.
     */
    function clearAllTodos() {
        if (!confirm('Are you sure you want to clear ALL todos? This action cannot be undone.')) {
            return;
        }
        todos = [];
        saveTodos();
        renderTodos();
    }

    /**
     * Safely escapes HTML to prevent XSS attacks.
     * @param {string} str - The string to escape.
     * @returns {string} The escaped string.
     */
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // Event Listeners
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    todoList.addEventListener('click', (e) => {
        const listItem = e.target.closest('.todo-item');
        if (!listItem) return;

        const todoId = parseInt(listItem.getAttribute('data-id'));

        if (e.target.type === 'checkbox') {
            toggleTodoComplete(todoId);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTodo(todoId);
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTodos();
        });
    });

    clearCompletedBtn.addEventListener('click', clearCompletedTodos);
    clearAllBtn.addEventListener('click', clearAllTodos);

    // Initial render
    renderTodos();
});