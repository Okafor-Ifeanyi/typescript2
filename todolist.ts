// Todo list class with methods to add, complete, remove, list, filter, update and clear completed todo items
// Todo Item class was seperated from todo list to avoid missing properties in the todo item object, also for consistency on data

interface ITodoItem {   
    id: number
    task: string
    completed: boolean
    dueDate?: Date
}

class TodoItem implements ITodoItem {
    constructor(
        public id: number, 
        public task: string, 
        public completed: boolean = false, 
        public dueDate: Date = new Date()
    ) { }
}

class TodoList {
    private todoList: ITodoItem[] = [ ];
    private nextId: number = 0;

    addTodoItem(task: string, dueDate?: Date) {
        const todoItem = new TodoItem(this.nextId++, task, false, dueDate);
        this.todoList.push(todoItem);
    }

    completeTodoItem(id: number) {
        const todoItem = this.todoList.find(todoItem => todoItem.id === id);
        if (todoItem) {
            todoItem.completed = true;
            console.log('Item completed successfully');
            return todoItem
        } else (  // Error Handling
            console.log('Item not found')
        );
    }

    removeTodoItem(id: number) {
        // returns index of the first matching element on the list
        const index = this.todoList.findIndex(todoItem => todoItem.id === id);
        if (index > -1) {
            this.todoList.splice(index, 1);
            console.log('Item removed successfully');
            return true;
        } else { // Error Handling
            console.log('Item not found');
            return false;
        }
    }

    listTodoItems() {
        // console.log(this.todoList);
        return this.todoList;
    }

    filterTodoItems(completed: boolean) {
        const filteredList = this.todoList.filter(todoItem => todoItem.completed === completed);
        // console.log(filteredList);
        return filteredList;
    }

    updateTodoItem(id: number, task: string) {
        const todoItem = this.todoList.find(todoItem => todoItem.id === id);
        if (todoItem) {
            todoItem.task = task;
            // console.log(todoItem);
            return {message: 'Item updated successfully', todoItem};
        } else { // Error Handling
            console.log('Item not found');
            return {message: 'Item not found'};
        }
    }

    clearCompletedTodoItems() {
        this.todoList = this.todoList.filter(todoItem => todoItem.completed === true);
        return this.todoList;
    }

}

// Testing functions
const todoApp = new TodoList();
todoApp.addTodoItem("Completed Todo Lisst", new Date("2025-03-10"));
todoApp.addTodoItem("Creating task without due date since its optional");

console.log(todoApp.listTodoItems());

todoApp.completeTodoItem(1); // complete second task
console.log(todoApp.filterTodoItems(true)); 

todoApp.removeTodoItem(0); // remove first task
console.log(todoApp.listTodoItems()); // list again to see the changes cause index 0 was removed