window.addEventListener('load', () =>{
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || "";
    nameInput.value = username;

    nameInput.addEventListener("change", (e) =>{
        localStorage.setItem('username', e.target.value)
    })

    newTodoForm.addEventListener('submit', (e)=>{
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
                todos.push(todo)

        localStorage.setItem('todos', JSON.stringify(todos))

        e.target.reset();
        DisplayTodos()
    })
DisplayTodos()

})

function DisplayTodos() {
    const todoList = document.querySelector("#todo-list")

    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        const label = document.createElement("label");
        const input = document.createElement('input');
        const span = document.createElement('span');
        span.classList.add('bubble');
        const content = document.createElement('div');
        content.classList.add("todo-content");
        const action = document.createElement('div');
        action.classList.add('actions');
        const edit = document.createElement('button');
        edit.classList.add('edit');
        const deleted = document.createElement('button');
        deleted.classList.add('delete')
        

        input.type = 'checkbox';
        input.checked = todo.done

        if (todo.category == 'personal') {
            span.classList.add('personal')
        }else{
            span.classList.add('business')
        }

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
        edit.innerHTML = "Edit"
        deleted.innerHTML = "Deleted"

        label.appendChild(input);
        label.appendChild(span);
        action.appendChild(edit)
        action.appendChild(deleted)
        todoItem.appendChild(label)
        todoItem.appendChild(content)
        todoItem.appendChild(action)
        todoList.appendChild(todoItem)
        if(todo.done) {
            todoItem.classList.add('done')
        }
        input.addEventListener('click', (e)=> {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done')
            }else{
                todoItem.classList.remove('done')
            }
            DisplayTodos();
        })

        edit.addEventListener('click', () =>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly')
            input.focus()
            input.addEventListener('blur', (e)=>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos',JSON.stringify(todos))
                DisplayTodos()
            })

            })

            deleted.addEventListener('click', () =>{
                todos = todos.filter(t => t != todo)
                console.log(todos)

                localStorage.setItem('todos', JSON.stringify(todos))
                DisplayTodos()

        })

    })
}