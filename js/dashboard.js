const API_BASE_URL = 'https://admin.tinovideo.com';
let currentStep = 1;
let selectedVoice = null;
let uploadedImages = [];
let projectData = {
    url: '',
    text: '',
    voice: null,
    template: null,
    settings: {
        speed: 1,
        pitch: 0,
        volume: 80,
        music: 'none',
        textStyle: 'modern',
        transition: 'fade',
        duration: 30
    }
};
let allVoices = [];

const dashboardTranslations = {
    "vi": {
        "nav-create-veo": "Tạo video veo",
        "-vi-75cb": "🇻🇳 VI",
        "-en-1b8b": "🇺🇸 EN",
        "tinovideo-bd7c": "Tinovideo",
        "-0985": "☰",
        "-864a": "|",
        "1-6c96": "1",
        "2-efd6": "2",
        "3-f74e": "3",
        "4-3c81": "4",
        "5-f5dc": "5",
        "15s-1a65": "15s",
        "30s-fbdb": "30s",
        "60s-e055": "60s",
        "tất-cả-fdff": "Tất cả",
        "quảng-cáo-9c1e": "Quảng cáo",
        "đánh-giá-53a7": "Đánh giá",
        "kể-chuyện-41bd": "Kể chuyện",
        "mẹo-nhanh-bb29": "Mẹo nhanh",
        "giới-tính-fddb": "Giới tính",
        "tất-cả-7368": "Tất cả",
        "nam-f5d3": "Nam",
        "nữ-de04": "Nữ",
        "cảm-xúc-e1d3": "Cảm xúc",
        "tất-cả-c501": "Tất cả",
        "vui-vẻ-8e8d": "Vui vẻ",
        "nghi-ngờ-3177": "nghi ngờ",
        "buồn-bã-8edc": "buồn bã",
        "cấp-bách-84a8": "cấp bách",
        "wow-ad8f": "Wow",
        "tức-tối-e63a": "Tức tối",
        "-chọn-câu-mở-đầu--2b23": "-- Chọn câu mở đầu --",
        "chào-bạn-đây-là-sản-phẩm-đang-rất-hot-tr-6e72": "Chào\n                                                bạn! Đây là sản phẩm đang rất hot trên thị trường.",
        "bạn-đang-tìm-một-giải-pháp-hiệu-quả-hãy--cb30": "Bạn đang tìm một giải pháp hiệu quả? Hãy xem ngay sản phẩm này!",
        "hôm-nay-mình-sẽ-review-một-sản-phẩm-cực--d7aa": "Hôm\n                                                nay mình sẽ review một sản phẩm cực kỳ đáng chú ý.",
        "cùng-khám-phá-điều-đặc-biệt-ở-sản-phẩm-n-12e1": "Cùng khám\n                                                phá điều đặc biệt ở sản phẩm này nhé!",
        "đừng-bỏ-lỡ-đây-có-thể-là-thứ-bạn-đang-cầ-b497": "Đừng bỏ lỡ, đây\n                                                có thể là thứ bạn đang cần!",
        "0-5f31": "0%",
        "1280x720-0975": "1280x720",
        "1920x1080-2b62": "1920x1080",
        "3840x2160-674e": "3840x2160",
        "mp4-khuyến-nghị-2dda": "MP4 (Khuyến nghị)",
        "mov-1e90": "MOV",
        "avi-96ef": "AVI",
        "dự-án-của-tôi-e9e2": "Dự Án Của Tôi",
        "danh-sách-các-dự-án-của-bạn-sẽ-hiển-thị--18fb": "Danh sách các dự án của bạn sẽ hiển thị tại đây.",
        "chỉnh-sửa-video-của-bạn-5600": "Chỉnh sửa video của bạn",
        "affiliate-a712": "Affiliate",
        "thông-tin-chương-trình-affiliate-link-gi-a5ce": "Thông tin chương trình affiliate & link giới thiệu.",
        "cài-đặt-966b": "Cài Đặt",
        "thay-đổi-tùy-chọn-cá-nhân-của-bạn-ở-đây-5f5a": "Thay đổi tùy chọn cá nhân của bạn ở đây.",
        "trợ-giúp-27e9": "Trợ Giúp",
        "các-câu-hỏi-thường-gặp-và-hỗ-trợ-7fa1": "Các câu hỏi thường gặp và hỗ trợ.",
        "nav-create": "Tạo Video Mới",
        "nav-templates": "Edit Video",
        "nav-affiliate": "Affiliate",
        "nav-settings": "Cài Đặt",
        "nav-help": "Trợ giúp",
        "user-plan": "Chưa có gói ",
        "credits-remaining": "Credits còn lại:",
        "point": "100",
        "upgrade-btn": "Nâng cấp",
        "main-title": "Tạo Video AI",
        "step-1-title": "Nhập Nội Dung",
        "step-2-title": "Chọn Giọng Đọc AI",
        "step-3-title": "Tạo Kịch Bản",
        "step-4-title": "Tạo Video",
        "step-5-title": "Xuất Video",
        "step-1-main-title": "Bước 1: Nhập Nội Dung\n                                    Sản Phẩm",
        "step-1-description": "Nhập URL sản phẩm hoặc văn\n                                    bản nội dung để tạo video",
        "url-label": "URL Sản\n                                            phẩm",
        "analyze-btn": "Phân\n                                                    tích",
        "supported-platforms": "Nền tảng\n                                            được hỗ trợ:",
        "images-label": "Hình ảnh\n                                            bổ sung (tuỳ chọn)",
        "upload-title": "Kéo thả hoặc\n                                                nhấp để tải lên",
        "upload-desc": "Hỗ trợ JPG, PNG, WEBP. Tối\n                                                đa 10 hình.",
        "text-label": "Nội dung văn\n                                            bản",
        "reset-btn": "Đặt lại",
        "next-btn": "Tiếp theo: Chọn giọng đọc",
        "step-2-main-title": "Bước 2: Chọn Giọng Đọc\n                                    AI",
        "step-2-description": "Lựa chọn giọng đọc phù hợp\n                                    cho video của bạn",
        "all-voices": "Tất cả",
        "male-voices": "Giọng Nam",
        "female-voices": "Giọng Nữ",
        "video-duration": "Thời lượng\n                                        video",
        "previous-btn": "Quay\n                                        lại",
        "next-create-btn": "Tiếp theo: mở đầu",
        "prompt-main-title": "Bước 3: Chọn Kịch Bản",
        "prompt-desc": "Chọn mẫu kịch bản phù hợp hoặc tạo\n                                    mới để AI dựng video",
        "sample-text-title": "Kịch bản\n                                        của bạn",
        "sample-text-placeholder": "Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Đây là giọng đọc AI từ phần mềm Ti Nô Video, được thiết kế nhằm mang đến trải nghiệm nghe tự nhiên và dễ chịu nhất.",
        "preview-voice": "Tạo kịch\n                                            bản",
        "step-3-main-title": "Bước 5: Tạo AI Video",
        "transitions": "Chọn cảm xúc\n                                    bạn muốn hoặc dùng AI tìm phiên bản tốt nhất",
        "next-export-btn": "Tiếp theo: Xuất video",
        "customization": "Gợi ý mở đầu ấn\n                                        tượng",
        "intro-sentence": "Sửa Câu\n                                            mở\n                                            đầu theo ý của riêng bạn",
        "video-preview": "Quá trình tạo video\n                                    sẽ mất 2-3 phút",
        "generate-video": "Tạo Video\n                                        AI",
        "generation-time": "Quá trình tạo video sẽ mất\n                                    2-3 phút",
        "step-4-main-title": "Bước 5: Xuất Video",
        "step-4-description": "Tùy chỉnh chất lượng và tải\n                                xuống video của bạn",
        "video-ready": "Video đã sẵn sàng!",
        "video-ready-desc": "Video AI của bạn đã được tạo\n                                    thành công",
        "export-settings": "Cài đặt xuất",
        "video-quality": "Chất\n                                                lượng video",
        "video-format": "Định\n                                                dạng",
        "download-options": "Tùy chọn tải\n                                    xuống",
        "download-video": "Tải\n                                            Video",
        "share-video": "Chia sẻ",
        "create-new": "Tạo video\n                                        mới",
        "processing": "Đang xử lý...",
        "processing-desc": "AI đang tạo video cho bạn"
    },
    "en": {
        "nav-create-veo": "Create Veo Video",
        "-vi-75cb": "🇻🇳 VI",
        "-en-1b8b": "🇺🇸 EN",
        "tinovideo-bd7c": "Tinovideo",
        "-0985": "☰",
        "-864a": "|",
        "1-6c96": "1",
        "2-efd6": "2",
        "3-f74e": "3",
        "4-3c81": "4",
        "5-f5dc": "5",
        "15s-1a65": "15s",
        "30s-fbdb": "30s",
        "60s-e055": "60s",
        "tất-cả-fdff": "Tất cả",
        "quảng-cáo-9c1e": "Quảng cáo",
        "đánh-giá-53a7": "Đánh giá",
        "kể-chuyện-41bd": "Kể chuyện",
        "mẹo-nhanh-bb29": "Mẹo nhanh",
        "giới-tính-fddb": "Giới tính",
        "tất-cả-7368": "Tất cả",
        "nam-f5d3": "Nam",
        "nữ-de04": "Nữ",
        "cảm-xúc-e1d3": "Cảm xúc",
        "tất-cả-c501": "Tất cả",
        "vui-vẻ-8e8d": "Vui vẻ",
        "nghi-ngờ-3177": "nghi ngờ",
        "buồn-bã-8edc": "buồn bã",
        "cấp-bách-84a8": "cấp bách",
        "wow-ad8f": "Wow",
        "tức-tối-e63a": "Tức tối",
        "-chọn-câu-mở-đầu--2b23": "-- Chọn câu mở đầu --",
        "chào-bạn-đây-là-sản-phẩm-đang-rất-hot-tr-6e72": "Chào\n                                                bạn! Đây là sản phẩm đang rất hot trên thị trường.",
        "bạn-đang-tìm-một-giải-pháp-hiệu-quả-hãy--cb30": "Bạn đang tìm một giải pháp hiệu quả? Hãy xem ngay sản phẩm này!",
        "hôm-nay-mình-sẽ-review-một-sản-phẩm-cực--d7aa": "Hôm\n                                                nay mình sẽ review một sản phẩm cực kỳ đáng chú ý.",
        "cùng-khám-phá-điều-đặc-biệt-ở-sản-phẩm-n-12e1": "Cùng khám\n                                                phá điều đặc biệt ở sản phẩm này nhé!",
        "đừng-bỏ-lỡ-đây-có-thể-là-thứ-bạn-đang-cầ-b497": "Đừng bỏ lỡ, đây\n                                                có thể là thứ bạn đang cần!",
        "0-5f31": "0%",
        "1280x720-0975": "1280x720",
        "1920x1080-2b62": "1920x1080",
        "3840x2160-674e": "3840x2160",
        "mp4-khuyến-nghị-2dda": "MP4 (Khuyến nghị)",
        "mov-1e90": "MOV",
        "avi-96ef": "AVI",
        "dự-án-của-tôi-e9e2": "My Projects",
        "danh-sách-các-dự-án-của-bạn-sẽ-hiển-thị--18fb": "Danh sách các dự án của bạn sẽ hiển thị tại đây.",
        "chỉnh-sửa-video-của-bạn-5600": "Chỉnh sửa video của bạn",
        "affiliate-a712": "Affiliate",
        "thông-tin-chương-trình-affiliate-link-gi-a5ce": "Thông tin chương trình affiliate & link giới thiệu.",
        "cài-đặt-966b": "Settings",
        "thay-đổi-tùy-chọn-cá-nhân-của-bạn-ở-đây-5f5a": "Thay đổi tùy chọn cá nhân của bạn ở đây.",
        "trợ-giúp-27e9": "Trợ Giúp",
        "các-câu-hỏi-thường-gặp-và-hỗ-trợ-7fa1": "Các câu hỏi thường gặp và hỗ trợ.",
        "nav-create": "Create Video",
        "nav-templates": "Edit Video",
        "nav-affiliate": "Affiliate",
        "nav-settings": "Settings",
        "nav-help": "Help",
        "user-plan": "Professional",
        "credits-remaining": "Remaining credits:",
        "point": "100",
        "upgrade-btn": "Upgrade",
        "main-title": "Create AI Video",
        "step-1-title": "Input Content",
        "step-2-title": "Choose AI Voice",
        "step-3-title": "Create Script",
        "step-4-title": "Generate Video",
        "step-5-title": "Export Video",
        "step-1-main-title": "Step 1: Input Product Content",
        "step-1-description": "Enter product URL or text content to create the video",
        "url-label": "Product URL",
        "analyze-btn": "Analyze",
        "supported-platforms": "Supported Platforms:",
        "images-label": "Additional Images (Optional)",
        "upload-title": "Drag & Drop or Click to Upload",
        "upload-desc": "Supports JPG, PNG, WEBP. Max 10 images.",
        "text-label": "Text Content",
        "reset-btn": "Reset",
        "next-btn": "Next: Choose Voice",
        "step-2-main-title": "Step 2: Choose AI Voice",
        "step-2-description": "Select the appropriate AI voice for your video",
        "all-voices": "All Voices",
        "male-voices": "Male Voices",
        "female-voices": "Female Voices",
        "video-duration": "Video Duration",
        "previous-btn": "Back",
        "next-create-btn": "Next: Hook Line",
        "prompt-main-title": "Step 3: Choose Script",
        "prompt-desc": "Choose a suitable script or create a new one for AI to generate the video",
        "sample-text-title": "Your Script",
        "preview-voice": "Create Script",
        "step-3-main-title": "Step 5: Generate AI Video",
        "transitions": "Select the desired emotion or let AI choose the best version",
        "next-export-btn": "Next: Export Video",
        "customization": "Hook Suggestions",
        "intro-sentence": "Edit the Opening Line to Your Style",
        "video-preview": "Video generation will take 2-3 minutes",
        "generate-video": "Generate AI Video",
        "generation-time": "Video generation will take 2-3 minutes",
        "step-4-main-title": "Step 5: Export Video",
        "step-4-description": "Customize quality and download your video",
        "video-ready": "Video is Ready!",
        "video-ready-desc": "Your AI video has been successfully created",
        "export-settings": "Export Settings",
        "video-quality": "Video Quality",
        "video-format": "Format",
        "download-options": "Download Options",
        "download-video": "Download Video",
        "share-video": "Share",
        "create-new": "Create New Video",
        "processing": "Processing...",
        "processing-desc": "AI is generating your video"
    }
};
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("tinovideo-language") || "vi";
    switchLanguage(savedLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {

        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            switchLanguage(lang);
        });
    });

});
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
        sidebar.style.display = "none";
    }
}
function switchLanguage(lang) {
    localStorage.setItem('tinovideo-language', lang);
    const t = dashboardTranslations[lang];

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

        if (el.placeholder !== undefined && el.tagName === 'INPUT') {
            el.placeholder = t[key];
        } else {
            el.textContent = t[key];
        }
    });


}
function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full transition-transform duration-300`;
    switch (type) {
        case 'success': toast.classList.add('bg-green-500'); break;
        case 'error': toast.classList.add('bg-red-500'); break;
        case 'warning': toast.classList.add('bg-yellow-500'); break;
        default: toast.classList.add('bg-blue-500');
    }
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-x-full'), 10);
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 200);
    }, 2000);
}

function showLoading(button) {
    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'Đang xử lý...';
    return () => {
        button.disabled = false;
        button.innerHTML = original;
    };
}

function updateStepProgress() {
    document.querySelectorAll('.step-progress').forEach((step, index) => {
        const circle = step.querySelector('div');
        const text = step.querySelector('span');
        const stepNumber = index + 1;
        if (stepNumber <= currentStep) {
            step.classList.add('step-active');
            circle.className = 'w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg';
            text.classList.remove('text-gray-400');
            text.classList.add('text-white');
        } else {
            step.classList.remove('step-active');
            circle.className = 'w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 font-bold text-lg';
            text.classList.remove('text-white');
            text.classList.add('text-gray-400');
        }
    });
}


// Select voice
function selectVoice(voiceId, element) {
    // Remove previous selection
    document.querySelectorAll('.voice-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    element.classList.add('selected');

    // Store selected voice
    selectedVoice = { id: voiceId };

    showToast('Đã chọn giọng đọc', 'success');
}

// Filter voices
function filterVoices(filter) {
    // Cập nhật nút active
    document.querySelectorAll('.voice-category-btn').forEach(btn => {
        const label = btn.textContent.toLowerCase();
        const isMatch =
            (filter === 'male' && label.includes('nam')) ||
            (filter === 'female' && label.includes('nữ')) ||
            (filter === 'all' && label.includes('tất'));
        btn.classList.toggle('active', isMatch);
    });

    const filtered = allVoices.filter(v => {
        if (filter === 'all') return true;
        return v.gender === filter;
    });

    renderVoiceGrid(filtered);
    showToast(`🎙️ Lọc giọng đọc: ${filter === 'female' ? 'Nữ' : filter === 'male' ? 'Nam' : 'Tất cả'}`, 'info');
}


function renderVoiceGrid(voices) {
    const voiceGrid = document.getElementById('voice-grid');
    voiceGrid.innerHTML = voices.map(v => `
        <div class="voice-card ${v.id === selectedVoice?.id ? 'selected' : ''}"
             onclick="selectVoice('${v.id}', this)">
          <div class="flex items-center mb-3">
            <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
                        flex items-center justify-center mr-3">
              <i class="fas ${v.gender === 'male' ? 'fa-male' : 'fa-female'} text-white text-lg"></i>
            </div>
            <div>
              <h4 class="font-semibold">${v.name}</h4>
              <p class="text-sm text-gray-400">${v.accent}</p>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Tiếng Việt</span>
           <button class="voice-play-btn text-blue-400 hover:text-blue-300"
            data-filename="${v.demo}"
            onclick="handleVoicePlay(event)">
                <i class="fas fa-play"></i>
            </button>
          </div>
        </div>
    `).join('');
}


// Voice settings
function updateSpeed(value) {
    projectData.settings.speed = parseFloat(value);
}

let currentAudio = null;
let currentBtn = null;

function handleVoicePlay(event) {
    event.stopPropagation();
    const btn = event.currentTarget;
    const filename = btn.dataset.filename;
    const audioUrl = `/demo-voices/${filename}`;

    // Nếu đang bấm lại cùng nút đang phát → dừng lại
    if (currentAudio && currentBtn === btn) {
        currentAudio.pause();
        currentAudio = null;
        updatePlayButton(currentBtn, false);
        currentBtn = null;
        return;
    }

    // Nếu có audio khác đang chạy → dừng
    if (currentAudio) {
        currentAudio.pause();
        updatePlayButton(currentBtn, false);
    }

    // Tạo audio mới
    currentAudio = new Audio(audioUrl);
    currentBtn = btn;
    updatePlayButton(btn, true);

    currentAudio.addEventListener("ended", () => {
        updatePlayButton(btn, false);
        currentAudio = null;
        currentBtn = null;
    });

    currentAudio.play().catch((err) => {
        console.error("Không phát được:", err);
        showToast("Không phát được giọng đọc", "error");
        updatePlayButton(btn, false);
        currentAudio = null;
        currentBtn = null;
    });
}

function updatePlayButton(btn, isPlaying) {
    const icon = btn.querySelector("i");
    if (!icon) return;
    icon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
}





function nextStep() {
    const steps = document.querySelectorAll('.step-content');
    if (currentStep >= steps.length) return;

    if (!validateCurrentStep()) return;  // ⛔ Nếu không hợp lệ thì dừng lại

    steps[currentStep - 1].classList.add('hidden');
    steps[currentStep].classList.remove('hidden');
    currentStep++;

    updateStepProgress();

    // Gọi khởi tạo riêng từng bước nếu cần
    if (currentStep === 2) initializeVoiceSelection();
    if (currentStep === 3) initializePromptGallery();
    if (currentStep === 4) renderCharacterList();
    // if (currentStep === 5) generateIntro();
    // if (currentStep === 6) renderCharacterList();
    if (currentStep === 7 && window.latestVideoUrl) {
        const finalPreview = document.querySelector('#step-5-content .preview-area');
        finalPreview.innerHTML = '';
        const vid = document.createElement('video');
        vid.src = window.latestVideoUrl;
        vid.controls = true;
        vid.className = 'w-full max-w-2xl mx-auto rounded shadow';
        finalPreview.appendChild(vid);
    }
}

function previousStep() {
    const steps = document.querySelectorAll('.step-content');
    if (currentStep > 1) {
        steps[currentStep - 1].classList.add('hidden');
        steps[currentStep - 2].classList.remove('hidden');
        currentStep--;
        updateStepProgress();
    }
}

function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            const url = document.getElementById('product-url').value.trim();
            const text = document.getElementById('product-text').value.trim();
            const previewContainer = document.getElementById('image-preview');
            const hasPreview = previewContainer.querySelector('div.relative.group');
            if (!url && !text) {
                showToast('Vui lòng nhập URL hoặc nội dung mô tả sản phẩm', 'warning');
                return false;
            }
            if (!hasPreview) {
                showToast('Vui lòng thêm ít nhất 1 ảnh sản phẩm', 'warning');
                return false;
            }
            projectData.url = url;
            projectData.text = text;
            break;

        case 2:
            if (!selectedVoice) {
                showToast('Vui lòng chọn giọng đọc AI', 'warning');
                return false;
            }
            projectData.voice = selectedVoice;
            break;

        case 3:
            const scriptContent = document.getElementById('script-text').value.trim();
            const wordCount = scriptContent.split(/\s+/).filter(Boolean).length;

            if (!scriptContent) {
                showToast('Vui lòng tạo kịch bản trước khi tiếp tục', 'warning');
                return false;
            }

            if (wordCount < 20) {
                showToast('Kịch bản quá ngắn. Vui lòng viết ít nhất 20 từ.', 'warning');
                return false;
            } else if (wordCount > 100) {
                showToast('Kịch bản vượt quá 100 từ. Vui lòng rút gọn!', 'warning');
                return false;
            }

            projectData.script = scriptContent;
            projectData.prompt = selectedPrompt || null;
            break;
        case 4:
            if (!selectedModels) {
                showToast('Vui lòng chọn Mẫu', 'warning');
                return false;
            }
            projectData.character = selectedModels;
            break;

        case 5:
            const introInput = document.getElementById("intro-input");
            if (!introInput.value) {
                showToast('Vui lòng tạo câu mở đầu video', 'warning');
                return false;
            }
            break;
        case 6:
            const iframe = document.querySelector('#video-wrapper iframe');
            if (!iframe) {
                showToast('Vui lòng tạo video trước khi tiếp tục', 'warning');
                return false;
            }
            break;
    }
    return true;
}

function resetForm() {
    document.getElementById('product-url').value = '';
    document.getElementById('product-text').value = '';
    uploadedImages = [];
    renderImagePreviews();
    resetVideoPreview();
}

function createNewVideo() {
    currentStep = 1;
    selectedVoice = null;
    selectedModels = null;
    uploadedImages = [];
    projectData = {
        url: '', text: '', voice: null, template: null,
        settings: { speed: 1, pitch: 0, volume: 80, music: 'none', textStyle: 'modern', transition: 'fade', duration: 30 }
    };
    resetForm();
    document.querySelectorAll('.step-content').forEach(step => step.classList.add('hidden'));
    document.getElementById('step-1-content').classList.remove('hidden');
    updateStepProgress();
    showToast('Đã tạo dự án mới!', 'success');
}

// Voice selection
const ANH_VIEN_VOICE_ID = 'iSFxP4Z6YNcx9OXl62Ic';
function initializeVoiceSelection() {
    const voiceGrid = document.getElementById('voice-grid');
    // Chỉ 2 giọng: AI & Ánh Viên
    allVoices = [
        {
            id: 'default-ai',
            name: 'AI',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Mặc định',
            demo: 'ai_demo.mp3'
        },
        {
            id: 'iSFxP4Z6YNcx9OXl62Ic',
            name: 'Ánh Viên',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'anhvien_demo.mp3'
        },
        {
            id: 'HQZkBNMmZF5aISnrU842',
            name: 'MC Khánh Ly',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'khanh-ly.mp3'
        }, {
            id: 'BLeuF5fPXWSDAwZScbTY',
            name: 'BS Nhi',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'bs_nhi.mp3'
        }, {
            id: 'KpzB5RgCRuVkUlZeY6wb',
            name: 'Tuyết Trinh',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'tuyet-trinh.mp3'
        }
        , {
            id: '3VnrjnYrskPMDsapTr8X',
            name: 'Đặng Tùng Duy',
            gender: 'male',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'dangtungduy.mp3'
        }
        , {
            id: '329254',
            name: 'Khả Hân',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'dangtungduy.mp3'
        }, {
            id: '329253',
            name: 'Linh Đan',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'dangtungduy.mp3'
        }
        , {
            id: '329251',
            name: 'Ái My',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'dangtungduy.mp3'
        }
        , {
            id: '329250',
            name: 'Mỹ Dung',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'dangtungduy.mp3'
        }
    ];

    //     voiceGrid.innerHTML = voices.map(v => `
    //     <div class="voice-card ${v.id === selectedVoice?.id ? 'selected' : ''}"
    //          onclick="selectVoice('${v.id}', this)">
    //       <div class="flex items-center mb-3">
    //         <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
    //                     flex items-center justify-center mr-3">
    //           <i class="fas fa-female text-white text-lg"></i>
    //         </div>
    //         <div>
    //           <h4 class="font-semibold">${v.name}</h4>
    //           <p class="text-sm text-gray-400">${v.accent}</p>
    //         </div>
    //       </div>
    //       <div class="flex justify-between items-center">
    //         <span class="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Tiếng Việt</span>
    //        <button class="voice-play-btn text-blue-400 hover:text-blue-300"
    //         data-filename="${v.demo}"
    //         onclick="handleVoicePlay(event)">
    //             <i class="fas fa-play"></i>
    //         </button>
    //       </div>
    //     </div>
    //   `).join('');
    renderVoiceGrid(allVoices); // Hiển thị ban đầu
}

