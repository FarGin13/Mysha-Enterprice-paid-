const categories = [
    { name: 'Mobile Phone', icon: 'smartphone', color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Home Appliances', icon: 'refrigerator', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Tablet & Accessories', icon: 'tablet-smartphone', color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Laptop', icon: 'laptop', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Smart Watch', icon: 'watch', color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'AirPods', icon: 'headphones', color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { name: 'Wireless Headphone', icon: 'headset', color: 'text-violet-500', bg: 'bg-violet-50' },
    { name: 'Speaker', icon: 'speaker', color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Cables', icon: 'cable', color: 'text-teal-500', bg: 'bg-teal-50' },
    { name: 'Adapter', icon: 'plug', color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Hubs & Docks', icon: 'hard-drive', color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'Wireless Charger', icon: 'zap', color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'Smart Pen', icon: 'pen-tool', color: 'text-pink-500', bg: 'bg-pink-50' },
    { name: 'Camera', icon: 'camera', color: 'text-red-500', bg: 'bg-red-50' },
];

const products = {
    trends: [
        { name: 'iPhone 15 Pro Max', price: 1199, oldPrice: 1299, discount: 8, image: 'technology/320x240/10', rating: 4.9, tag: 'Hot' },
        { name: 'Samsung Galaxy S24 Ultra', price: 1049, oldPrice: 1199, discount: 13, image: 'technology/320x240/20', rating: 4.8, tag: 'New' },
        { name: 'MacBook Air M3 15"', price: 1299, oldPrice: 1499, discount: 13, image: 'technology/320x240/30', rating: 4.9 },
        { name: 'AirPods Pro 2nd Gen', price: 199, oldPrice: 249, discount: 20, image: 'technology/320x240/40', rating: 4.7, tag: 'Best Seller' },
        { name: 'iPad Air M2', price: 599, oldPrice: 699, discount: 14, image: 'technology/320x240/50', rating: 4.8 },
        { name: 'Sony WH-1000XM5', price: 298, oldPrice: 399, discount: 25, image: 'technology/320x240/60', rating: 4.6, tag: 'Deal' },
        { name: 'Apple Watch Ultra 2', price: 749, oldPrice: 799, discount: 6, image: 'technology/320x240/70', rating: 4.9 },
        { name: 'Dell XPS 15', price: 1499, oldPrice: 1799, discount: 17, image: 'technology/320x240/80', rating: 4.5 },
        { name: 'Bose QC45 Headphones', price: 249, oldPrice: 329, discount: 24, image: 'technology/320x240/90', rating: 4.6 },
        { name: 'Samsung Galaxy Tab S9', price: 749, oldPrice: 899, discount: 17, image: 'technology/320x240/100', rating: 4.7 },
    ],
    deals: [
        { name: 'MacBook Pro 14" M3', price: 1599, oldPrice: 1999, discount: 20, image: 'technology/320x240/11', rating: 4.9, tag: 'Deal' },
        { name: 'iPhone 15 128GB', price: 699, oldPrice: 799, discount: 13, image: 'technology/320x240/21', rating: 4.7 },
        { name: 'Samsung Galaxy Buds2 Pro', price: 149, oldPrice: 229, discount: 35, image: 'technology/320x240/31', rating: 4.5, tag: 'Best Price' },
        { name: 'LG OLED C3 55"', price: 1296, oldPrice: 1599, discount: 19, image: 'technology/320x240/41', rating: 4.8 },
        { name: 'GoPro Hero 12 Black', price: 299, oldPrice: 399, discount: 25, image: 'technology/320x240/51', rating: 4.6, tag: 'Hot' },
        { name: 'PS5 Digital Edition', price: 399, oldPrice: 449, discount: 11, image: 'technology/320x240/61', rating: 4.8 },
        { name: 'Kindle Paperwhite', price: 119, oldPrice: 149, discount: 20, image: 'technology/320x240/71', rating: 4.7 },
        { name: 'Dyson V15 Detect', price: 549, oldPrice: 749, discount: 27, image: 'technology/320x240/81', rating: 4.6, tag: 'Deal' },
        { name: 'Nintendo Switch OLED', price: 299, oldPrice: 349, discount: 14, image: 'technology/320x240/91', rating: 4.8 },
        { name: 'Razer BlackWidow V4', price: 149, oldPrice: 199, discount: 25, image: 'technology/320x240/101', rating: 4.5 },
    ],
    selling: [
        { name: 'iPhone 14 Pro', price: 899, oldPrice: 999, discount: 10, image: 'technology/320x240/12', rating: 4.8, tag: 'Top' },
        { name: 'AirPods 3rd Gen', price: 149, oldPrice: 179, discount: 17, image: 'technology/320x240/22', rating: 4.6 },
        { name: 'Samsung Galaxy Watch 6', price: 279, oldPrice: 329, discount: 15, image: 'technology/320x240/32', rating: 4.7, tag: 'Top' },
        { name: 'Logitech MX Master 3S', price: 89, oldPrice: 99, discount: 10, image: 'technology/320x240/42', rating: 4.8 },
        { name: 'iPad Mini 6', price: 399, oldPrice: 499, discount: 20, image: 'technology/320x240/52', rating: 4.7, tag: 'Best Seller' },
        { name: 'JBL Charge 5', price: 139, oldPrice: 179, discount: 22, image: 'technology/320x240/62', rating: 4.6 },
        { name: 'ASUS ROG Strix G16', price: 1299, oldPrice: 1499, discount: 13, image: 'technology/320x240/72', rating: 4.5 },
        { name: 'Apple TV 4K', price: 129, oldPrice: 149, discount: 13, image: 'technology/320x240/82', rating: 4.7 },
        { name: 'Anker 737 Power Bank', price: 79, oldPrice: 109, discount: 28, image: 'technology/320x240/92', rating: 4.5, tag: 'Top' },
        { name: 'Sonos One Gen 2', price: 179, oldPrice: 219, discount: 18, image: 'technology/320x240/102', rating: 4.6 },
    ],
    arrival: [
        { name: 'iPhone 16 Pro Max', price: 1399, oldPrice: null, discount: 0, image: 'technology/320x240/13', rating: 5.0, tag: 'New' },
        { name: 'MacBook Pro M4 16"', price: 2499, oldPrice: null, discount: 0, image: 'technology/320x240/23', rating: 5.0, tag: 'New' },
        { name: 'Galaxy Z Fold 6', price: 1799, oldPrice: 1919, discount: 6, image: 'technology/320x240/33', rating: 4.8, tag: 'New' },
        { name: 'Pixel 9 Pro', price: 999, oldPrice: null, discount: 0, image: 'technology/320x240/43', rating: 4.7, tag: 'New' },
        { name: 'AirPods 4 ANC', price: 249, oldPrice: null, discount: 0, image: 'technology/320x240/53', rating: 4.9, tag: 'New' },
        { name: 'Apple Watch 10', price: 429, oldPrice: null, discount: 0, image: 'technology/320x240/63', rating: 4.8, tag: 'New' },
        { name: 'iPad Pro M4 13"', price: 1299, oldPrice: null, discount: 0, image: 'technology/320x240/73', rating: 4.9, tag: 'New' },
        { name: 'Surface Pro 11', price: 1199, oldPrice: 1349, discount: 11, image: 'technology/320x240/83', rating: 4.6, tag: 'New' },
        { name: 'Samsung Galaxy Buds3', price: 179, oldPrice: null, discount: 0, image: 'technology/320x240/93', rating: 4.5, tag: 'New' },
        { name: 'DJI Mini 4 Pro', price: 759, oldPrice: null, discount: 0, image: 'technology/320x240/103', rating: 4.7, tag: 'New' },
    ]
};

const brands = [
    'Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'Bose', 'Lenovo', 'Microsoft',
    'Google', 'JBL', 'ASUS', 'HP', 'Canon', 'Razer', 'Logitech', 'Dyson'
];

const reviews = [
    { name: 'Sarah M.', avatar: 'people/200x200/1', rating: 5, text: 'Amazing selection and super fast delivery! My new MacBook arrived in perfect condition. Will definitely shop again.' },
    { name: 'James K.', avatar: 'people/200x200/2', rating: 5, text: 'Best electronics store online. The customer service team helped me choose the perfect headphones. Great experience!' },
    { name: 'Priya R.', avatar: 'people/200x200/3', rating: 4, text: 'Love the EMI options — made it easy to get the iPad Pro I wanted. Quality products at competitive prices.' },
];

// ===== RENDER FUNCTIONS =====

function renderProductCard(product) {
    const hasDiscount = product.discount > 0;
    const tagColors = {
        'Hot': 'bg-red-500',
        'New': 'bg-emerald-500',
        'Deal': 'bg-brand-500',
        'Best Seller': 'bg-indigo-500',
        'Best Price': 'bg-brand-500',
        'Top': 'bg-violet-500',
    };

    return `
    <div class="product-card bg-white border border-dark-200 rounded-2xl overflow-hidden group cursor-pointer">
      <div class="relative overflow-hidden bg-dark-50 p-4 pb-2">
        ${product.tag ? `<span class="absolute top-3 left-3 ${tagColors[product.tag] || 'bg-brand-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded-lg z-10 uppercase tracking-wider">${product.tag}</span>` : ''}
        ${hasDiscount ? `<span class="discount-badge absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg z-10">-${product.discount}%</span>` : ''}
        <img src="http://static.photos/${product.image}" alt="${product.name}" class="w-full h-36 sm:h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <button class="quick-add-btn absolute bottom-4 left-1/2 -translate-x-1/2 bg-white hover:bg-brand-500 hover:text-white text-dark-800 text-xs font-semibold px-4 py-2 rounded-xl shadow-lg transition-all whitespace-nowrap flex items-center gap-1.5" aria-label="Add to cart">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
      </div>
      <div class="p-4">
        <div class="flex items-center gap-1 mb-1.5">
          ${Array.from({length: 5}, (_, i) => `<svg class="w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-dark-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`).join('')}
          <span class="text-xs text-dark-500 ml-1">${product.rating}</span>
        </div>
        <h3 class="text-sm font-semibold text-dark-800 mb-2 leading-snug line-clamp-2 min-h-[2.5rem]">${product.name}</h3>
        <div class="flex items-center gap-2">
          <span class="text-base font-bold text-dark-900">$${product.price}</span>
          ${product.oldPrice ? `<span class="text-sm text-dark-400 line-through">$${product.oldPrice}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderCategoryCard(cat) {
  return `
    <div class="category-card bg-white border border-dark-200 rounded-2xl p-4 flex flex-col items-center gap-2.5 cursor-pointer text-center">
      <div class="w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center">
        <i data-lucide="${cat.icon}" class="w-6 h-6 ${cat.color}"></i>
      </div>
      <span class="text-xs sm:text-sm font-medium text-dark-700 leading-tight">${cat.name}</span>
    </div>
  `;
}

function renderBrandCard(brand) {
  return `
    <div class="brand-card bg-white border border-dark-200 rounded-xl p-4 flex items-center justify-center cursor-pointer">
      <span class="brand-name text-sm font-bold text-dark-500 transition-colors">${brand}</span>
    </div>
  `;
}

function renderReviewCard(review) {
  return `
    <div class="review-card bg-white border border-dark-200 rounded-2xl p-6">
      <div class="flex items-center gap-1 mb-3">
        ${Array.from({length: 5}, (_, i) => `<svg class="w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-dark-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`).join('')}
      </div>
      <p class="text-sm text-dark-600 leading-relaxed mb-4">"${review.text}"</p>
      <div class="flex items-center gap-3">
        <img src="http://static.photos/${review.avatar}" alt="${review.name}" class="w-10 h-10 rounded-full object-cover" loading="lazy" />
        <span class="text-sm font-semibold text-dark-800">${review.name}</span>
      </div>
    </div>
  `;
}

// ===== INIT RENDERS =====
function initRenders() {
  // Categories
  const catGrid = document.getElementById('categoryGrid');
  if (catGrid) catGrid.innerHTML = categories.map(renderCategoryCard).join('');

  // New Arrival
  const arrivalGrid = document.getElementById('newArrivalGrid');
 arrivalGrid.innerHTML = products.arrival.slice(0, 5).map(renderProductCard).join('');

  // Brands
  const brandsGridEl = document.getElementById('brandsGrid');
  if (brandsGridEl) brandsGridEl.innerHTML = brands.map(renderBrandCard).join('');

  // Reviews
  const reviewsGridEl = document.getElementById('reviewsGrid');
  if (reviewsGridEl) reviewsGridEl.innerHTML = reviews.map(renderReviewCard).join('');

  // Re-init Lucide icons after dynamic content
  lucide.createIcons();
}

// ===== HERO CAROUSEL =====
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  let current = 0;
  let autoplayTimer;

  function goToSlide(index) {
    slides.forEach((s, i) => {
      s.style.opacity = i === index ? '1' : '0';
      s.style.pointerEvents = i === index ? 'auto' : 'none';
    });
    dots.forEach((d, i) => {
      d.className = i === index
        ? 'hero-dot w-2.5 h-2.5 rounded-full bg-brand-500 transition-all'
        : 'hero-dot w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/60 transition-all';
    });
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.dot));
      startAutoplay();
    });
  });

  goToSlide(0);
  startAutoplay();
}

// ===== FEATURED PRODUCTS TABS =====
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const featuredGrid = document.getElementById('featuredProductsGrid');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.tab;
      const data = tab === 'deals' ? products.deals : products.selling;
   featuredGrid.innerHTML = data.slice(0, 5).map(renderProductCard).join('');
      lucide.createIcons();
    });
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      // Re-init icons for mobile menu
      lucide.createIcons();
    });
  }
}

// ===== STICKY HEADER SHADOW =====
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('shadow-2xl');
    } else {
      header.classList.remove('shadow-2xl');
    }
  }, { passive: true });
}

// ===== MAIN INIT =====
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initRenders();
  initHeroCarousel();
  initTabs();
  initMobileMenu();
  initStickyHeader();
});