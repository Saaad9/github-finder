
// todo_list 요소를 불러옴
const list = document.querySelector(".todo_list");

const add_btn = document.getElementById('add_btn');

add_btn.addEventListener('click', createTodo);

let todos = [];

// Todo 객체 생성
function createTodo() {
    // todo 객체
    const todo = {
        id : Date.now(),
        text : "",
        checked : false,
    }
    // 배열의 앞에 todo element를 추가
    todos.unshift(todo);
    // todo 객체를 이용해서 todo element 생성
    const {todo_elem, input_elem} = createTodoElement(todo);

    // todo_list의 맨앞에 todo element를 추가
    list.prepend(todo_elem);
    
    input_elem.focus();
}

function createTodoElement(todo) {
    // todo Element 
    const todo_elem = document.createElement('div');
    todo_elem.className = 'todo';

    // checkbox 생성
    const checkbox_elem = document.createElement('input');
    checkbox_elem.class = "todo_checkbox";
    checkbox_elem.type = 'checkbox';
    checkbox_elem.checked = todo.checked;    
    
    if(todo.checked) {
        todo_elem.classList.add('checked');
    }

    checkbox_elem.addEventListener('change', () => {
        todo.checked = checkbox_elem.checked;
        if(todo.checked) {
            todo_elem.classList.add('checked');
            input_elem.style="text-decoration: line-through;";
            saveLocalStorage(todos);
        }
        else {
            todo_elem.classList.remove('checked');
            todo_checked = false;
            input_elem.style="text-decoration: none;";
            saveLocalStorage(todos);
        }
    });
    
    // input textbox 생성
    const input_elem = document.createElement('input');
    input_elem.type = "text";
    input_elem.value = todo.text;
    input_elem.className = 'todo_input';
    // 태그가 생성된 순간 포커싱되도록
    input_elem.focus();

    input_elem.addEventListener('focus',()=>{
        input_elem.disabled = false;
        input_elem.classList.add('focused');
    });

    // input textbox 포커싱 빠지면
    input_elem.addEventListener('blur',()=>{
        input_elem.disabled = true;
        todo.text = input_elem.value;
        input_elem.classList.remove('focused');
        saveLocalStorage(todos);
    });
    // 사용자가 엔터쳤을때
    input_elem.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') {
            todo.text = input_elem.value;
            input_elem.blur();
            saveLocalStorage(todos)
        } 
    });
  
    // edit 버튼 생성
    const edit_btn_elem = document.createElement('button');
    edit_btn_elem.className = 'todo_edit';
    edit_btn_elem.innerText = "Edit";

    edit_btn_elem.addEventListener('click', () => {
        input_elem.classList.add("focused");
        input_elem.focus();
        input_elem.disabled = false;
    });

    // remove 버튼 생성
    const remove_btn_elem = document.createElement('button');
    remove_btn_elem.className = 'todo_remove';
    remove_btn_elem.innerText = "Delete";

    remove_btn_elem.addEventListener('click', () => {
        // id가 다른것들만 todos에 남음
        todos = todos.filter(item => item.id!== todo.id);
        todo_elem.remove();
        saveLocalStorage(todos);
    });


    todo_elem.appendChild(checkbox_elem);
    todo_elem.appendChild(input_elem);
    todo_elem.appendChild(edit_btn_elem);
    todo_elem.appendChild(remove_btn_elem);

    return {todo_elem, input_elem};
}

function saveLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(localStorage.getItem('todos'));
}

function loadLocalStorage() {
    if(localStorage.getItem('todos')){
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(todo => {
            const {todo_elem} = createTodoElement(todo);
            list.appendChild(todo_elem);
            console.log(todo);
        });
        console.log(localStorage.getItem('todos'));
    }
}

loadLocalStorage();