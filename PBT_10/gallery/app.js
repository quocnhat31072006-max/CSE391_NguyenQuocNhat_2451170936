const gallery = document.getElementById('gallery');
const loadingIndicator = document.getElementById('loadingIndicator');
const loadTrigger = document.getElementById('loadTrigger');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

let page = 1;
let isLoading = false;
const photosPerPage = 20;
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
    observer.unobserve(img);
  });
}, { rootMargin: '100px' });

const triggerObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !isLoading) {
    loadMorePhotos();
  }
}, { threshold: 0.2 });

async function fetchPhotos(pageNumber) {
  const url = `https://picsum.photos/v2/list?page=${pageNumber}&limit=${photosPerPage}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Không thể tải ảnh');
  return response.json();
}

function createPhotoCard(photo) {
  const card = document.createElement('div');
  card.className = 'card';
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/400/300`;
  card.innerHTML = `
    <img data-src="${thumbnailUrl}" alt="${photo.author}" loading="lazy">
    <div class="caption">${photo.author}</div>
  `;
  const img = card.querySelector('img');
  imageObserver.observe(img);
  card.addEventListener('click', () => {
    lightboxImage.src = photo.download_url;
    lightboxImage.alt = photo.author;
    lightbox.classList.remove('hidden');
  });
  return card;
}

async function loadMorePhotos() {
  isLoading = true;
  loadingIndicator.classList.remove('hidden');
  try {
    const photos = await fetchPhotos(page);
    photos.forEach((photo) => gallery.appendChild(createPhotoCard(photo)));
    page += 1;
  } catch (error) {
    loadingIndicator.textContent = error.message;
  } finally {
    loadingIndicator.classList.add('hidden');
    isLoading = false;
  }
}

closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightboxImage.src = '';
});
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    lightbox.classList.add('hidden');
    lightboxImage.src = '';
  }
});

triggerObserver.observe(loadTrigger);
loadMorePhotos();
