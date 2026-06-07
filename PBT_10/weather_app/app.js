const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const statusEl = document.getElementById('status');
const historyList = document.getElementById('historyList');
const weatherCard = document.getElementById('weatherCard');
const cityNameEl = document.getElementById('cityName');
const weatherDescEl = document.getElementById('weatherDesc');
const weatherIconEl = document.getElementById('weatherIcon');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const timeEl = document.getElementById('time');

const historyKey = 'weatherAppHistory';
const iconMap = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌦️',
  53: '🌦️',
  55: '🌧️',
  56: '🌧️',
  57: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  66: '❄️',
  67: '❄️',
  71: '❄️',
  73: '❄️',
  75: '❄️',
  77: '❄️',
  80: '🌧️',
  81: '🌧️',
  82: '🌧️',
  85: '❄️',
  86: '❄️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
};

const descriptionMap = {
  0: 'Trời quang đãng',
  1: 'Ít mây',
  2: 'Trời mát',
  3: 'Nhiều mây',
  45: 'Sương mù nhẹ',
  48: 'Sương mù',
  51: 'Mưa phùn nhẹ',
  53: 'Mưa phùn',
  55: 'Mưa phùn nặng',
  56: 'Mưa đá nhẹ',
  57: 'Mưa đá',
  61: 'Mưa nhẹ',
  63: 'Mưa vừa',
  65: 'Mưa lớn',
  66: 'Mưa đá nhẹ',
  67: 'Mưa đá',
  71: 'Mưa tuyết nhẹ',
  73: 'Mưa tuyết',
  75: 'Mưa tuyết nặng',
  77: 'Mưa đá',
  80: 'Mưa rào nhẹ',
  81: 'Mưa rào',
  82: 'Mưa rào lớn',
  85: 'Tuyết rơi nhẹ',
  86: 'Tuyết rơi',
  95: 'Giông bão',
  96: 'Giông mưa đá',
  99: 'Giông mưa đá lớn',
};

function setStatus(text, type = '') {
  statusEl.textContent = text;
  statusEl.className = type ? `status ${type}` : 'status';
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  historyList.innerHTML = history
    .map((city) => `<li data-city="${city}">${city}</li>`)
    .join('');
}

function updateHistory(city) {
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  const normalized = city.trim();
  const next = [normalized, ...history.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 5);
  localStorage.setItem(historyKey, JSON.stringify(next));
  renderHistory();
}

async function fetchGeo(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=vi`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Lỗi khi tìm vị trí');
  const result = await response.json();
  if (!result.results || !result.results.length) throw new Error('Không tìm thấy thành phố');
  return result.results[0];
}

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Lỗi khi tải dữ liệu thời tiết');
  return response.json();
}

function findHumidity(data) {
  if (!data.hourly || !data.hourly.time || !data.hourly.relativehumidity_2m) return null;
  const currentTime = data.current_weather.time;
  const index = data.hourly.time.indexOf(currentTime);
  return index >= 0 ? data.hourly.relativehumidity_2m[index] : data.hourly.relativehumidity_2m[0];
}

function renderWeatherCard(city, weather, humidity) {
  cityNameEl.textContent = `${city}, ${weather.timezone}`;
  const code = weather.weathercode;
  weatherDescEl.textContent = descriptionMap[code] || 'Thời tiết không xác định';
  weatherIconEl.textContent = iconMap[code] || '🌈';
  temperatureEl.textContent = `${weather.temperature.toFixed(1)}°C`;
  humidityEl.textContent = humidity !== null ? `${humidity}%` : 'Không có dữ liệu';
  windSpeedEl.textContent = `${weather.windspeed.toFixed(1)} km/h`;
  timeEl.textContent = new Date(weather.time).toLocaleString('vi-VN');
  weatherCard.classList.remove('hidden');
}

async function loadWeather(city) {
  try {
    setStatus('Đang tải...', '');
    weatherCard.classList.add('hidden');
    const location = await fetchGeo(city);
    const data = await fetchWeather(location.latitude, location.longitude);
    const humidity = findHumidity(data);
    renderWeatherCard(location.name, data.current_weather, humidity);
    setStatus('Tải thời tiết thành công.', '');
    updateHistory(location.name);
  } catch (error) {
    weatherCard.classList.add('hidden');
    setStatus(error.message || 'Có lỗi xảy ra.', 'error');
  }
}

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  loadWeather(city);
});

historyList.addEventListener('click', (event) => {
  const target = event.target.closest('li');
  if (!target) return;
  const city = target.dataset.city;
  cityInput.value = city;
  loadWeather(city);
});

renderHistory();