/* ==================== PROMPT GALLERY ==================== */
const PROMPTS = [
    {
        id: 'review-urgent-solution',
        cat: 'ads',
        title: 'Review “Giải pháp cho vấn đề cấp bách”',
        text: 'Nêu vấn đề nhức nhối → giới thiệu giải pháp → kêu gọi hành động',
        icon: '/images/icons/icons8-qa-64.png',
        gradient: 'gradient-ai-blue',
        textColor: 'text-white'
    },
    {
        id: 'review-before-after',
        cat: 'danhgia',
        title: 'Review “So sánh trước và sau”',
        text: 'Hiển thị bằng chứng trực quan (ảnh/video trước–sau) → nhấn mạnh thay đổi',
        icon: '/images/icons/ss.png',
        gradient: 'gradient-ai-purple',
        textColor: 'text-white'
    },
    {
        id: 'review-testimonial',
        cat: 'review',
        title: 'Review “Chứng thực từ khách hàng thực”',
        text: 'Trích dẫn cảm nhận khách hàng, chèn cảnh sử dụng sản phẩm',
        icon: '/images/icons/dialogue.png',
        gradient: 'gradient-ai-cyan',
        textColor: 'text-black'
    },
    {
        id: 'review-challenge',
        cat: 'review',
        title: 'Review “Thử thách thực tế”',
        text: 'Thực hiện thử thách/benchmark và trình bày kết quả ấn tượng',
        icon: '/images/icons/challenge.png',
        gradient: 'bg-gradient-to-r from-green-500 to-blue-500',
        textColor: 'text-black'
    },
    {
        id: 'review-journey',
        cat: 'story',
        title: 'Review “Hành trình khám phá sản phẩm”',
        text: 'Kể hành trình trải nghiệm từng bước, nêu điểm nhấn & cảm xúc',
        icon: '/images/icons/discover.png',
        gradient: 'gradient-ai-indigo',
        textColor: 'text-white'
    },
    {
        id: 'review-expert-talk',
        cat: 'review',
        title: 'Review “Đối thoại với chuyên gia”',
        text: 'Phỏng vấn ngắn chuyên gia, trích ý kiến chuyên môn + lợi ích',
        icon: '/images/icons/job-interview.png',
        gradient: 'gradient-ai-blue',
        textColor: 'text-white'
    },
    {
        id: 'review-qa',
        cat: 'tip',
        title: 'Review “Phong cách Q&A”',
        text: 'Liệt kê câu hỏi phổ biến → trả lời ngắn gọn, minh họa trực quan',
        icon: '/images/icons/verification.png',
        gradient: 'gradient-ai-purple',
        textColor: 'text-white'
    },
    {
        id: 'review-lifestyle',
        cat: 'story',
        title: 'Review “Lối sống lý tưởng”',
        text: 'Mô tả lối sống/hoạt cảnh, lồng ghép sản phẩm như giải pháp tối ưu',
        icon: '/images/icons/idealistic.png',
        gradient: 'gradient-ai-cyan',
        textColor: 'text-black'
    },
    {
        id: 'review-success-story',
        cat: 'story',
        title: 'Review “Câu chuyện thành công”',
        text: 'Kể câu chuyện thành công có thật, nhấn vai trò sản phẩm, chốt CTA',
        icon: '/images/icons/success.png',
        gradient: 'gradient-ai-green',
        textColor: 'text-black'
    },
    {
        id: 'review-flash-sale',
        cat: 'tip',
        title: 'Review “Flash Sale Countdown”',
        text: 'Đếm ngược Flash-sale, nêu lợi ích nhanh, tạo FOMO, kêu gọi mua ngay',
        icon: '/images/icons/flash-sale.png',
        gradient: 'gradient-ai-indigo',
        textColor: 'text-white'
    }
];

