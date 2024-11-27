const add_todo_btn = document.getElementById("add_todo_btn");

// Todo 추가 버튼
add_todo_btn.addEventListener('click', (event) => {
    // todoList 컨테이너 가져오기
    const todo_list_div = document.querySelector(".todo_list");

    // todo div 생성
    const todo_div = document.createElement('div');
    todo_div.className = "todo";

    // todo_checkbox 생성
    const todo_checkbox = document.createElement("input");
    todo_checkbox.className = "todo_checkbox";
    todo_checkbox.type = "checkbox";

    // todo_input 생성
    const todo_input = document.createElement("input");
    todo_input.className = "todo_input";
    todo_input.type = "text";
    todo_input.placeholder = "입력하세요";

    // 수정 버튼 생성
    const todo_edit = document.createElement("button");
    todo_edit.className = "todo_edit";
    todo_edit.id = "todo_edit";
    
    const todo_edit_icon = document.createElement("img");
    todo_edit_icon.src = "assets/icons/pencil.png";
    todo_edit.appendChild(todo_edit_icon);

    // 삭제 버튼 생성
    const todo_remove = document.createElement("button");
    todo_remove.className = "todo_remove";
    todo_remove.id = "todo_remove";

    const todo_remove_icon = document.createElement("img");
    todo_remove_icon.src = "assets/icons/delete.png";
    todo_remove.appendChild(todo_remove_icon);

    // 생성한 요소들 이어주기
    todo_div.appendChild(todo_checkbox);
    todo_div.appendChild(todo_input);
    todo_div.appendChild(todo_edit);
    todo_div.appendChild(todo_remove);

    // todoList 컨테이너에 생성한 todo 추가
    todo_list_div.appendChild(todo_div);
});

// 현재 Todo 수정 버튼
const todo_edit_btn = document.querySelector(".todo_edit");

todo_edit_btn.addEventListener("click", (event) => {
    // 부모요소 선택
    const parent = todo_edit_btn.parentElement;
    console.log(parent);
    const input_tag = parent.querySelector("input.todo_input");
    // 사용자가 입력한 text 가져오기
    const value = input_tag.value;
    // 삽입
    input_tag.textContent = value;
})