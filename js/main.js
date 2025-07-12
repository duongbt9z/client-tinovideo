// Tinovideo Main JavaScript

const API_MAIN_BASE_URL = 'http://localhost:5000';
// Language translations
const translations = {
    vi: {
        // Navigation
        'nav-features': 'Tính năng',
        'nav-process': 'Quy trình',
        'nav-testimonials': 'Đánh giá',
        'nav-dashboard': 'Dashboard',

        // Hero Section
        'hero-title-1': 'Tạo Video',
        'hero-title-2': 'AI Chuyên Nghiệp',
        'hero-title-3': 'chỉ trong vài phút',
        'hero-description': 'Chuyển đổi URL sản phẩm thành video quảng cáo ấn tượng với AI.<br>Giọng đọc tự nhiên, hiệu ứng chuyên nghiệp, template đa dạng.',
        'stat-videos': 'Video đã tạo',
        'stat-customers': 'Khách hàng hài lòng',
        'stat-templates': 'Template đa dạng',
        'stat-satisfaction': 'Độ hài lòng',
        'cta-create': 'Bắt Đầu Tạo Video',
        'cta-demo': 'Xem Demo',

        // Features Section
        'features-title': 'Tại sao chọn AI Video Creator?',
        'features-subtitle': 'Nền tảng tiên tiến nhất để tạo video quảng cáo chuyên nghiệp từ URL sản phẩm',
        'feature-ai-title': 'AI Tự Động',
        'feature-ai-desc': 'Tạo nội dung video từ URL sản phẩm một cách tự động và thông minh',
        'feature-speed-title': 'Nhanh Chóng',
        'feature-speed-desc': 'Tạo video chuyên nghiệp chỉ trong vài phút thay vì hàng giờ',
        'feature-effects-title': 'Hiệu Ứng Đẹp',
        'feature-effects-desc': 'Nhiều hiệu ứng chuyên nghiệp và template thiết kế đẹp mắt',
        'feature-platforms-title': 'Đa Nền Tảng',
        'feature-platforms-desc': 'Tối ưu cho TikTok, Instagram, YouTube và nhiều nền tảng khác',

        // Process Section
        'process-title': 'Chỉ cần 4 bước để có video chuyên nghiệp',
        'process-subtitle': 'Quy trình đơn giản và hiệu quả để tạo video AI chất lượng cao',
        'step-1-title': 'Nhập URL',
        'step-1-desc': 'Dán link sản phẩm từ Shopee, TikTok Shop, Lazada...',
        'step-2-title': 'Chọn Giọng',
        'step-2-desc': 'Lựa chọn giọng đọc AI phù hợp từ bộ sưu tập đa dạng',
        'step-3-title': 'Tạo Kịch Bản',
        'step-3-desc': 'Tạo kịch bản video,Viết câu Hook mở đầu video',
        'step-4-title': 'Tạo Video',
        'step-4-desc': 'Tải video chất lượng cao và chia sẻ ngay lập tức',
        'step-5-title': 'Xuất Video',
        'step-5-desc': 'Tải video chất lượng cao và chia sẻ ngay lập tức',

        // Testimonials Section
        'testimonials-title': 'Khách hàng nói gì về chúng tôi?',
        'testimonials-subtitle': 'Hơn 5,000 khách hàng đã tin tưởng và sử dụng Tinovideo',
        'testimonial-1-content': '"Tinovideo đã giúp tôi tăng doanh số bán hàng gấp 3 lần. Video AI tạo ra rất chuyên nghiệp và ấn tượng!"',
        'testimonial-1-name': 'Anh Nguyễn',
        'testimonial-1-role': 'Chủ shop online',
        'testimonial-2-content': '"Rất dễ sử dụng và tiết kiệm thời gian. Chỉ vài phút là có video marketing cực đẹp cho sản phẩm."',
        'testimonial-2-name': 'Linh Tran',
        'testimonial-2-role': 'Marketing Manager',
        'testimonial-3-content': '"AI voice tự nhiên quá! Khách hàng của tôi thường xuyên hỏi ai là người lồng tiếng cho video."',
        'testimonial-3-name': 'Minh Châu',
        'testimonial-3-role': 'Content Creator',

        // Final CTA Section
        'final-cta-title': 'Sẵn sàng tạo video ấn tượng?',
        'final-cta-subtitle': 'Bắt đầu miễn phí ngay hôm nay - Không cần thẻ tín dụng',
        'final-cta-free': 'Bắt Đầu Miễn Phí',
        'final-cta-pricing': 'Xem Bảng Giá',

        // Footer
        'footer-description': 'Nền tảng tạo video AI hàng đầu từ URL thương mại điện tử',
        'footer-product': 'Sản phẩm',
        'footer-features': 'Tính năng',
        'footer-templates': 'Templates',
        'footer-pricing': 'Bảng giá',
        'footer-api': 'API',
        'footer-support': 'Hỗ trợ',
        'footer-help': 'Trợ giúp',
        'footer-docs': 'Tài liệu',
        'footer-contact': 'Liên hệ',
        'footer-community': 'Cộng đồng',
        'footer-company': 'Công ty',
        'footer-about': 'Về chúng tôi',
        'footer-blog': 'Blog',
        'footer-careers': 'Tuyển dụng',
        'footer-privacy': 'Chính sách',
        'footer-copyright': '© 2025 Tinovideo. Tất cả quyền được bảo lưu.',

        // Demo Modal
        'demo-title': 'Demo Video - Tinovideo AI',
        'demo-placeholder': 'Video demo sẽ được phát ở đây'
    },
    en: {
        // Navigation
        'nav-features': 'Features',
        'nav-process': 'Process',
        'nav-testimonials': 'Reviews',
        'nav-dashboard': 'Dashboard',

        // Hero Section
        'hero-title-1': 'Create',
        'hero-title-2': 'Professional AI Videos',
        'hero-title-3': 'in minutes',
        'hero-description': 'Transform e-commerce URLs into stunning promotional videos with AI.<br>Natural voice-over, professional effects, diverse templates.',
        'stat-videos': 'Videos Created',
        'stat-customers': 'Happy Customers',
        'stat-templates': 'Diverse Templates',
        'stat-satisfaction': 'Satisfaction Rate',
        'cta-create': 'Start Creating Videos',
        'cta-demo': 'Watch Demo',

        // Features Section
        'features-title': 'Why choose AI Video Creator?',
        'features-subtitle': 'The most advanced platform to create professional promotional videos from product URLs',
        'feature-ai-title': 'AI Automation',
        'feature-ai-desc': 'Automatically and intelligently create video content from product URLs',
        'feature-speed-title': 'Fast',
        'feature-speed-desc': 'Create professional videos in minutes instead of hours',
        'feature-effects-title': 'Beautiful Effects',
        'feature-effects-desc': 'Many professional effects and beautifully designed templates',
        'feature-platforms-title': 'Multi-Platform',
        'feature-platforms-desc': 'Optimized for TikTok, Instagram, YouTube and many other platforms',

        // Process Section
        'process-title': 'Just 4 steps to professional videos',
        'process-subtitle': 'Simple and effective process to create high-quality AI videos',
        'step-1-title': 'Enter URL',
        'step-1-desc': 'Paste product link from Shopee, TikTok Shop, Lazada...',
        'step-2-title': 'Choose Voice',
        'step-2-desc': 'Select suitable AI voice from diverse collection',
        'step-3-title': 'Customize',
        'step-3-desc': 'Choose templates, effects and customize as desired',
        'step-4-title': 'Export Video',
        'step-4-desc': 'Download high-quality video and share instantly',

        // Testimonials Section
        'testimonials-title': 'What do customers say about us?',
        'testimonials-subtitle': 'Over 5,000 customers have trusted and used Tinovideo',
        'testimonial-1-content': '"Tinovideo helped me triple my sales. The AI videos are very professional and impressive!"',
        'testimonial-1-name': 'Anh Nguyen',
        'testimonial-1-role': 'Online Shop Owner',
        'testimonial-2-content': '"Very easy to use and time-saving. Just a few minutes to get beautiful marketing videos for products."',
        'testimonial-2-name': 'Linh Tran',
        'testimonial-2-role': 'Marketing Manager',
        'testimonial-3-content': '"The AI voice is so natural! My customers often ask who is the voice-over artist for the videos."',
        'testimonial-3-name': 'Minh Chau',
        'testimonial-3-role': 'Content Creator',

        // Final CTA Section
        'final-cta-title': 'Ready to create impressive videos?',
        'final-cta-subtitle': 'Start free today - No credit card required',
        'final-cta-free': 'Start Free',
        'final-cta-pricing': 'View Pricing',

        // Footer
        'footer-description': 'Leading AI video creation platform from e-commerce URLs',
        'footer-product': 'Product',
        'footer-features': 'Features',
        'footer-templates': 'Templates',
        'footer-pricing': 'Pricing',
        'footer-api': 'API',
        'footer-support': 'Support',
        'footer-help': 'Help',
        'footer-docs': 'Documentation',
        'footer-contact': 'Contact',
        'footer-community': 'Community',
        'footer-company': 'Company',
        'footer-about': 'About us',
        'footer-blog': 'Blog',
        'footer-careers': 'Careers',
        'footer-privacy': 'Privacy',
        'footer-copyright': '© 2025 Tinovideo. All rights reserved.',

        // Demo Modal
        'demo-title': 'Demo Video - Tinovideo AI',
        'demo-placeholder': 'Demo video will be played here'
    }
};

