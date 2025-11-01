
export function generateId() {
  return Date.now() + Math.random().toString(36).substr(2, 9);
}

export function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function loadTodos() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

export function showNotification(message, type = 'success') {
  // Tạo notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Styling
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#28a745' : '#dc3545'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    z-index: 1000;
    animation: slideInRight 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

/**
 * Format date
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Validate input
 */
export function validateInput(text) {
  if (!text || text.trim() === '') {
    return { valid: false, message: 'Vui lòng nhập nội dung!' };
  }
  if (text.length > 100) {
    return { valid: false, message: 'Nội dung quá dài (tối đa 100 ký tự)!' };
  }
  return { valid: true };
}