const user = {
    name: 'Tikvah',
    birthday: '02/05/2005',
    address: {
        City: 'Lusaka',
        street: '123 Main St'
    },
    greeting:() => `Hello, my name is ${this.name} and I was born on ${user.birthday}. I live in ${user.address.City} on ${user.address.street}.`,
    farewell: () => `Goodbye from ${user.name}!`
 };


function fetchData(callback) {
  // Simulate fetching data asynchronously
  setTimeout(function() {
    const data = user
    callback(data); // C1all the callback with the fetched data
  }, 5000); // Wait for 5 second
}

console.log("Fetching data...");
fetchData(function(info) {
  console.log("Data received:", info); // This callback executes later
});
console.log("Request sent, wait...");
// Output order might be:
// Fetching data...
// Request sent, wait...
// Data received: { name: 'Tikvah, birthday: ...etc }


console.log(Math.trunc(-5.47654))


//To Do list app fuctions

let todos = [];


function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    const currentFilter = document.querySelector('.filter-btn.active').dataset.filter;

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // 'all'
    });

    todoList.innerHTML = filteredTodos.map(todo => `
        <li class="${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span>${todo.text}</span>
            <button class="delete-btn">❌</button>
        </li>
    `).join('');
}

function addTodo(){
  const input = document.getElementById('todoInput');
  const text = input.value.trim();

  if (text ===''){
    alert('Please enter a todo!');
    return;
  }

  const todo ={
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(todo);
  input.value='';
  saveTodos();
  renderTodos();
}

document.getElementById('addBtn').addEventListener('click', addTodo);

//Enter key support
document.getElementById('todoInput').addEventListener('keypress',(e)=>{
  if(e.key==='Enter')addTodo();
});



// Event delegation for checkbox and delete
document.getElementById('todoList').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    const id = parseInt(li.dataset.id);

    if (e.target.type === 'checkbox') {
        toggleTodo(id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    }
});

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}


function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
        renderTodos();
    }
}

// Load on page load
window.addEventListener('DOMContentLoaded', loadTodos);

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderTodos();
    });
});



console.log(todo.id)