const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

function saveTodos() {
  const todos = [];

  document.querySelectorAll(".todo-item").forEach((li) => {
    const text = li.querySelector(".todo-text").textContent;
    const done = li.classList.contains("done");
    todos.push({ text, done });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(text, done) {
  const li = document.createElement("li");
  li.className = "todo-item";
  if (done) {
    li.classList.add("done");
  }
  const span = document.createElement("span");
  span.textContent = text;
  span.className = "todo-text";
  li.appendChild(span);

  const del = document.createElement("button");
  del.textContent = "delete";
  del.className = "delete-btn";
  li.appendChild(del);

  list.appendChild(li);
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.forEach((todo) => {
    createTodo(todo.text, todo.done);
  });
}

loadTodos();

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const text = input.value.trim();
    const cleaned = text.replace(/ ([?!:;,.])$/, "\u00A0$1");

    if (cleaned !== "") {
      createTodo(cleaned, false);
      saveTodos();
      input.value = "";
    }
  }
});

list.addEventListener("click", function (event) {
  if (event.target.classList.contains("todo-text")) {
    // find the parent li
    const li = event.target.closest("li");

    // toggle the .done class on the li
    li.classList.toggle("done");
    saveTodos();
  } else if (event.target.classList.contains("delete-btn")) {
    const li = event.target.closest("li");
    list.removeChild(li);
  }
});
