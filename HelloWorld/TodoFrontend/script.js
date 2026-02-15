// ================= CONFIG =================
const SERVER_URL = "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

// ================= LOGIN =================
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${SERVER_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.message || "Login failed");
        });
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem("token", data.token);
      window.location.href = "todos.html";
    })
    .catch(err => alert(err.message));
}

// ================= REGISTER =================
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${SERVER_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => {
          throw new Error(data.message || "Registration failed");
        });
      }
      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}

// ================= LOAD TODOS =================
function loadTodos() {
  if (!getToken()) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  fetch(`${SERVER_URL}/todo`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to load todos");
      return res.json();
    })
    .then(todos => {
      const list = document.getElementById("todo-list");
      list.innerHTML = "";

      if (!todos || todos.length === 0) {
        list.innerHTML = "<p>No todos yet</p>";
        return;
      }

      todos.forEach(todo => list.appendChild(createTodoCard(todo)));
    })
    .catch(() => {
      document.getElementById("todo-list").innerHTML =
        `<p style="color:red">Failed to load Todos</p>`;
    });
}

// ================= CREATE TODO CARD =================
function createTodoCard(todo) {
  const card = document.createElement("div");
  card.className = "todo-card";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isCompleted;

  const span = document.createElement("span");
  span.textContent = todo.title;

  // initial state
  if (todo.isCompleted) {
    span.style.textDecoration = "line-through";
    span.style.color = "#aaa";
  }

  checkbox.onchange = () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    span.style.color = checkbox.checked ? "#aaa" : "#000";

    updateTodoStatus({
      ...todo,
      isCompleted: checkbox.checked
    });
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => deleteTodo(todo.id);

  card.appendChild(checkbox);
  card.appendChild(span);
  card.appendChild(deleteBtn);

  return card;
}

// ================= ADD TODO =================
function addTodo() {
  const input = document.getElementById("new-todo");
  const title = input.value.trim();

  if (!title) return;

  fetch(`${SERVER_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      title: title,
      isCompleted: false
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to add todo");
      return res.json();
    })
    .then(() => {
      input.value = "";
      loadTodos();
    })
    .catch(err => alert(err.message));
}

// ================= UPDATE TODO =================
function updateTodoStatus(todo) {
  fetch(`${SERVER_URL}/todo/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(todo)
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update todo");
      
    })
    .catch(err => alert(err.message));
}

// ================= DELETE TODO =================
function deleteTodo(id) {
  fetch(`${SERVER_URL}/todo/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to delete todo");
      loadTodos();
    })
    .catch(err => alert(err.message));
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("todo-list")) {
    loadTodos();
  }
});
