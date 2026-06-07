const api = {
  baseURL: 'https://jsonplaceholder.typicode.com',
  async getUsers() {
    const response = await fetch(`${this.baseURL}/users`);
    if (!response.ok) throw new Error('Không thể tải danh sách user');
    return response.json();
  },
  async getUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`);
    if (!response.ok) throw new Error('Không tìm thấy user');
    return response.json();
  },
  async createUser(data) {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Tạo user thất bại');
    return response.json();
  },
  async updateUser(id, data) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Cập nhật user thất bại');
    return response.json();
  },
  async deleteUser(id) {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Xóa user thất bại');
    return response.text();
  },
};

const ui = {
  userTableBody: document.getElementById('userTableBody'),
  message: document.getElementById('message'),
  formTitle: document.getElementById('formTitle'),
  showLoading() {
    this.message.textContent = 'Đang tải dữ liệu...';
    this.message.style.color = '#2563eb';
  },
  hideLoading() {
    this.message.textContent = '';
  },
  showError(message) {
    this.message.textContent = message;
    this.message.style.color = '#dc2626';
  },
  showSuccess(message) {
    this.message.textContent = message;
    this.message.style.color = '#16a34a';
  },
  renderUsers(users) {
    const search = searchInput.value.trim().toLowerCase();
    const filtered = users.filter((user) => {
      return user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search);
    });
    this.userTableBody.innerHTML = filtered.map((user) => `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.company?.name || ''}</td>
        <td>
          <button class="action-btn edit" data-action="edit" data-id="${user.id}">Edit</button>
          <button class="action-btn delete" data-action="delete" data-id="${user.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  },
};

const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');
const userForm = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const companyInput = document.getElementById('companyInput');
const cancelEditBtn = document.getElementById('cancelEdit');

let users = [];

async function loadUsers() {
  try {
    ui.showLoading();
    users = await api.getUsers();
    ui.renderUsers(users);
    ui.showSuccess('Danh sách user đã được tải.');
  } catch (error) {
    ui.showError(error.message);
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  const id = userIdInput.value;
  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    company: { name: companyInput.value.trim() },
  };

  if (!payload.name || !payload.email || !payload.company.name) {
    ui.showError('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  try {
    ui.showLoading();
    if (id) {
      const updated = await api.updateUser(id, payload);
      users = users.map((user) => (user.id.toString() === id ? { ...user, ...updated } : user));
      ui.showSuccess('Cập nhật user thành công.');
    } else {
      const created = await api.createUser(payload);
      users.unshift(created);
      ui.showSuccess('Tạo user mới thành công.');
    }
    resetForm();
    ui.renderUsers(users);
  } catch (error) {
    ui.showError(error.message);
  }
}

function resetForm() {
  userIdInput.value = '';
  nameInput.value = '';
  emailInput.value = '';
  companyInput.value = '';
  ui.formTitle.textContent = 'Thêm user mới';
  cancelEditBtn.classList.add('hidden');
}

function handleTableClick(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const action = button.dataset.action;
  const id = button.dataset.id;
  if (action === 'edit') {
    const user = users.find((u) => u.id.toString() === id);
    if (!user) return;
    userIdInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    companyInput.value = user.company?.name || '';
    ui.formTitle.textContent = 'Cập nhật user';
    cancelEditBtn.classList.remove('hidden');
  }

  if (action === 'delete') {
    const confirmed = confirm('Xóa user này?');
    if (!confirmed) return;
    handleDeleteUser(id);
  }
}

async function handleDeleteUser(id) {
  try {
    ui.showLoading();
    await api.deleteUser(id);
    users = users.filter((user) => user.id.toString() !== id);
    ui.renderUsers(users);
    ui.showSuccess('Xóa user thành công.');
  } catch (error) {
    ui.showError(error.message);
  }
}

searchInput.addEventListener('input', () => ui.renderUsers(users));
refreshBtn.addEventListener('click', loadUsers);
userForm.addEventListener('submit', handleSubmit);
cancelEditBtn.addEventListener('click', resetForm);
ui.userTableBody.addEventListener('click', handleTableClick);

loadUsers();
