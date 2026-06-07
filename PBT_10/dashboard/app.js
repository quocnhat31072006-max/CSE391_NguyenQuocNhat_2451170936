const refreshBtn = document.getElementById('refreshBtn');
const widgetsContainer = document.getElementById('widgets');
const loadTimeEl = document.getElementById('loadTime');

const widgetDefinitions = [
  {
    title: 'Random Users',
    fetcher: async () => {
      const res = await fetch('https://randomuser.me/api/?results=5');
      if (!res.ok) throw new Error('Không tải được random users');
      const data = await res.json();
      return data.results.map((user) => ({ name: `${user.name.first} ${user.name.last}`, email: user.email }));
    },
    render: (data) => `
      <ul>
        ${data.map((item) => `<li>${item.name} — ${item.email}</li>`).join('')}
      </ul>
    `,
  },
  {
    title: 'Country Info',
    fetcher: async () => {
      const res = await fetch('https://restcountries.com/v3.1/name/vietnam?fullText=true');
      if (!res.ok) throw new Error('Không tải được country info');
      const data = await res.json();
      const country = data[0];
      return {
        name: country.name.common,
        capital: country.capital?.[0] || 'N/A',
        region: country.region,
        population: country.population,
      };
    },
    render: (data) => `
      <ul>
        <li><strong>Tên:</strong> ${data.name}</li>
        <li><strong>Thủ đô:</strong> ${data.capital}</li>
        <li><strong>Vùng:</strong> ${data.region}</li>
        <li><strong>Dân số:</strong> ${data.population.toLocaleString('vi-VN')}</li>
      </ul>
    `,
  },
  {
    title: 'Latest Posts',
    fetcher: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      if (!res.ok) throw new Error('Không tải được posts');
      return res.json();
    },
    render: (data) => `
      <ul>
        ${data.map((post) => `<li><strong>${post.title}</strong></li>`).join('')}
      </ul>
    `,
  },
];

function createWidget(index) {
  const widget = document.createElement('section');
  widget.className = 'widget';
  widget.id = `widget-${index}`;
  widget.innerHTML = `
    <h2>${widgetDefinitions[index].title}</h2>
    <div class="status loading">Loading...</div>
    <div class="content"></div>
  `;
  return widget;
}

function renderWidgets() {
  widgetsContainer.innerHTML = '';
  widgetDefinitions.forEach((_, index) => widgetsContainer.appendChild(createWidget(index)));
}

async function loadDashboard() {
  const startTime = Date.now();
  renderWidgets();
  loadTimeEl.textContent = 'Đang tải dữ liệu...';

  const promises = widgetDefinitions.map((widget) => widget.fetcher());
  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    const widget = document.getElementById(`widget-${index}`);
    const statusEl = widget.querySelector('.status');
    const contentEl = widget.querySelector('.content');

    if (result.status === 'fulfilled') {
      statusEl.textContent = 'Loaded successfully';
      statusEl.className = 'status success';
      contentEl.innerHTML = widgetDefinitions[index].render(result.value);
    } else {
      statusEl.textContent = `Error: ${result.reason.message}`;
      statusEl.className = 'status error';
      contentEl.textContent = 'Không thể hiển thị dữ liệu.';
    }
  });

  const elapsed = Date.now() - startTime;
  loadTimeEl.textContent = `Data loaded in ${elapsed} ms`;
}

refreshBtn.addEventListener('click', loadDashboard);

renderWidgets();
loadDashboard();
