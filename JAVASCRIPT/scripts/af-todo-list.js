const todoList = [{
  name:'make dinner', 
  dueDate: '2026-07-20'
},{
  name:'wash dishes', 
  dueDate: '2026-07-20'
}];

renderTodoList();

function renderTodoList(){
  let todoListHTML = ''; 

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        console.log(index); //closure if a function a=has access to a value it will always have access to that value
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

  

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  
  todoList.push({
    name,
    dueDate
  });

  inputElement.value = '';
  renderTodoList();
}