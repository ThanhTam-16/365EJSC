
import './styles.css';

import iconImage from './assets/icon.svg';

import { 
  generateId, 
  saveTodos, 
  loadTodos, 
  showNotification,
  validateInput 
} from './utils.js';

class TodoApp {
  constructor() {
    this.todos = loadTodos(); // Load từ localStorage
    this.init();
  }

  init() {
    console.log('Todo App initialized with Webpack!');
    console.log('Webpack đã bundle tất cả modules lại!');
    
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');

    // Thêm todo khi click button
    addBtn.addEventListener('click', () => this.addTodo());

    // Thêm todo khi nhấn Enter
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.addTodo();
      }
    });
  }

  addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    const validation = validateInput(text);
    if (!validation.valid) {
      showNotification(validation.message, 'error');
      return;
    }

    // Tạo todo mới
    const newTodo = {
      id: generateId(),
      text: text,
      completed: false,
      createdAt: Date.now()
    };

    // Thêm vào array
    this.todos.push(newTodo);
    
    // Lưu vào localStorage
    saveTodos(this.todos);
    
    // Clear input
    input.value = '';
    
    // Re-render
    this.render();
    
    // Show notification
    showNotification('Đã thêm công việc!');
  }

  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveTodos(this.todos);
      this.render();
      showNotification(
        todo.completed ? 'Đã hoàn thành!' : 'Chưa hoàn thành',
        'success'
      );
    }
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    saveTodos(this.todos);
    this.render();
    showNotification('Đã xóa công việc!', 'error');
  }

  render() {
    const todoList = document.getElementById('todoList');
    
    // Nếu không có todo nào
    if (this.todos.length === 0) {
      todoList.innerHTML = `
        <li class="empty-state">
          Chưa có công việc nào. Hãy thêm công việc đầu tiên!
        </li>
      `;
      return;
    }

    // Render danh sách todos
    todoList.innerHTML = this.todos.map(todo => `
      <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <span class="todo-text">${todo.text}</span>
        <div class="todo-actions">
          <button class="btn-complete" onclick="app.toggleComplete('${todo.id}')">
            ${todo.completed ? '↻' : '✓'}
          </button>
          <button class="btn-delete" onclick="app.deleteTodo('${todo.id}')">
            ✕
          </button>
        </div>
      </li>
    `).join('');
  }
}

// KHỞI TẠO APP
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TodoApp();

  // Log để kiểm tra Webpack hoạt động
  console.log('Webpack đã load thành công các modules:');
  console.log('   - styles.css ✓');
  console.log('   - utils.js ✓');
  console.log('   - icon.svg ✓');
  console.log('   - index.js (entry point) ✓');
});

// DEMO WEBPACK FEATURES
// Tự động reload khi code thay đổi
if (module.hot) {
  module.hot.accept();
  console.log('Hot Module Replacement is enabled!');
}