// Current language
let currentLanguage = 'vi';

// Language switching function
function switchLanguage(lang) {
    currentLanguage = lang;

    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });

    // Update all translatable elements
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        if (translations[lang] && translations[lang][key]) {
            if (element.innerHTML.includes('<br>')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Save language preference
    localStorage.setItem('tinovideo-language', lang);
}

// Demo modal functions
function playDemo() {
    document.getElementById('demoModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeDemoModal() {
    document.getElementById('demoModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
function playDemo() {
  /* 1️⃣  Xác định section muốn cuộn tới  */
  const processSection = document.querySelector('#process');

  /* 2️⃣  Cuộn mượt xuống (nếu tìm thấy)  */
  if (processSection) {
    processSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section > div').forEach(section => {
        observer.observe(section);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('bg-gray-900');
        } else {
            navbar.classList.remove('bg-gray-900');
        }

        lastScrollY = currentScrollY;
    });
}

// Loading animation
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<div class="loading-spinner mx-auto"></div>';
    element.disabled = true;

    return () => {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Toast notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full transition-transform duration-300`;

    switch (type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            break;
        default:
            toast.classList.add('bg-blue-500');
    }

    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Form validation
function validateUrl(url) {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
}

// Local storage utilities
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

function loadFromStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return null;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    /* ────────────────────────────────────────────────────────────── */
    /* 1.  Khởi tạo hiệu ứng có sẵn                                    */
    /* ────────────────────────────────────────────────────────────── */
    initSmoothScroll();
    initAnimations();
    initNavbarScroll();

    /* 2.  Ngôn ngữ giao diện                                          */
    const savedLang = localStorage.getItem('tinovideo-language') || 'vi';
    switchLanguage(savedLang);

    /* 3.  Xử lý modal DEMO                                            */
    const demoModal = document.getElementById('demoModal');
    if (demoModal) {
        demoModal.addEventListener('click', e => { if (e.target === demoModal) closeDemoModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDemoModal(); });
    }

    /* 4.  Hiệu ứng UI phụ                                             */
    document.querySelectorAll('#hero .bg-gray-800\\/50').forEach((stat, i) => {
        stat.style.animationDelay = `${i * 0.2}s`;
        stat.classList.add('animate-float');
    });
    document.querySelectorAll('#features .bg-gray-800\\/50').forEach(card => {
        card.addEventListener('mouseenter', () => card.classList.add('hover-glow'));
        card.addEventListener('mouseleave', () => card.classList.remove('hover-glow'));
    });

    /* ────────────────────────────────────────────────────────────── */
    /* 5.  Flow “Bắt đầu tạo video” + Google OAuth                     */
    /* ────────────────────────────────────────────────────────────── */

    // 1. Lắng nghe message từ popup
    window.addEventListener('message', ev => {
        // nếu không phải payload login thì bỏ qua
        if (!ev.data?.access_token) return;

        // Lưu JWT + email
        localStorage.setItem('jwt', ev.data.access_token);
        localStorage.setItem('email', ev.data.email ?? '');

        // Đóng popup (nếu còn)
        try { ev.source.close(); } catch { }

        // Chuyển trang
        window.location.href = '/dashboard.html';
    });

    // 2. Hàm mở popup khi bấm nút
    function handleCreateVideo(e) {
        e.preventDefault();

        if (localStorage.getItem('jwt')) {
            return window.location.href = '/dashboard.html';
        }

        const popup = window.open(
            `${API_MAIN_BASE_URL}/login/google/`,
            'google_login',
            'width=500,height=600'
        );
        if (!popup) {
            return alert('Popup bị chặn, vui lòng cho phép để đăng nhập.');
        }
    }


    // Gắn listener cho nút
    document.getElementById('btn-create-video')
        ?.addEventListener('click', handleCreateVideo);


   
    function initCtaListeners() {
        // Bắt tất cả thẻ có class .cta-create-video  +  nav-dashboard-link
        document
            .querySelectorAll('.btn-create-video, #nav-dashboard-link')
            .forEach(el => {
                el.addEventListener('click', handleCreateVideo);
            });
    }
    initCtaListeners();
});

console.log('Tinovideo website initialized successfully!');





// Export functions for external use
window.TinovideoApp = {
    switchLanguage,
    playDemo,
    closeDemoModal,
    showToast,
    validateUrl,
    saveToStorage,
    loadFromStorage,
    showLoading
};
