 // Sample images data
        const images = [
            {
                src: 'img/6a3b60b2-a105-4619-8ec0-adf6732ec3ac_large.webp',
                title: 'Mountain Lake',
                description: 'Serene mountain lake reflection',
                category: 'nature'
            },
            {
                src: 'img/photo-1511818966892-d7d671e672a2.jpg',
                title: 'Modern Architecture',
                description: 'Contemporary building design',
                category: 'architecture'
            },
            {
                src: 'img/photo-1558591710-4b4a1ae0f04d.jpg',
                title: 'Abstract Art',
                description: 'Colorful abstract composition',
                category: 'abstract'
            },
            {
                src: 'img/sunset-futuristic-city-skyline-urban-landscape-twilight_952286-31460.jpg',
                title: 'City Skyline',
                description: 'Urban landscape at sunset',
                category: 'urban'
            },
            {
                src: 'img/photo-1441974231531-c6227db76b6e.jpg',
                title: 'Forest Path',
                description: 'Mystical forest walkway',
                category: 'nature'
            },
            {
                src: 'img/images.jpg',
                title: 'Glass Building',
                description: 'Reflective glass facade',
                category: 'architecture'
            },
            {
                src: 'img/photo-1578662996442-48f60103fc96.jpg',
                title: 'Geometric Patterns',
                description: 'Abstract geometric design',
                category: 'abstract'
            },
            {
                src: 'img/photo-1477959858617-67f85cf4f1df.jpg',
                title: 'City Lights',
                description: 'Vibrant urban nightlife',
                category: 'urban'
            },
            {
                src: 'img/Newsletter-V20_I2_wave.jpg',
                title: 'Ocean Waves',
                description: 'Powerful ocean waves',
                category: 'nature'
            }
        ];

        let currentImageIndex = 0;
        let filteredImages = [...images];

        
        function initGallery() {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '';

            images.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = `gallery-item visible`;
                galleryItem.dataset.category = image.category;
                galleryItem.dataset.index = index;

                galleryItem.innerHTML = `
                    <img src="${image.src}" alt="${image.title}" loading="lazy">
                    <div class="overlay">
                        <h3>${image.title}</h3>
                        <p>${image.description}</p>
                    </div>
                `;

                galleryItem.addEventListener('click', () => openLightbox(index));
                gallery.appendChild(galleryItem);
            });
        }

       
        function setupFilters() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    
                    filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filter = btn.dataset.filter;
                    filterGallery(filter);
                });
            });
        }

        function filterGallery(category) {
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            galleryItems.forEach((item, index) => {
                const itemCategory = item.dataset.category;
                
                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                    item.classList.add('hidden');
                }
            });

            
            if (category === 'all') {
                filteredImages = [...images];
            } else {
                filteredImages = images.filter(img => img.category === category);
            }
        }

        
        function openLightbox(index) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            
            currentImageIndex = index;
            lightboxImg.src = images[index].src;
            lightboxImg.alt = images[index].title;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            updateLightboxImage();
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            updateLightboxImage();
        }

        function updateLightboxImage() {
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = images[currentImageIndex].src;
            lightboxImg.alt = images[currentImageIndex].title;
        }

       
        function setupEventListeners() {
           
            document.querySelector('.close').addEventListener('click', closeLightbox);
            document.getElementById('lightbox').addEventListener('click', (e) => {
                if (e.target === e.currentTarget) {
                    closeLightbox();
                }
            });

           
            document.querySelector('.next').addEventListener('click', nextImage);
            document.querySelector('.prev').addEventListener('click', prevImage);

            
            document.addEventListener('keydown', (e) => {
                const lightbox = document.getElementById('lightbox');
                if (lightbox.classList.contains('active')) {
                    if (e.key === 'Escape') closeLightbox();
                    if (e.key === 'ArrowRight') nextImage();
                    if (e.key === 'ArrowLeft') prevImage();
                }
            });
        }

       
        document.addEventListener('DOMContentLoaded', () => {
            initGallery();
            setupFilters();
            setupEventListeners();
        });