let selectedPrompt = null;

function initializePromptGallery() {
    const grid = document.getElementById('prompt-grid');
    if (!grid) return;
    grid.innerHTML = PROMPTS.map(p => `
        <div class="prompt-card ${p.gradient} border border-transparent rounded-lg p-4 mb-4 cursor-pointer transition hover:shadow-lg ${p.id === selectedPrompt?.id ? 'ring-2 ring-indigo-500' : ''}"
             onclick="selectPrompt('${p.id}', this)">
            <div class="flex items-start mb-3">
                <div class="w-10 h-10 flex items-center justify-center mr-3 overflow-hidden">
                    <img src="${p.icon}" alt="${p.title} icon" class="w-6 h-6 object-contain" />
                </div>
                <div class="flex-1">
                    <h4 class="font-semibold ${p.textColor}">${p.title}</h4>
                   
                </div>
            </div>
            <p class="text-sm ${p.textColor} mb-3">${p.text}</p>
            <button class="text-blue-600 hover:text-blue-800 text-xs font-medium"
                    onclick="event.stopPropagation(); insertPrompt('${p.id}')">
            </button>
        </div>
  `).join('');
    const scriptText = document.getElementById('script-text').value.trim();
    const wordCount = scriptText.split(/\s+/).length;

    if (wordCount > 100) {
        showToast(`Kịch bản đang có ${wordCount} từ. Vui lòng rút gọn dưới 100 từ để tiếp tục.`, 'warning');
        return; // ❌ Không cho sang bước tiếp theo
    }
}

