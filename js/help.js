const helpTranslations = {
  "vi": {
    "nav-settings": "Cài Đặt ",
    "tinovideo": "Tinovideo",
    "nav-create": "Tạo Video Mới",
    "nav-templates": "Edit Video",
    "nav-affiliate": "Affiliate",
    "nav-help": "Trợ giúp",
    "help-title": "Trung tâm trợ giúp",
    "help-subtitle": "Tìm câu trả lời cho mọi thắc mắc của bạn",
    "help-search": "🔍 Tìm kiếm câu hỏi, hướng dẫn...",
    "tab-faq": "❓ Câu hỏi thường gặp",
    "tab-video": "📽️ Video hướng dẫn",
    "tab-docs": "📄 Tài liệu",
    "tab-contact": "💬 Liên hệ",
    "filter-all": "Tất cả",
    "filter-start": "Bắt đầu",
    "filter-feature": "Tính năng",
    "filter-edit": "Chỉnh sửa",
    "filter-export": "Xuất video",
    "filter-payment": "Thanh toán",
    "filter-support": "Hỗ trợ",
    "faq-q1": "Làm thế nào để tạo video từ URL sản phẩm?",
    "faq-a1": "Bạn chỉ cần dán URL sản phẩm vào ô tạo video, hệ thống sẽ tự động trích xuất thông tin để dựng video.",
    "faq-q2": "Có bao nhiêu giọng đọc AI khác nhau?",
    "faq-a2": "Hiện tại có hơn 20 giọng đọc AI khác nhau, bao gồm cả tiếng Việt và các ngôn ngữ khác.",
    "faq-q3": "Video có thể xuất ở những định dạng nào?",
    "faq-a3": "Hệ thống hỗ trợ xuất video ở định dạng MP4 (1080x1920) phù hợp với TikTok, Reels và Shorts.",
    "faq-q4": "Tôi có thể chỉnh sửa video sau khi tạo không?",
    "faq-a4": "Có, bạn có thể chỉnh sửa văn bản, ảnh và hiệu ứng sau khi tạo video.",
    "faq-q5": "Gói miễn phí có giới hạn gì?",
    "faq-a5": "Gói miễn phí được giới hạn số lượng video tạo mỗi ngày và không có quyền truy cập vào giọng đọc cao cấp.",
    "faq-q6": "Làm sao để liên hệ hỗ trợ?",
    "faq-a6": "Bạn có thể liên hệ qua mục 'Liên hệ' trên trang hoặc gửi email đến support@yourapp.com.",
    "contact-chat": "Chat trực tiếp",
    "contact-email": "Email",
    "contact-hotline": "Hotline",
    "doc-guide": "Hướng dẫn sử dụng",
    "doc-api": "API Documentation",
    "doc-practice": "Best Practices"
  },
  "en": {
       "nav-settings": "Settings ",
    "tinovideo": "Tinovideo",
    "nav-create": "Create New Video",
    "nav-templates": "Edit Video",
    "nav-affiliate": "Affiliate",
     "nav-help": "help",
     
    "help-title": "Help Center",
    "help-subtitle": "Find answers to all your questions",
    "help-search": "🔍 Search questions, guides...",
    "tab-faq": "❓ FAQs",
    "tab-video": "📽️ Video Tutorials",
    "tab-docs": "📄 Documentation",
    "tab-contact": "💬 Contact",
    "filter-all": "All",
    "filter-start": "Getting Started",
    "filter-feature": "Features",
    "filter-edit": "Editing",
    "filter-export": "Export",
    "filter-payment": "Payment",
    "filter-support": "Support",
    "faq-q1": "How to create a video from product URL?",
    "faq-a1": "Just paste the product URL into the create box, the system will automatically extract info and build the video.",
    "faq-q2": "How many AI voices are available?",
    "faq-a2": "There are over 20 AI voices including Vietnamese and other languages.",
    "faq-q3": "What formats can I export video in?",
    "faq-a3": "Videos can be exported as MP4 (1080x1920), perfect for TikTok, Reels, and Shorts.",
    "faq-q4": "Can I edit a video after creating it?",
    "faq-a4": "Yes, you can edit text, images, and effects after video creation.",
    "faq-q5": "Are there limitations on free plan?",
    "faq-a5": "Free plan limits daily video creations and doesn’t allow premium AI voices.",
    "faq-q6": "How can I contact support?",
    "faq-a6": "You can use the 'Contact' tab or email support@yourapp.com.",
    "contact-chat": "Live Chat",
    "contact-email": "Email",
    "contact-hotline": "Hotline",
    "doc-guide": "User Guide",
    "doc-api": "API Documentation",
    "doc-practice": "Best Practices"
  }
};
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.display = "none"; 
  }
}
function switchLanguage(lang) {
  localStorage.setItem('tinovideo-language', lang);
  const t = helpTranslations[lang];
   document.querySelectorAll('.lang-btn').forEach(btn => {
     if (btn.dataset.lang === lang) {
            btn.style.display = 'none'; // ẩn nút hiện tại
        } else {
            btn.style.display = 'inline-block'; // hiện nút còn lại
        }
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (!t[key]) return;

    // if (el.tagName === 'INPUT') {
    //   el.placeholder = t[key];
    // } else {
    //   el.textContent = t[key];
    // }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('tinovideo-language') || 'vi';
  switchLanguage(savedLang);
});

   const faqItems = document.querySelectorAll('.faq-item');
    const filterButtons = document.querySelectorAll('.filter');
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        const keyword = searchInput.value.toLowerCase().trim();

        // Nếu không nhập gì → hiện lại tất cả
        if (keyword === "") {
            faqItems.forEach(item => item.style.display = 'block');
            return;
        }

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const match = question.includes(keyword) || answer.includes(keyword);
            item.style.display = match ? 'block' : 'none';
        });

    });


    filterButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Cập nhật nút đang active
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.textContent.trim() === "Tất cả") {
                // Hiển thị tất cả
                faqItems.forEach(item => item.style.display = 'block');
            } else {
                // Hiển thị đúng 1 câu hỏi tương ứng
                faqItems.forEach((item, i) => {
                    item.style.display = (i === index - 1) ? 'block' : 'none';
                });
            }
        });
    });
    function toggleFAQ(clickedItem) {
        // Đóng tất cả mục đang mở
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== clickedItem) {
                item.classList.remove('active');
            }
        });

        // Toggle mục vừa bấm
        clickedItem.classList.toggle('active');
    }

    const tabs = document.querySelectorAll('.tab');
    const sections = {
        'tab-faq': document.getElementById('faq-section'),
        'tab-video': document.getElementById('video-section'),
        'tab-docs': document.getElementById('docs-section'),
        'tab-contact': document.getElementById('contact-section')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // remove active on all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // hide all sections
            Object.values(sections).forEach(sec => sec.style.display = 'none');

            // show current
            const sectionId = tab.id;
            const showSection = sections[sectionId];
            if (showSection) {
                showSection.style.display = (sectionId === 'tab-contact') ? 'flex' : 'block';
            }
        });
    });
    const btn = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");

    btn.addEventListener("click", () => {
        if (sidebar.style.display === "none") {
            sidebar.style.display = "block"; // Hoặc "flex", tùy bạn muốn hiện như thế nào
        } else {
            sidebar.style.display = "none";
        }
    });
    let cachedUser = null;
    const API_BASE_URL = 'https://admin.tinovideo.com';
    function fillDataUser(user) {
        const nameDiv = document.querySelector('[data-key="user-name"]');
        if (nameDiv) nameDiv.textContent = user.name;

        const point = document.querySelector('[data-key="point"]');
        if (point) point.textContent = user.point;

        const avatarImg = document.querySelector('[data-key="user-avatar"]');
        if (avatarImg) avatarImg.src = user.avatar;

        const userPlan = document.querySelector('[data-key="user-plan"]');
        // if (userPlan) userPlan.textContent = user.plan || "Chưa có gói";
        const claimedPlans = [
            user.free_claimed && "Free",
            user.standard_claimed && "Standard",
            user.pro_claimed && "Pro",
            user.max_claimed && "Max"
        ].filter(Boolean);

        let highestPlan = "Chưa có gói";
        const PLAN_PRIORITY = ["Max", "Pro", "Standard", "Free"];
        for (const plan of PLAN_PRIORITY) {
            if (claimedPlans.includes(plan)) {
                highestPlan = plan;
                break;
            }
        }

        if (userPlan) userPlan.textContent = user.role;
        const userMoney = document.querySelector('[data-key="user-money"]');
        if (userMoney) if (!user.money) {
            userMoney.textContent = "Chưa có hoa hồng";
        } else {
            userMoney.textContent = user.money + ".000 VNĐ";
        }
        const userShare = document.querySelector('[data-key="user-share"]');
        if (userShare) userShare.textContent = user.user_share + " Người" || "Chưa có người giới thiệu ";
        // console.log("✅ User đã fill:", user);
    }

    async function getUserInfoOnce() {
        if (cachedUser) return cachedUser;

        const authData = localStorage.getItem("auth_data");
        if (authData) {
            cachedUser = JSON.parse(authData);
            fillDataUser(cachedUser);  // ✅ gọi đúng
            return cachedUser;
        }

        const token = localStorage.getItem("jwt");
        if (!token) return null;

        try {
            const res = await fetch(`${API_BASE_URL}/api/user`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                cachedUser = data.user;
                localStorage.setItem("auth_data", JSON.stringify(data.user));
                fillDataUser(cachedUser);  // ✅ truyền đúng user
                return cachedUser;
            } else {
                console.warn("❌ Không lấy được thông tin user:", data.error);
                return null;
            }
        } catch (err) {
            console.error("❌ Lỗi kết nối:", err);
            return null;
        }
    }
    document.querySelectorAll('.tab').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    window.addEventListener("DOMContentLoaded", async () => {
        const user = await getUserInfoOnce();
        if (user) {
            // Sau khi fill xong thì lưu userId để chia sẻ link
            localStorage.setItem("userId", user.id);
        }
        const upgradeBtn = document.querySelector(".upgrade-btn");
        if (upgradeBtn) {
            upgradeBtn.addEventListener("click", () => {
                window.location.href = "subscribe.html";
            });
        }
    }); const token = localStorage.getItem('jwt');
    if (!token) {
        window.location.href = "index.html";
    } else {
        // Gửi request xác thực token
        fetch(`${API_BASE_URL}/api/user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.success) {
                    // ❌ Token không hợp lệ → xóa và về trang login
                    localStorage.removeItem('jwt');
                    localStorage.removeItem('auth_data');
                    window.location.href = "index.html";
                } else {
                    // ✅ Token hợp lệ → tiếp tục
                    fillDataUser(data.user);
                }
            })
            .catch(err => {
                console.error("Lỗi xác thực token:", err);
                localStorage.removeItem('jwt');
                localStorage.removeItem('auth_data');
                window.location.href = "index.html";
            });
    }

