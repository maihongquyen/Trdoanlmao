const CACHE_NAME = 'tdoanf-bio-v1';

// Những file sẽ được lưu lại để đọc offline
const urlsToCache = [
  '/',
  '/index.html'
];

// Cài đặt Service Worker và lưu cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Đã mở cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Bắt các request tải trang và trả về từ cache nếu có
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Nếu tìm thấy trong cache, trả về luôn (truy cập offline)
        if (response) {
          return response;
        }
        // Nếu không có, bắt buộc phải dùng mạng để tải
        return fetch(event.request);
      })
  );
});