function selectPrompt(promptId, el) {
    document.querySelectorAll('.prompt-card')
        .forEach(c => c.classList.remove('ring-2', 'ring-green-500'));

    el.classList.add('ring-2', 'ring-green-500');
    selectedPrompt = PROMPTS.find(p => p.id === promptId);
    if (!selectedPrompt) return;
    console.log(selectedPrompt.text)
    showToast('Đã chọn kịch bản', 'success');
}

function insertPrompt(promptId) {
    const pr = PROMPTS.find(p => p.id === promptId);
    if (pr) {
        document.getElementById('sample-text').value = pr.text;
        showToast('Đã chèn nội dung kịch bản', 'info');
    }
}

function selectPrompt(id, el) {
    document.querySelectorAll('.prompt-card').forEach(c => c.classList.remove('ring-2', 'ring-green-500'));
    el.classList.add('ring-2', 'ring-green-500');
    selectedPrompt = PROMPTS.find(p => p.id === id);
    showToast('Đã chọn kịch bản', 'success');
}

function filterPrompts(cat) {
    console.log("Filtering by category:", cat);

    // Cập nhật trạng thái active cho các nút
    document.querySelectorAll('.prompt-cat-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === cat);
    });

    // Lọc các prompt card
    document.querySelectorAll('.prompt-card').forEach(card => {
        const promptId = card.getAttribute('onclick').match(/'([^']+)'/)[1];
        const prompt = PROMPTS.find(p => p.id === promptId);

        if (!prompt) {
            card.classList.add('hidden');
            return;
        }

        if (cat === 'all' || prompt.cat === cat) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// function filterPrompts(cat) {
//     console.log("Cat",cat);

//   // Cập nhật trạng thái active cho các nút
//   document.querySelectorAll('.prompt-cat-btn').forEach(b => {
//     b.classList.toggle('active', b.dataset.cat === cat);
//   });

//   // Lọc các prompt card
//   document.querySelectorAll('.prompt-card').forEach(card => {
//     if (cat === 'all') {
//       card.classList.remove('hidden');
//     } else {
//         card.classList.remove('hidden');
//     }
//   });
// }

// Template gallery
function initializeModels() {
    // ✅ Reset template nếu không dùng nữa
    selectedModels = null;

    // ✅ Nếu có khối HTML template-grid thì ẩn nó đi, tránh bị trống hoặc lỗi
    const templateGrid = document.getElementById('template-grid');
    if (templateGrid) {
        templateGrid.classList.add('hidden'); // Ẩn nếu tồn tại
    }

    // 👉 Không làm gì thêm, để bước 4 vẫn chạy mượt
}
const characters = [
    {
        id: 'ha-chi',
        name: 'Hạ Chi',
        image: 'images/models/ha-chi.png',
        gender: 'female',
        emotion: 'suspicious',
        video: 'sample/ha-chi.mp4'
    },
    {
        id: 'bao-tran',
        name: 'Bảo Trân',
        image: 'images/models/bao-tran.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/bao-tran.mp4'
    },
    {
        id: 'tuong-vy',
        name: 'Tường Vy',
        image: 'images/models/tuong-vy.png',
        gender: 'female',
        emotion: 'happy',
        video: 'sample/tuong-vy.mp4'
    },
    {
        id: 'quang-minh',
        name: 'Quang Minh',
        image: 'images/models/quang-minh.png',
        gender: 'male',
        emotion: 'happy',
        video: 'sample/quang-minh.mp4'
    },
    {
        id: 'van-anh',
        name: 'Vân Anh',
        image: 'images/models/van-anh.png',
        gender: 'female',
        emotion: 'frustrated',
        video: 'sample/van-anh.mp4'
    },
    {
        id: 'trung-kien',
        name: 'Trung Kiên',
        image: 'images/models/trung-kien.png',
        gender: 'male',
        emotion: 'serious',
        video: 'sample/trung-kien.mp4'
    },
    {
        id: 'ngoc-linh',
        name: 'Ngọc Linh',
        image: 'images/models/ngoc-linh.png',
        gender: 'female',
        emotion: 'happy',
        video: 'sample/ngoc-linh.mp4'
    },
    {
        id: 'anh-vien',
        name: 'Ánh Viên',
        image: 'images/models/anh-vien.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/anh-vien.mp4'
    }, {
        id: 'thuy-chi',
        name: 'Thùy Chi',
        image: 'images/models/thuy-chi.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/thuy-chi.mp4'
    }
    , {
        id: 'thu-thuy',
        name: 'Thu Thủy',
        image: 'images/models/thu-thuy.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/thu-thuy.mp4'
    }
    , {
        id: 'diem-quynh',
        name: 'Diễm Quỳnh',
        image: 'images/models/diem-quynh.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/diem-quynh.mp4'
    }, {
        id: 'huyen-trang',
        name: 'Huyền Trang',
        image: 'images/models/huyen-trang.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/huyen-trang.mp4'
    }, {
        id: 'ngoc-anh',
        name: 'Ngọc Anh',
        image: 'images/models/ngoc-anh.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/ngoc-anh.mp4'
    }
    , {
        id: 'bao-han',
        name: 'Bảo Hân',
        image: 'images/models/bao-han.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/bao-han.mp4'
    }
    , {
        id: 'anh-tuyet',
        name: 'Ánh Tuyết',
        image: 'images/models/anh-tuyet.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/anh-tuyet.mp4'
    }, {
        id: 'khanh-chi',
        name: 'Khánh Chi',
        image: 'images/models/khanh-chi.png',
        gender: 'female',
        emotion: 'sorrowful',
        video: 'sample/khanh-chi.mp4'
    }
];


let selectedModels = null;
function renderCharacterList() {
    const gender = document.getElementById('filter-gender')?.value || '';
    const emotion = document.getElementById('filter-emotion')?.value || '';
    const container = document.getElementById("character-list");

    const filtered = characters.filter(c => {
        return (!gender || c.gender === gender) &&
            (!emotion || c.emotion === emotion);
    });

    container.innerHTML = filtered.map(c => `
  <div class="relative mt-4 bg-white cursor-pointer hover:border-blue-400 rounded-lg shadow-md overflow-hidden w-full" onclick="selectCharacter('${c.id}', this)">
<div class="w-full bg-gray-100 overflow-hidden" style="aspect-ratio:9/16">
  <img src="${c.image}"
       alt="${c.name}"
       class="w-full h-full object-cover object-center" />
</div>
  <div class="w-full bg-white">
    <p class="text-sm font-medium text-black text-center bg-white py-3 min-h-[44px]">
    ${c.name}
  </p>
  </div>
</div>
  `).join('');
}

function selectCharacter(id, el) {
    selectedModels = id;
    projectData.character = id;
    // Clear old selection
    document.querySelectorAll("#character-list .ring-2").forEach(e => {
        e.classList.remove("ring-2", "ring-blue-500");
    });
    el.classList.add("ring-2", "ring-blue-500");

    // Lấy character tương ứng
    const char = characters.find(c => c.id === id);
    if (char && char.video) {
        const video = document.getElementById("step5-video-preview");
        if (video) {
            video.src = char.video;
            video.load();
        }
    }
}


async function analyzeUrl(event) {
    // resetVideoPreview();

    const urlInput = document.getElementById('product-url');
    const url = urlInput.value.trim();
    if (!url) return showToast('Vui lòng nhập URL sản phẩm', 'warning');
    if (!validateUrl(url)) return showToast('URL không hợp lệ', 'error');

    // ==== MỚI: kiểm tra số ảnh hiện có ====
    const preview = document.getElementById('image-preview');
    const currentCount = preview.querySelectorAll('div.relative.group').length;
    const maxAllowed = 10;
    if (currentCount >= maxAllowed) {
        return showToast(`Bạn chỉ được tối đa ${maxAllowed} ảnh`, 'warning');
    }
    // ==== hết phần mới ====

    const btn = document.getElementById('analyze-btn') || event?.target;
    const stopLoading = showLoading(btn);

    // const API_BASE_URL = window.APP_CONFIG?.API_BASE_URL || '${API_BASE_URL}';
    let res;
    const token = localStorage.getItem('jwt');
    try {
        res = await fetch(`${API_BASE_URL}/api/scrape`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ url })
        }).then(r => r.json());
    } catch (err) {
        stopLoading();
        console.error(err);
        return showToast('Lỗi kết nối đến API', 'error');
    }
    stopLoading();

    if (!res.success) {
        return showToast(res.message || 'Phân tích thất bại', 'error');
    }

    // ==== DỮ LIỆU TRẢ VỀ: title + images (dạng URL gốc) ====
    const { title, images = [] } = res.data;
    if (!images.length) return showToast('Không có ảnh nào để hiển thị', 'warning');

    document.getElementById('sample-text').value = title || '';
    document.getElementById('product-title').innerText = title || '';
    projectData.url = url;
    projectData.text = title;

    preview.classList.remove('hidden');

    const available = maxAllowed - preview.querySelectorAll('div.relative.group').length;
    if (available <= 0) {
        return showToast(`Bạn chỉ được tối đa ${maxAllowed} ảnh`, 'warning');
    }

    images.slice(0, available).forEach((imgUrl, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';

        const img = document.createElement('img');
        img.dataset.realpath = imgUrl;
        img.src = imgUrl;
        img.alt = `Product Image ${index + 1}`;
        img.className =
            'rounded w-full h-auto object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105';
        img.title = 'Bấm để tải ảnh về';

        img.addEventListener('click', () => {
            const a = document.createElement('a');
            a.href = imgUrl;
            a.download = `image_${index + 1}.jpg`;
            a.click();
        });
        const downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = '↓';
        downloadBtn.title = 'Tải ảnh này';
        downloadBtn.className =
            'absolute top-1 right-8 w-6 h-6 rounded-full bg-blue-600 bg-opacity-70 text-white font-bold flex items-center justify-center text-sm hover:bg-opacity-90 transition-all';

        downloadBtn.addEventListener('click', () => {
            const a = document.createElement('button');
            a.href = img.dataset.realpath || img.src;  // đảm bảo lấy đúng link gốc
            a.download = `image_${index + 1}.jpg`;
            a.target = '_blank';
            a.rel = 'noopener';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className =
            'absolute top-1 right-1 w-6 h-6 rounded-full bg-black bg-opacity-60 text-white font-bold flex items-center justify-center text-sm hover:bg-opacity-90 transition-all';
        closeBtn.addEventListener('click', () => wrapper.remove());

        wrapper.appendChild(img);
        wrapper.appendChild(downloadBtn);
        wrapper.appendChild(closeBtn);
        preview.appendChild(wrapper);
    });

    showToast('Phân tích URL thành công!', 'success');
}


function renderImagePreviews() {
    const container = document.getElementById('image-preview');
    container.innerHTML = '';
    uploadedImages.forEach((img, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';
        const image = document.createElement('img');
        image.src = img.url || URL.createObjectURL(img);
        image.alt = img.name || `image_${index}`;
        image.className = 'rounded w-full h-auto object-cover cursor-pointer';
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'absolute top-1 right-1 w-6 h-6 bg-black bg-opacity-60 text-white flex items-center justify-center rounded-full';
        closeBtn.onclick = () => {
            uploadedImages.splice(index, 1);
            renderImagePreviews();
        };
        wrapper.appendChild(image);
        wrapper.appendChild(closeBtn);
        container.appendChild(wrapper);
    });
}

// function handleImageUpload(event) {
//     const files = event.target.files;
//     const preview = document.getElementById('image-preview');

//     if (!files || files.length === 0) return;

//     // Đếm ảnh đang có
//     const currentImageCount = preview.querySelectorAll('img').length;
//     const maxAllowed = 10;

//     if (currentImageCount >= maxAllowed) {
//         showToast(`Bạn chỉ được chọn tối đa ${maxAllowed} ảnh`, 'warning');
//         return;
//     }

//     const remainingSlots = maxAllowed - currentImageCount;
//     const filesToAdd = Array.from(files).slice(0, remainingSlots);

//     preview.classList.remove('hidden');

//     filesToAdd.forEach((file, index) => {
//         if (!file.type.startsWith('image/')) return;

//         const reader = new FileReader();
//         reader.onload = (e) => {
//             const dataUri = e.target.result;
//             const wrapper = document.createElement('div');
//             wrapper.className = 'relative group';

//             const img = document.createElement('img');
//             // img.src = e.target.result;
//             img.src = dataUri;
//             img.alt = file.name;
//             img.dataset.realpath = dataUri;
//             img.className = 'rounded w-full h-auto object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105';

//             img.addEventListener('click', () => {
//                 const a = document.createElement('a');
//                 a.href = img.src;
//                 a.download = file.name;
//                 a.click();
//             });

//             const closeBtn = document.createElement('button');
//             closeBtn.innerHTML = '×';
//             closeBtn.className = `
//         absolute top-1 right-1 w-6 h-6 rounded-full 
//         bg-black bg-opacity-60 text-white font-bold 
//         flex items-center justify-center text-sm
//         hover:bg-opacity-90 transition-all
//       `;
//             closeBtn.addEventListener('click', () => {
//                 wrapper.remove();
//             });

//             wrapper.appendChild(img);
//             wrapper.appendChild(closeBtn);
//             preview.appendChild(wrapper);

//             uploadedImages.push(file);
//         };
//         reader.readAsDataURL(file);
//     });

// }
async function handleImageUpload(event) {
    const files = event.target.files;
    const preview = document.getElementById('image-preview');
    if (!files || files.length === 0) return;

    const currentImageCount = preview.querySelectorAll('img').length;
    const maxAllowed = 10;
    if (currentImageCount >= maxAllowed) {
        showToast(`Bạn chỉ được chọn tối đa ${maxAllowed} ảnh`, 'warning');
        return;
    }

    const token = localStorage.getItem('jwt');
    const remainingSlots = maxAllowed - currentImageCount;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    preview.classList.remove('hidden');

    for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);
        const userId = JSON.parse(localStorage.getItem("auth_data") || "{}").id;
        try {
            const res = await fetch(`${API_BASE_URL}/api/upload-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-User-Id': userId
                },
                body: formData
            });
            const data = await res.json();
            if (data.success && data.url) {
                const wrapper = document.createElement('div');
                wrapper.className = 'relative group';

                const img = document.createElement('img');
                const fullUrl = data.url.startsWith('/')
                    ? `${location.origin}${data.url}`
                    : data.url;
                img.src = fullUrl;
                img.alt = file.name;
                img.dataset.realpath = fullUrl;
                img.className = 'rounded w-full h-auto object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105';

                img.addEventListener('click', () => {
                    const a = document.createElement('a');
                    a.href = data.url;
                    a.download = file.name;
                    a.click();
                });

                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '×';
                closeBtn.className = `
                    absolute top-1 right-1 w-6 h-6 rounded-full 
                    bg-black bg-opacity-60 text-white font-bold 
                    flex items-center justify-center text-sm
                    hover:bg-opacity-90 transition-all
                `;
                closeBtn.addEventListener('click', () => wrapper.remove());

                wrapper.appendChild(img);
                wrapper.appendChild(closeBtn);
                preview.appendChild(wrapper);
            } else {
                showToast(data.message || 'Upload thất bại', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('Lỗi khi upload ảnh', 'error');
        }
    }
}

function generateScript() {
    const textarea = document.getElementById('sample-text');
    const outTextarea = document.getElementById('script-text');
    const promptTemplate = (selectedPrompt?.text || '').trim();
    const userText = textarea.value.trim();
    const duration = projectData.settings.duration;

    if (!promptTemplate) {
        showToast('Vui lòng chọn kịch bản mẫu trước khi tạo kịch bản', 'warning');
        return;
    }
    if (duration == 15) {
        max_char_count = 45;
    }
    // } else if (duration == 30) {
    //     max_char_count = 450;
    // } else if (duration == 60) {
    //     max_char_count = 450;
    // }

    max_char_count = 45;
    document.getElementById('loading-overlay').classList.remove('hidden');
    document.getElementById('processing-desc').textContent = 'Đang tạo kịch bản video';
    const requestScript = {
        promptTemplate,
        userText,
        max_char_count
    };
    console.log("generate-script", requestScript)
    const token = localStorage.getItem('jwt');
    fetch(`${API_BASE_URL}/api/generate-script`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestScript)
    })
        .then(async res => {
            const data = await res.json();
            console.log(requestScript)    // luôn parse trước
            if (!res.ok) throw new Error(data.message || 'HTTP error');   // ⬅️ chỉ check HTTP

            // ✅ THÀNH CÔNG
            document.getElementById('loading-overlay').classList.add('hidden');
            outTextarea.value = data.script;
            //   document.getElementById('script-preview').textContent = data.script;
            //   document.getElementById('script-preview').classList.remove('hidden');
            projectData.script = data.script;
            showToast('Đã sinh kịch bản AI!', 'success');
        })
        .catch(err => {
            console.error(err);
            document.getElementById('loading-overlay').classList.add('hidden');
            showToast(err.message || 'Tạo kịch bản thất bại', 'error');
        });
}

async function downloadVideo() {
    // const videoUrl = videoUrl;
    if (!videoUrl) {
        showToast('Không tìm thấy video để tải xuống', 'error');
        return;
    }

    showToast('Đang tải video...', 'info');

    try {
        /* 1 — tải file dưới dạng blob (CORS phải cho GET) */
        const resp = await fetch(videoUrl, { mode: 'cors' });
        if (!resp.ok) throw new Error('Network error');
        const blob = await resp.blob();

        /* 2 — tạo URL tạm, buộc tải xuống */
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = '';   // tên lưu trên máy
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);    // giải phóng bộ nhớ

        showToast('Video đã được tải xong!', 'success');
    } catch (e) {
        console.error(e);
        showToast('Tải video thất bại', 'error');
    }
}



// Select template


let currentVideoUrl = '';
async function downloadVideo(url = currentVideoUrl) {
    // Cho phép truyền URL trực tiếp (nếu cần),
    // còn không thì dùng URL đã lưu ở bước 1.
    if (!url) {
        showToast('Không tìm thấy video để tải xuống', 'error');
        return;
    }

    showToast('Đang tải video...', 'info');

    try {
        /* 1 — tải file dưới dạng blob (server cần mở Access-Control-Allow-Origin) */
        const resp = await fetch(url, { mode: 'cors' });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const blob = await resp.blob();

        /* 2 — tạo URL tạm và buộc tải xuống */
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'download.mp4';           // tên lưu trên máy
        a.click();
        URL.revokeObjectURL(blobUrl);            // giải phóng bộ nhớ

        showToast('Video đã được tải xong!', 'success');
    } catch (err) {
        console.error(err);
        showToast('Tải video thất bại', 'error');
    }
}

function shareVideo(url = currentVideoUrl) {
    if (!url) {
        showToast('Không tìm thấy video để chia sẻ', 'error');
        return;
    }

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
        showToast('Đã sao chép liên kết chia sẻ!', 'success');
    }).catch(err => {
        console.error(err);
        showToast('Không thể sao chép liên kết', 'error');
    });
}

// === TIẾN ĐỘ THANH ===
function startProgressBar(duration = 10000) {
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    if (!progressContainer || !progressBar) return;

    progressContainer.classList.remove("hidden");
    progressBar.style.width = "0%";
    progressBar.textContent = "0%";

    let percent = 0;
    const interval = 250;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
        percent += increment;
        if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
        }
        progressBar.style.width = `${percent.toFixed(0)}%`;
        progressBar.textContent = `${percent.toFixed(0)}%`;
    }, interval);
}

// async function generateVideo() {
//     const preview = document.getElementById('image-preview');
//     const imageSet = new Set();
//     const image_paths = Array.from(preview.querySelectorAll('img'))
//         .map(img => img.dataset.realpath || img.src)
//         .filter(p => !imageSet.has(p) && imageSet.add(p));

//     const script = projectData.script || document.getElementById('script-text').value.trim();
//     const transition = projectData.settings.transition || 'fade';
//     const music = projectData.settings.music || 'none';
//     let text = document.getElementById("intro-input").value.trim();
//     if (!text) text = document.getElementById("intro-select").value;
//     const sample = projectData.character;

//     if (!script) return showToast('Vui lòng tạo kịch bản trước', 'warning');
//     if (image_paths.length === 0) return showToast('Vui lòng chọn ít nhất 1 ảnh', 'warning');

//     const body = {
//         script,
//         image_paths,
//         voice_id: projectData.voice?.id,
//         transition,
//         text,
//         bg_music: music !== 'none' ? music : null,
//         sample,
//         y_offset: 150,
//         font_size: 48
//     };
//     console.log("body", body)
//     const token = localStorage.getItem('jwt');
//     const progressContainer = document.getElementById("progress-container");
//     const progressBar = document.getElementById("progress-bar");
//     progressContainer.classList.remove("hidden");
//     startProgressBar();
//     console.log("data", body)
//     let data;
//     try {
//         const res = await fetch(`${API_BASE_URL}/api/generate-full-video`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(body)
//         });
//         data = await res.json();
//     } catch (err) {
//         progressContainer.classList.add("hidden");
//         console.error(err);
//         return showToast('Lỗi kết nối khi tạo video', 'error');
//     }

//     if (!data.success) {
//         progressContainer.classList.add("hidden");
//         localStorage.removeItem("auth_data");
//         return showToast(data.message || data.error || 'Tạo video thất bại', 'error');
//     }


//     showToast('🎉 Tạo video thành công!', 'success');
//     localStorage.removeItem("auth_data"); // ❌ Xoá dữ liệu cũ

//     // ✅ Gọi lại API để lấy thông tin user mới
//      try {
//         const res = await fetch(`${API_BASE_URL}/api/user`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (data.success) {
//           cachedUser = data.user;
//           localStorage.setItem("auth_data", JSON.stringify(data.user));
//           fillDataUser(cachedUser);  // ✅ truyền đúng user
//           return cachedUser;
//         } else {
//           console.warn("❌ Không lấy được thông tin user:", data.error);
//           return null;
//         }
//       } catch (err) {
//         console.error("❌ Lỗi kết nối:", err);
//         return null;
//       }

//     const wrapper = document.getElementById('video-wrapper');
//     wrapper.innerHTML = '';
//     const videoUrl = data.video_url;
//     currentVideoUrl = videoUrl;
//     const iframe = document.createElement('iframe');
//     progressBar.style.width = "100%";
//     progressBar.textContent = "100%";
//     progressContainer.classList.add("hidden");
//     iframe.src = videoUrl.includes('/view') ? videoUrl.replace('/view', '/preview') : videoUrl;
//     iframe.width = '100%';
//     iframe.height = '480';
//     iframe.allow = 'autoplay; fullscreen';
//     iframe.className = 'rounded';
//     wrapper.appendChild(iframe);

//     const downloadBtn = document.getElementById('download-video-btn');
//     if (downloadBtn) {
//         downloadBtn.classList.remove('hidden');
//         downloadBtn.onclick = () => window.open(videoUrl, '_blank');
//     }

//     const audioUrl = data.voice_url;
//     const downloadAudioBtn = document.getElementById('download-audio-btn');
//     if (audioUrl && downloadAudioBtn) {
//         downloadAudioBtn.classList.remove('hidden');
//         downloadAudioBtn.onclick = () => window.open(audioUrl, '_blank');
//     }

//     projectData.video_url = videoUrl;
//     projectData.voice_url = audioUrl;

// }


async function generateVideo() {
    const preview = document.getElementById('image-preview');
    const imageSet = new Set();
    const image_paths = Array.from(preview.querySelectorAll('img'))
        .map(img => img.dataset.realpath || img.src)
        .filter(p => !imageSet.has(p) && imageSet.add(p));

    const script = projectData.script || document.getElementById('script-text').value.trim();
    const transition = projectData.settings.transition || 'fade';
    const music = projectData.settings.music || 'none';
    let text = document.getElementById("intro-input").value.trim();
    if (!text) text = document.getElementById("intro-select").value;
    const sample = projectData.character;

    if (!script) return showToast('Vui lòng tạo kịch bản trước', 'warning');
    if (image_paths.length === 0) return showToast('Vui lòng chọn ít nhất 1 ảnh', 'warning');

    const body = {
        script,
        image_paths,
        voice_id: projectData.voice?.id,
        transition,
        text,
        bg_music: music !== 'none' ? music : null,
        sample,
        y_offset: 150,
        font_size: 48
    };

    const token = localStorage.getItem('jwt');
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    progressContainer.classList.remove("hidden");
    startProgressBar();

    let videoData;
    try {
        const res = await fetch(`${API_BASE_URL}/api/generate-full-video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        videoData = await res.json();
    } catch (err) {
        progressContainer.classList.add("hidden");
        console.error(err);
        return showToast('Lỗi kết nối khi tạo video', 'error');
    }

    if (!videoData.success) {
        progressContainer.classList.add("hidden");
        localStorage.removeItem("auth_data");
        return showToast(videoData.message || videoData.error || 'Tạo video thất bại', 'error');
    }

    showToast('🎉 Tạo video thành công!', 'success');
    localStorage.removeItem("auth_data"); // ❌ Xoá dữ liệu cũ

    // ✅ Gọi lại API để lấy thông tin user mới
    try {
        const res = await fetch(`${API_BASE_URL}/api/user`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const userRes = await res.json();
        if (userRes.success) {
            cachedUser = userRes.user;
            localStorage.setItem("auth_data", JSON.stringify(userRes.user));
            fillDataUser?.(cachedUser); // Cập nhật UI nếu có
        } else {
            console.warn("❌ Không lấy được thông tin user:", userRes.error);
        }
    } catch (err) {
        console.error("❌ Lỗi kết nối khi lấy user:", err);
    }

    // ✅ Hiển thị video
    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = '';
    const videoUrl = videoData.video_url;
    currentVideoUrl = videoUrl;
    const iframe = document.createElement('iframe');
    progressBar.style.width = "100%";
    progressBar.textContent = "100%";
    progressContainer.classList.add("hidden");
    iframe.src = videoUrl.includes('/view') ? videoUrl.replace('/view', '/preview') : videoUrl;
    iframe.width = '100%';
    iframe.height = '480';
    iframe.allow = 'autoplay; fullscreen';
    iframe.className = 'rounded';
    wrapper.appendChild(iframe);

    const downloadBtn = document.getElementById('download-video-btn');
    if (downloadBtn) {
        downloadBtn.classList.remove('hidden');
        downloadBtn.onclick = () => window.open(videoUrl, '_blank');
    }

    const audioUrl = videoData.voice_url;
    const downloadAudioBtn = document.getElementById('download-audio-btn');
    if (audioUrl && downloadAudioBtn) {
        downloadAudioBtn.classList.remove('hidden');
        downloadAudioBtn.onclick = () => window.open(audioUrl, '_blank');
    }

    projectData.video_url = videoUrl;
    projectData.voice_url = audioUrl;
}




function selectTemplate(templateId, element) {
    // Remove previous selection
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('ring-2', 'ring-blue-500');
    });

    // Add selection to clicked card
    element.classList.add('ring-2', 'ring-blue-500');

    // Store selected template
    selectedModels = { id: templateId };

    showToast('Đã chọn template', 'success');
}
// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    document.getElementById(tabName + '-tab').classList.remove('hidden');
}
function resetAnalyzeResult() {
    // tiêu đề + giá
    document.getElementById('product-title').textContent = '';
    document.getElementById('product-price').textContent = '';

    // nội dung mô tả nhập tay
    document.getElementById('sample-text').value = '';
    document.getElementById('script-text').value = '';

    // ảnh preview
    const preview = document.getElementById('image-preview');
    preview.innerHTML = '';
    preview.classList.add('hidden');
    uploadedImages = [];

    // video preview + nút Next
    resetVideoPreview();

    // xoá prompt, URL, text đã lưu
    selectedPrompt = null;
    projectData.url = '';
    projectData.text = '';
    projectData.script = '';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function () {
    // Load saved language preference


    // Initialize step progress
    updateStepProgress();
    initializeVoiceSelection();
    filterPrompts('all');
    // Add CSS classes for voice and template buttons
    const style = document.createElement('style');
    style.textContent = `
        .voice-category-btn {
            padding: 8px 16px;
            background: rgba(31, 41, 55, 0.5);
            border: 2px solid #374151;
            border-radius: 8px;
            color: #9CA3AF;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .voice-category-btn:hover {
            border-color: #3B82F6;
            color: white;
        }
        
        .voice-category-btn.active {
            border-color: #3B82F6;
            background: rgba(59, 130, 246, 0.1);
            color: #3B82F6;
        }
        
        

        .text-style-btn, .duration-btn {
            padding: 8px 16px;
            background: rgba(31, 41, 55, 0.5);
            border: 2px solid #374151;
            border-radius: 8px;
            color: #9CA3AF;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .text-style-btn:hover, .duration-btn:hover {
            border-color: #3B82F6;
            color: white;
        }
        
        .text-style-btn.active, .duration-btn.active {
            border-color: #3B82F6;
            background: rgba(59, 130, 246, 0.1);
            color: #3B82F6;
        }
        
        .thumbnail-option {
            cursor: pointer;
            border: 2px solid transparent;
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .thumbnail-option:hover {
            border-color: #3B82F6;
        }
        
        .thumbnail-option.active {
            border-color: #3B82F6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('click', function (e) {
        // TEXT STYLE
        if (e.target.classList.contains('text-style-btn')) {
            document.querySelectorAll('.text-style-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            return;
        }

        // QUALITY OPTION
        if (e.target.classList.contains('quality-option')) {
            document.querySelectorAll('.quality-option').forEach(opt => opt.classList.remove('selected'));
            e.target.classList.add('selected');
            return;
        }

        // THUMBNAIL OPTION
        if (e.target.classList.contains('thumbnail-option')) {
            document.querySelectorAll('.thumbnail-option').forEach(opt => opt.classList.remove('active'));
            e.target.classList.add('active');
            return;
        }

        // DURATION
        if (e.target.classList.contains('duration-btn')) {
            const dur = e.target.dataset.duration;

            if (dur === '30' || dur === '60') {
                return showToast('⛔ Bạn cần kích hoạt tài khoản để sử dụng thời lượng này!', 'warning');
            }

            // Gỡ active cũ và gán active mới
            document.querySelectorAll('.duration-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Lưu lại vào projectData
            projectData.settings.duration = parseInt(dur, 10);
            console.log('⏱ duration set', projectData.settings.duration);
            return;
        }
    });
    const transitionSelect = document.getElementById('transition-select');
    if (transitionSelect) {
        transitionSelect.addEventListener('change', function () {
            const selectedOption = transitionSelect.options[transitionSelect.selectedIndex];
            const selectedText = selectedOption.textContent;
            const selectedValue = selectedOption.value;

            projectData.settings.transition = selectedValue;
            console.log(`🎬 Hiệu ứng chuyển cảnh đã chọn: ${selectedText} (${selectedValue})`);
        });
    }
    const musicSelect = document.getElementById('music-select');
    if (musicSelect) {
        musicSelect.addEventListener('change', function () {
            const selectedOption = musicSelect.options[musicSelect.selectedIndex];
            const selectedText = selectedOption.textContent;
            const selectedValue = selectedOption.value;

            projectData.settings.music = selectedValue;
            console.log(`🎵 Bạn vừa chọn: ${selectedText} (${selectedValue})`);
        });
    }
    document.getElementById('filter-gender')?.addEventListener('change', renderCharacterList);
    document.getElementById('filter-emotion')?.addEventListener('change', renderCharacterList);
    const select = document.getElementById('intro-select');
    const input = document.getElementById('intro-input');

    if (select && input) {
        select.addEventListener('change', () => {
            input.value = select.value;
        });
    }
    const upgradeBtn = document.querySelector(".upgrade-btn");
    if (upgradeBtn) {
        upgradeBtn.addEventListener("click", () => {
            window.location.href = "subscribe.html";
        });
    }
    const value = this.value;
    const video = document.getElementById("step5-video-preview");

    // ✅ Check login
    // const token = localStorage.getItem('jwt');
    // if (!token) {
    //     window.location.href = "index.html"; // Nếu không có JWT → redirect về trang chính
    // }


    const token = localStorage.getItem('jwt');
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
    video.load();


    const scriptTextarea = document.getElementById("script-text");
    const introInput = document.getElementById("intro-input");
    // ✅ Giới hạn 500 từ cho textarea script-text
    scriptTextarea?.addEventListener("input", () => {
        const text = scriptTextarea.value.trim();
        const words = text.length > 0 ? text.split(/\s+/) : [];
        // if (20 < words.length) {
        //     scriptTextarea.value = words.slice(0, 20).join(" ");
        //     showToast("Giới hạn tối thiểu 20 từ cho kịch bản");
        // }
        if (words.length > 100) {
            scriptTextarea.value = words.slice(0, 100).join(" ");
            showToast("Giới hạn tối đa 100 từ cho kịch bản");
        }
    });

    // ✅ Giới hạn 35 từ cho input intro
    introInput?.addEventListener("input", () => {
        const text = introInput.value.trim();
        const words = text.length > 0 ? text.split(/\s+/) : [];

        if (words.length > 35) {
            introInput.value = words.slice(0, 35).join(" ");
            showToast("Giới hạn tối đa 35 từ cho câu mở đầu");
        }
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
    console.log('Tinovideo Dashboard initialized successfully!');

});

// let cachedUser = null;

// async function getUserInfoOnce() {
//     if (cachedUser) return cachedUser; // ✅ Tránh gọi lại
// const authData = localStorage.getItem("auth_data");
//     if (authData) {
//         cachedUser = JSON.parse(authData);
//         return cachedUser;
//     }
//     const token = localStorage.getItem("jwt");
//     if (!token) return null;

//     try {
//         const res = await fetch(`${API_BASE_URL}/api/user`, {
//             method: "GET",
//             headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = await res.json();
//         if (data.success) {
//             cachedUser = data.user;
//             localStorage.setItem("auth_data", JSON.stringify(data.user));
//             // localStorage.setItem('userId', data.user.id)
//             // localStorage.setItem('free_claimed ', data.user.free_claimed)
//             const nameDiv = document.querySelector('[data-key="user-name"]');
//             if (nameDiv) nameDiv.textContent = data.user.name;
//             const point = document.querySelector('[data-key="point"]');
//             if (point) point.textContent = data.user.point;
//             // (Tùy chọn) Gán ảnh đại diện
//             const avatarImg = document.querySelector('[data-key="user-avatar"]');
//             if (avatarImg) avatarImg.src = data.user.avatar;
//             const userPlan = document.querySelector('[data-key="user-plan"]');
//             if (userPlan) userPlan.textContent = data.user.plan;
//             return cachedUser;
//         } else {

//             console.warn("❌ Không lấy được thông tin user:", data.error);
//             return null;
//         }
//     } catch (err) {
//         console.error("❌ Lỗi kết nối:", err);
//         return null;
//     }
// }


// function fillDataUser(user) {
//     auth_data = localStorage.getItem("auth_data")

//     const nameDiv = document.querySelector('[data-key="user-name"]');
//     if (nameDiv) nameDiv.textContent = auth_data.name;

//     const point = document.querySelector('[data-key="point"]');
//     if (point) point.textContent = auth_data.point;

//     const avatarImg = document.querySelector('[data-key="user-avatar"]');
//     if (avatarImg) avatarImg.src = auth_data.avatar;

//     const userPlan = document.querySelector('[data-key="user-plan"]');
//     if (userPlan) userPlan.textContent = auth_data.plan || "Chưa có gói";
//     console.log("1",auth_data)
//        console.log("1",nameDiv)
//      console.log("1",avatarImg)
//      console.log("1",userPlan)
// }


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

    // console.log("✅ User đã fill:", user);
}

async function getUserInfoOnce() {

    const authData = localStorage.getItem("auth_data");
    if (authData) {
        cachedUser = JSON.parse(authData);
        fillDataUser(cachedUser);
        return cachedUser;
    }
    // console.log("✅ User đã fill:", authData);
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

const SECTIONS = [
    "dashboard",
    "create",
    "projects",
    "templates",
    "affiliate",
    "settings",
    "help"
];
function showSection(name) {
    // 1️⃣ Show/Hide section
    SECTIONS.forEach(sec => {
        const el = document.getElementById(`${sec}-section`);
        if (!el) return;
        if (sec === name) el.classList.remove("hidden");
        else el.classList.add("hidden");
    });

    // 2️⃣ Cập nhật class `.active` cho sidebar-item
    document.querySelectorAll(".sidebar-item").forEach(item => {
        const onclick = item.getAttribute("onclick") || "";
        const isActive = onclick.includes(`showSection('${name}')`);
        item.classList.toggle("active", isActive);
    });
}

// Khởi động mặc định
document.addEventListener("DOMContentLoaded", () => {
    showSection("create");

});
function waitForUserElementsThenFill(user) {
    const tryFill = () => {
        // const nameEl = document.getElementById("user-name");
        const avatarEl = document.getElementById("user-avatar");
        const pointEl = document.getElementById("user-point");

        if (nameEl && avatarEl && pointEl) {
            fillUserHeader(user);
            return true;
        }
        return false;
    };

    if (tryFill()) return;

    const observer = new MutationObserver(() => {
        if (tryFill()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener("DOMContentLoaded", async () => {
    let user = null;
    const cached = localStorage.getItem("auth_data");

    if (cached) {
        user = JSON.parse(cached);

        fillDataUser(user)
        try {
            user = JSON.parse(cached);
        } catch (e) {
            console.error("Lỗi parse auth_data:", e);
        }
    }

    if (!cached) {
        try {
            user = await getUserInfoOnce();
        } catch (e) {
            console.error("Lỗi getUserInfoOnce:", e);
        }
    }


});

