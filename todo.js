class Todo {
    constructor(id, text, isDone = false) {
        this.id = id;
        this.text = text;
        this.isDone = isDone;
    }
}

class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo() {
        const todoInput = document.getElementById("newTodo");
        const text = todoInput.value;
        if (text === "") {
            return;
        }

        const todo = new Todo(Date.now(), text);
        this.todos.push(todo);
        todoInput.value = "";
        this.renderTodos();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.renderTodos();
    }

    filterTodos() {
        const filterTodo = document.getElementById("filter");
        const filterStatus = filterTodo.value;
        this.renderTodos(filterStatus);
    }
    editTodoText(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            const newText = prompt('Edit todo:', todo.text);
            if (newText !== null) {
                todo.text = newText;
            }
        }
        this.renderTodos();
    }

    toggleTodo(id, currentFilter) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.isDone = !todo.isDone;
        }
        this.renderTodos(currentFilter);
    }

    clearTodoInput() {
        const todoInput = document.getElementById("newTodo");
        todoInput.value = "";
    }

    renderTodos(filter = 'all') {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';

        let filteredTodos = this.todos;
        if (filter === 'done') {
            filteredTodos = this.todos.filter(todo => todo.isDone);
        } else if (filter === 'undone') {
            filteredTodos = this.todos.filter(todo => !todo.isDone);
        }

        filteredTodos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = 'todo-item';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.isDone;
            checkbox.onchange = () => this.toggleTodo(todo.id, filter);

            const text = document.createElement('input');
            text.type = 'text';
            text.value = todo.text;
            text.readOnly = true;

            const editTodoBtn = document.createElement('button');
            editTodoBtn.textContent = 'Edit';
            editTodoBtn.onclick = () => this.editTodoText(todo.id);

            const deleteTodoBtn = document.createElement('button');
            deleteTodoBtn.textContent = 'Delete';
            deleteTodoBtn.onclick = () => this.deleteTodo(todo.id);

            todoItem.appendChild(checkbox);
            todoItem.appendChild(text);
            todoItem.appendChild(editTodoBtn);
            todoItem.appendChild(deleteTodoBtn);
            todoList.appendChild(todoItem);
        });
    }

}

const todoList = new TodoList();
document.getElementById("addTodoBtn").addEventListener("click", () => todoList.addTodo());
document.getElementById("filter").addEventListener("change", () => todoList.filterTodos());