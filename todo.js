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
}