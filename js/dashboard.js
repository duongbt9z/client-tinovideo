
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
// Language translations for dashboard
const dashboardTranslations = {
    vi: {
        // Navigation
        'nav-dashboard': 'Bảng điều khiển',
        'nav-create': 'Tạo Video Mới',
        'nav-projects': 'Dự Án Của Tôi',
        'nav-templates': 'Mẫu Thư Viện',
        'nav-settings': 'Cài Đặt',
        'nav-help': 'Trợ giúp',

        // User info
        'user-name': 'Demo Người dùng',
        'user-plan': 'Chuyên Nghiệp',
        'credits-remaining': 'Credits còn lại:',
        'upgrade-btn': 'Nâng cấp',

        // Header
        'main-title': 'Tạo Video AI',
        'project-subtitle': 'Dự án mới - Nhập Nội Dung',
        'new-video-btn': 'Tạo Video Mới',

        // Steps
        'step-1-title': 'Nhập Nội Dung',
        'step-2-title': 'Chọn Giọng Đọc AI',
        'step-3-title': 'Tạo kịch Bản',
        'step-4-title': 'Tạo Video',
        'step-5-title': 'Xuất Video',

        // Step 1
        'step-1-main-title': 'Bước 1: Nhập Nội Dung Sản Phẩm',
        'step-1-description': 'Nhập URL sản phẩm hoặc văn bản nội dung để tạo video',
        'tab-url': 'URL Sản phẩm',
        'tab-text': 'Nội dung Text',
        'url-label': 'URL Sản phẩm',
        'url-placeholder': 'https://shopee.vn/...',
        'analyze-btn': 'Phân tích',
        'supported-platforms': 'Nền tảng được hỗ trợ:',
        'images-label': 'Hình ảnh bổ sung (tuỳ chọn)',
        'upload-title': 'Kéo thả hoặc nhấp để tải lên',
        'upload-desc': 'Hỗ trợ JPG, PNG, WEBP. Tối đa 10 hình.',
        'text-label': 'Nội dung văn bản',
        'text-placeholder': 'Nhập mô tả sản phẩm của bạn...',
        'reset-btn': 'Đặt lại',
        'save-btn': 'Lưu dự án',
        'next-btn': 'Tiếp theo: Chọn giọng đọc',

        // Step 2
        'step-2-main-title': 'Bước 2: Chọn Giọng Đọc AI',
        'step-2-description': 'Lựa chọn giọng đọc phù hợp cho video của bạn',
        'all-voices': 'Tất cả',
        'male-voices': 'Giọng Nam',
        'female-voices': 'Giọng Nữ',
        'vietnamese-voices': 'Tiếng Việt',
        'english-voices': 'Tiếng Anh',
        'voice-settings': 'Cài đặt giọng đọc',
        'speed-label': 'Tốc độ (Bình thường)',
        'pitch-label': 'Tông giọng (Trung bình)',
        'volume-label': 'Âm lượng',
        'low': 'Thấp',
        'normal': 'Bình thường',
        'high': 'Cao',
        'sample-text-title': 'Mô Tả  về sản phẩm',
        'sample-text-placeholder': 'Xin chào! Đây là giọng đọc AI của Tinovideo. Chúng tôi sẽ giúp bạn tạo video quảng cáo tuyệt vời.',
        'preview-voice': 'Nghe thử',
        'previous-btn': 'Quay lại',
        'next-create-btn': 'Tiếp theo: Tạo video',

        // Step 3
        'step-3-main-title': 'Bước 3: kịch bản ',
        'step-3-description': 'Chọn template và tùy chỉnh video theo ý muốn',
        'template-gallery': 'Thư viện Template',
        'video-preview': 'Xem trước video',
        'preview-placeholder': 'Video preview sẽ hiển thị ở đây',
        'customization': 'Tạo Kịch Bản',
        'background-music': 'Nhạc nền',
        'no-music': 'Không có nhạc',
        'text-style': 'Kiểu chữ',
        'transitions': 'Hiệu ứng chuyển cảnh',
        'fade': 'Fade',
        'slide': 'Slide',
        'zoom': 'Zoom',
        'dissolve': 'Dissolve',
        'video-duration': 'Thời lượng video',
        'generate-video': 'Tạo Video AI',
        'generation-time': 'Quá trình tạo video sẽ mất 2-3 phút',
        'next-export-btn': 'Tiếp theo: Xuất video',
        // Step 4
        'step-3-main-title': 'Bước 3: Tạo Video',
        'step-3-description': 'Chọn template và tùy chỉnh video theo ý muốn',
        'template-gallery': 'Thư viện Template',
        'video-preview': 'Xem trước video',
        'preview-placeholder': 'Video preview sẽ hiển thị ở đây',
        'customization': 'Tùy chỉnh',
        'background-music': 'Nhạc nền',
        'no-music': 'Không có nhạc',
        'text-style': 'Kiểu chữ',
        'transitions': 'Hiệu ứng chuyển cảnh',
        'fade': 'Fade',
        'slide': 'Slide',
        'zoom': 'Zoom',
        'dissolve': 'Dissolve',
        'video-duration': 'Thời lượng video',
        'generate-video': 'Tạo Video AI',
        'generation-time': 'Quá trình tạo video sẽ mất 2-3 phút',
        'next-export-btn': 'Tiếp theo: Xuất video',

        // Step 5
        'step-4-main-title': 'Bước 4: Xuất Video',
        'step-4-description': 'Tùy chỉnh chất lượng và tải xuống video của bạn',
        'video-ready': 'Video đã sẵn sàng!',
        'video-ready-desc': 'Video AI của bạn đã được tạo thành công',
        'final-preview': 'Xem trước cuối cùng',
        'final-video-ready': 'Video đã hoàn thành',
        'play-video': 'Phát video',
        'export-settings': 'Cài đặt xuất',
        'video-quality': 'Chất lượng video',
        'video-format': 'Định dạng',
        'thumbnail': 'Thumbnail',
        'download-options': 'Tùy chọn tải xuống',
        'download-video': 'Tải Video',
        'share-video': 'Chia sẻ',
        'save-cloud': 'Lưu Cloud',
        'create-new': 'Tạo video mới',

        // Other sections
        'dashboard-title': 'Bảng điều khiển',
        'projects-title': 'Dự Án Của Tôi',
        'templates-title': 'Mẫu Thư Viện',
        'settings-title': 'Cài Đặt',
        'help-title': 'Trợ giúp',

        // Loading
        'processing': 'Đang xử lý...',
        'processing-desc': 'AI đang tạo video cho bạn',
        'processing-desc-script': 'AI đang tạo kịch bản cho bạn'
    },
    en: {
        // Navigation
        'nav-dashboard': 'Dashboard',
        'nav-create': 'Create New Video',
        'nav-projects': 'My Projects',
        'nav-templates': 'Template Library',
        'nav-settings': 'Settings',
        'nav-help': 'Help',

        // User info
        'user-name': 'Demo User',
        'user-plan': 'Professional',
        'credits-remaining': 'Credits remaining:',
        'upgrade-btn': 'Upgrade',

        // Header
        'main-title': 'Create AI Video',
        'project-subtitle': 'New project - Input Content',
        'new-video-btn': 'Create New Video',

        // Steps
        'step-1-title': 'Input Content',
        'step-2-title': 'Choose AI Voice',
        'step-3-title': 'Create Video',
        'step-4-title': 'Export Video',

        // Step 1
        'step-1-main-title': 'Step 1: Input Product Content',
        'step-1-description': 'Enter product URL or text content to create video',
        'tab-url': 'Product URL',
        'tab-text': 'Text Content',
        'url-label': 'Product URL',
        'url-placeholder': 'https://shopee.vn/...',
        'analyze-btn': 'Analyze',
        'supported-platforms': 'Supported platforms:',
        'images-label': 'Additional images (optional)',
        'upload-title': 'Drag & drop or click to upload',
        'upload-desc': 'Support JPG, PNG, WEBP. Maximum 10 images.',
        'text-label': 'Text content',
        'text-placeholder': 'Enter your product description...',
        'reset-btn': 'Reset',
        'save-btn': 'Save project',
        'next-btn': 'Next: Choose voice',

        // Step 2
        'step-2-main-title': 'Step 2: Choose AI Voice',
        'step-2-description': 'Select suitable voice for your video',
        'all-voices': 'All',
        'male-voices': 'Male Voices',
        'female-voices': 'Female Voices',
        'vietnamese-voices': 'Vietnamese',
        'english-voices': 'English',
        'voice-settings': 'Voice settings',
        'speed-label': 'Speed (Normal)',
        'pitch-label': 'Pitch (Medium)',
        'volume-label': 'Volume',
        'low': 'Low',
        'normal': 'Normal',
        'high': 'High',
        'sample-text-title': 'Sample text',
        'sample-text-placeholder': 'Hello! This is Tinovideo AI voice. We will help you create amazing promotional videos.',
        'preview-voice': 'Preview',
        'previous-btn': 'Previous',
        'next-create-btn': 'Next: Create video',

        // Step 3
        'step-3-main-title': 'Step 3: Create Video',
        'step-3-description': 'Choose template and customize your video',
        'template-gallery': 'Template Gallery',
        'video-preview': 'Video preview',
        'preview-placeholder': 'Video preview will show here',
        'customization': 'Customization',
        'background-music': 'Background music',
        'no-music': 'No music',
        'text-style': 'Text style',
        'transitions': 'Transitions',
        'fade': 'Fade',
        'slide': 'Slide',
        'zoom': 'Zoom',
        'dissolve': 'Dissolve',
        'video-duration': 'Video duration',
        'generate-video': 'Generate AI Video',
        'generation-time': 'Video generation will take 2-3 minutes',
        'next-export-btn': 'Next: Export video',

        // Step 4
        'step-4-main-title': 'Step 4: Export Video',
        'step-4-description': 'Customize quality and download your video',
        'video-ready': 'Video is ready!',
        'video-ready-desc': 'Your AI video has been created successfully',
        'final-preview': 'Final preview',
        'final-video-ready': 'Video completed',
        'play-video': 'Play video',
        'export-settings': 'Export settings',
        'video-quality': 'Video quality',
        'video-format': 'Format',
        'thumbnail': 'Thumbnail',
        'download-options': 'Download options',
        'download-video': 'Download Video',
        'share-video': 'Share',
        'save-cloud': 'Save to Cloud',
        'create-new': 'Create new video',

        // Other sections
        'dashboard-title': 'Dashboard',
        'projects-title': 'My Projects',
        'templates-title': 'Template Library',
        'settings-title': 'Settings',
        'help-title': 'Help',

        // Loading
        'processing': 'Processing...',
        'processing-desc': 'AI is creating your video'
    }
};

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
// function resetVideoPreview() {
//     window.latestVideoUrl = null;               // quên link cũ
//     const videoEl = document.getElementById('videoPreview');
//     document.getElementById('step3-next').disabled = true; // khoá nút “Next”

//     /* (tuỳ chọn) reset luôn preview bước 4 nếu trước đó đã hiển thị */
//     const finalPreview = document.querySelector('#step-4-content .preview-area');
//     if (finalPreview) finalPreview.innerHTML = `
//       <div class="text-center text-gray-400 py-12">
//         <i class="fas fa-play-circle text-6xl mb-4"></i><br>
//         <span data-key="preview-placeholder">Video preview sẽ hiển thị ở đây</span>
//       </div>`;
// }

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
    // Update filter buttons
    document.querySelectorAll('.voice-category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Filter logic would go here
    showToast(`Lọc giọng đọc: ${filter}`, 'info');
}

// Voice settings
function updateSpeed(value) {
    projectData.settings.speed = parseFloat(value);
}
// let currentAudio = null;

// function playVoiceDemo(filename) {
//     const url = `/demo-voices/${filename}`;
//     if (currentAudio) {
//         currentAudio.pause();
//         currentAudio = null;
//     }

//     currentAudio = new Audio(url);
//     currentAudio.play().catch((err) => {
//         console.error("Không thể phát giọng đọc:", err);
//         showToast("Lỗi phát giọng đọc", "error");
//     });
// }
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



function selectPrompt(id, el) {
    document.querySelectorAll('.prompt-card').forEach(c => c.classList.remove('ring-2', 'ring-green-500'));
    el.classList.add('ring-2', 'ring-green-500');
    selectedPrompt = PROMPTS.find(p => p.id === id);
    showToast('Đã chọn kịch bản', 'success');
}
function filterPrompts(cat) {
    document.querySelectorAll('.prompt-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
    document.querySelectorAll('.prompt-card').forEach(card => {
        card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
    });
}


// function nextStep() {
//     const steps = document.querySelectorAll('.step-content');
//     if (currentStep < steps.length) {
//         if (!validateCurrentStep()) return;
//         steps[currentStep - 1].classList.add('hidden');
//         steps[currentStep].classList.remove('hidden');
//         currentStep++;
//         updateStepProgress();
//         if (currentStep === 2) initializeVoiceSelection();
//         if (currentStep === 3) initializePromptGallery();
//         if (currentStep === 4) renderCharacterList();
//         if (currentStep === 5) generateIntro();
//         if (currentStep === 6 && window.latestVideoUrl) {
//             const finalPreview = document.querySelector('#step-5-content .preview-area');
//             // Xoá placeholder cũ (nếu chưa xoá)
//             finalPreview.innerHTML = '';
//             // Tạo video
//             const vid = document.createElement('video');
//             vid.src = window.latestVideoUrl;
//             vid.controls = true;
//             vid.className = 'w-full max-w-2xl mx-auto rounded shadow';
//             finalPreview.appendChild(vid);
//         }
//     }
// }
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
// chuyển mà 
// function validateCurrentStep() {
//     switch (currentStep) {
//         case 1:
//             const url = document.getElementById('product-url').value.trim();
//             const text = document.getElementById('product-text').value.trim();
//             // if (!url && !text) {
//             //     showToast('Vui lòng nhập URL sản phẩm hoặc nội dung text', 'warning');
//             //     return false;
//             // }
//             const previewContainer = document.getElementById('image-preview');
//             const hasPreview = previewContainer.querySelector('div.relative.group');
//             // if (!hasPreview) {
//             //     showToast('Vui lòng thêm hình ảnh để xem trước', 'warning');
//             //     return false;
//             // }
//             projectData.url = url;
//             projectData.text = text;
//             break;
//         case 2:
//             // if (!selectedVoice) {
//             //     showToast('Vui lòng chọn giọng đọc AI', 'warning');
//             //     return false;
//             // }
//             projectData.voice = selectedVoice;
//             break;
//         case 3:
//             // const scriptContent = document.getElementById('script-text').value.trim();



//             // 1) Phải chọn kịch bản
//             // if (!selectedPrompt) {
//             //     showToast('Vui lòng chọn kịch bản', 'warning');
//             //     return false;
//             // }
//             // 2) Phải có nội dung trong #script-text
//             const scriptContent = document.getElementById('script-text').value.trim();
//             // if (!scriptContent) {
//             //     showToast('Vui lòng tạo kịch bản trước khi tiếp tục', 'warning');
//             //     return false;
//             // }
//             projectData.prompt = selectedPrompt;
//             projectData.script = scriptContent;
//             break;
//         case 4:

//             // if (!selectedModels) {
//             //     showToast('Vui lòng chọn template', 'warning');
//             //     return false;
//             // }
//             projectData.template = selectedModels;
//             break;
//         case 5:
//             // if (!selectedModels) {
//             //     showToast('Vui lòng chọn template', 'warning');
//             //     return false;
//             // }
//             projectData.template = selectedModels;
//             break;
//         case 6:
//             // if (!selectedModels) {
//             //     showToast('Vui lòng chọn template', 'warning');
//             //     return false;
//             // }
//             projectData.template = selectedModels;
//             break;
//         case 7:
//             // if (!selectedModels) {
//             //     showToast('Vui lòng chọn template', 'warning');
//             //     return false;
//             // }
//             projectData.template = selectedModels;
//             break;
//     }
//     return true;
// }
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
            if (!selectedPrompt) {
                showToast('Vui lòng chọn mẫu kịch bản', 'warning');
                return false;
            }
            const scriptContent = document.getElementById('script-text').value.trim();
            const wordCount = scriptContent.split(/\s+/).length;
            if (!scriptContent) {
                showToast('Vui lòng tạo kịch bản trước khi tiếp tục', 'warning');
                return false;
            }
            if (wordCount > 1000) {
                showToast('Kịch bản vượt quá 1000 từ. Vui lòng rút gọn!', 'warning');
                return false;
            }
            projectData.prompt = selectedPrompt;
            projectData.script = scriptContent;
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
            if (!selectedModels) {
                showToast('Vui lòng chọn nhân vật AI', 'warning');
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
    const voices = [
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
            id: 'B2e3SszxeBIVZp7k0tVh',
            name: 'Mingh IG',
            gender: 'female',
            language: 'vietnamese',
            accent: 'Miền Bắc',
            demo: 'minhig.mp3'
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
    ];

    voiceGrid.innerHTML = voices.map(v => `
    <div class="voice-card ${v.id === selectedVoice?.id ? 'selected' : ''}"
         onclick="selectVoice('${v.id}', this)">
      <div class="flex items-center mb-3">
        <div class="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full
                    flex items-center justify-center mr-3">
          <i class="fas fa-female text-white text-lg"></i>
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

/* ==================== PROMPT GALLERY ==================== */
const PROMPTS = [
    {
        id: 'review-urgent-solution',
        cat: 'review',
        title: 'Review “Giải pháp cho vấn đề cấp bách”',
        text: 'Nêu vấn đề nhức nhối → giới thiệu giải pháp → kêu gọi hành động',
        icon: 'images/icons/icons8-qa-64.png',
        gradient: 'gradient-ai-blue',      // từ chàm đậm → xanh lam nhẹ
        textColor: 'text-white'
    },
    {
        id: 'review-before-after',
        cat: 'review',
        title: 'Review “So sánh trước và sau”',
        text: 'Hiển thị bằng chứng trực quan (ảnh/video trước–sau) → nhấn mạnh thay đổi',
        icon: 'images/icons/ss.png',
        gradient: 'gradient-ai-purple',    // từ tím đậm → hồng nhạt
        textColor: 'text-white'
    },
    {
        id: 'review-testimonial',
        cat: 'review',
        title: 'Review “Chứng thực từ khách hàng thực”',
        text: 'Trích dẫn cảm nhận khách hàng, chèn cảnh sử dụng sản phẩm',
        icon: 'images/icons/dialogue.png',
        gradient: 'gradient-ai-cyan',      // từ lam ngọc → xanh cyan
        textColor: 'text-black'
    },
    {
        id: 'review-challenge',
        cat: 'review',
        title: 'Review “Thử thách thực tế”',
        text: 'Thực hiện thử thách/benchmark và trình bày kết quả ấn tượng',
        icon: 'images/icons/challenge.png',
        gradient: 'bg-gradient-to-r from-green-500 to-blue-500',     // từ xanh ngọc → xanh lá pastel
        textColor: 'text-black'
    },
    {
        id: 'review-journey',
        cat: 'review',
        title: 'Review “Hành trình khám phá sản phẩm”',
        text: 'Kể hành trình trải nghiệm từng bước, nêu điểm nhấn & cảm xúc',
        icon: 'images/icons/discover.png',
        gradient: 'gradient-ai-indigo',    // từ chàm → xanh tím dịu
        textColor: 'text-white'
    },
    {
        id: 'review-expert-talk',
        cat: 'review',
        title: 'Review “Đối thoại với chuyên gia”',
        text: 'Phỏng vấn ngắn chuyên gia, trích ý kiến chuyên môn + lợi ích',
        icon: 'images/icons/job-interview.png',
        gradient: 'gradient-ai-blue',
        textColor: 'text-white'
    },
    {
        id: 'review-qa',
        cat: 'review',
        title: 'Review “Phong cách Q&A”',
        text: 'Liệt kê câu hỏi phổ biến → trả lời ngắn gọn, minh họa trực quan',
        icon: 'images/icons/verification.png',
        gradient: 'gradient-ai-purple',
        textColor: 'text-white'
    },
    {
        id: 'review-lifestyle',
        cat: 'review',
        title: 'Review “Lối sống lý tưởng”',
        text: 'Mô tả lối sống/hoạt cảnh, lồng ghép sản phẩm như giải pháp tối ưu',
        icon: 'images/icons/idealistic.png',
        gradient: 'gradient-ai-cyan',
        textColor: 'text-black'
    },
    {
        id: 'review-success-story',
        cat: 'review',
        title: 'Review “Câu chuyện thành công”',
        text: 'Kể câu chuyện thành công có thật, nhấn vai trò sản phẩm, chốt CTA',
        icon: 'images/icons/success.png',
        gradient: 'gradient-ai-green',
        textColor: 'text-black'
    },
    {
        id: 'review-flash-sale',
        cat: 'review',
        title: 'Review “Flash Sale Countdown”',
        text: 'Đếm ngược Flash-sale, nêu lợi ích nhanh, tạo FOMO, kêu gọi mua ngay',
        icon: 'images/icons/flash-sale.png',
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

    if (wordCount > 1000) {
        showToast(`Kịch bản đang có ${wordCount} từ. Vui lòng rút gọn dưới 1000 từ để tiếp tục.`, 'warning');
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

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '×';
        closeBtn.className =
            'absolute top-1 right-1 w-6 h-6 rounded-full bg-black bg-opacity-60 text-white font-bold flex items-center justify-center text-sm hover:bg-opacity-90 transition-all';
        closeBtn.addEventListener('click', () => wrapper.remove());

        wrapper.appendChild(img);
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

function handleImageUpload(event) {
    const files = event.target.files;
    const preview = document.getElementById('image-preview');

    if (!files || files.length === 0) return;

    // Đếm ảnh đang có
    const currentImageCount = preview.querySelectorAll('img').length;
    const maxAllowed = 10;

    if (currentImageCount >= maxAllowed) {
        showToast(`Bạn chỉ được chọn tối đa ${maxAllowed} ảnh`, 'warning');
        return;
    }

    const remainingSlots = maxAllowed - currentImageCount;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    preview.classList.remove('hidden');

    filesToAdd.forEach((file, index) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUri = e.target.result;
            const wrapper = document.createElement('div');
            wrapper.className = 'relative group';

            const img = document.createElement('img');
            // img.src = e.target.result;
            img.src = dataUri;
            img.alt = file.name;
            img.dataset.realpath = dataUri;
            img.className = 'rounded w-full h-auto object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105';

            img.addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = img.src;
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
            closeBtn.addEventListener('click', () => {
                wrapper.remove();
            });

            wrapper.appendChild(img);
            wrapper.appendChild(closeBtn);
            preview.appendChild(wrapper);

            uploadedImages.push(file);
        };
        reader.readAsDataURL(file);
    });

}

function generateScript() {
    const textarea = document.getElementById('sample-text');
    const outTextarea = document.getElementById('script-text');
    const promptTemplate = (selectedPrompt?.text || '').trim();
    const userText = textarea.value.trim();
    const duration = projectData.settings.duration;

    if (!promptTemplate) {
        showToast('Vui lòng CHỌN kịch bản mẫu trước khi tạo kịch bản', 'warning');
        return;
    }
    if (duration == 15) {
        max_char_count = 220;
    } else if (duration == 30) {
        max_char_count = 450;
    } else if (duration == 60) {
        max_char_count = 450;
    }

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

function handleGenerateSuccess(data) {
  currentVideoUrl = data.video_url || '';
  if (!currentVideoUrl) {
    showToast('Không có video_url trong phản hồi', 'error');
    return;
  }

  // Xóa preview cũ (nếu có)
  const wrapper = document.getElementById('video-wrapper');
  wrapper.innerHTML = '';

  // Tạo iframe preview
  const iframe = document.createElement('iframe');
  iframe.src = currentVideoUrl.includes('/view')
              ? currentVideoUrl.replace('/view', '/preview')
              : currentVideoUrl;
  iframe.width  = '100%';
  iframe.height = '480';
  iframe.allow  = 'autoplay; fullscreen';
  iframe.className = 'rounded';
  wrapper.appendChild(iframe);
}

async function generateVideo() {
    const preview = document.getElementById('image-preview');
    const imageSet = new Set();
    const image_paths = Array.from(preview.querySelectorAll('img'))
        .map(img => img.dataset.realpath || img.src)
        .filter(p => !imageSet.has(p) && imageSet.add(p));

    const script = projectData.script || document.getElementById('script-text').value.trim();
    const transition = projectData.settings.transition || 'fade';
    const music = projectData.settings.music || 'none';
    const overlay = document.getElementById('loading-overlay');
    if (!script) return showToast('Vui lòng tạo kịch bản trước', 'warning');
    if (image_paths.length === 0) return showToast('Vui lòng chọn ít nhất 1 ảnh', 'warning');
    let text = document.getElementById("intro-input").value.trim();
    if (!text) {
        text = document.getElementById("intro-select").value;
    }

    const sample = projectData.character;
    overlay.classList.remove('hidden');
    // fix cứng
    let y_offset = 150;
    let font_path = "arial.ttf";
    let font_size = 48;
    // Tạo payload gửi backend
    const body = {
        script,
        image_paths,
        voice_id: projectData.voice?.id,
        transition,
        text,
        bg_music: music !== 'none' ? music : null,
        sample, y_offset, font_path, font_size
    };
    const token = localStorage.getItem('jwt');
    let data;

    try {
        const res = await fetch(`${API_BASE_URL}/api/generate-full-video`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        data = await res.json();
    } catch (err) {
        overlay.classList.add('hidden');
        console.error(err);
        return showToast('Lỗi kết nối khi tạo video', 'error');
    }

    overlay.classList.add('hidden');

    if (!data.success) {
        return showToast(data.message || data.error || 'Tạo video thất bại', 'error');
    }

    showToast('🎉 Tạo video thành công!', 'success');

    // ==== Hiển thị video lên iframe
    const wrapper = document.getElementById('video-wrapper');
    wrapper.innerHTML = '';

    const videoUrl = data.video_url;
    currentVideoUrl=videoUrl;
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl.includes('/view') ? videoUrl.replace('/view', '/preview') : videoUrl;
    iframe.width = '100%';
    iframe.height = '480';
    iframe.allow = 'autoplay; fullscreen';
    iframe.className = 'rounded';
    wrapper.appendChild(iframe);

    // ==== Nút tải video
    const downloadBtn = document.getElementById('download-video-btn');
    if (downloadBtn) {
        downloadBtn.classList.remove('hidden');
        downloadBtn.onclick = () => window.open(videoUrl, '_blank');
    }

    // ==== Nút tải giọng đọc (nếu có)
    const audioUrl = data.voice_url;
    const downloadAudioBtn = document.getElementById('download-audio-btn');
    if (audioUrl && downloadAudioBtn) {
        downloadAudioBtn.classList.remove('hidden');
        downloadAudioBtn.onclick = () => window.open(audioUrl, '_blank');
    }

    // ==== Lưu vào state
    projectData.video_url = videoUrl;
    projectData.voice_url = audioUrl;
    // document.getElementById('step3-next').disabled = false;
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
    const savedLanguage = localStorage.getItem('tinovideo-language') || 'vi';
    switchLanguage(savedLanguage);

    // Initialize step progress
    updateStepProgress();

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
    const token = localStorage.getItem('jwt');
    if (!token) {
        window.location.href = "index.html"; // Nếu không có JWT → redirect về trang chính
    }
    video.load();


    const scriptTextarea = document.getElementById("script-text");
    const introInput = document.getElementById("intro-input");
    // ✅ Giới hạn 500 từ cho textarea script-text
    scriptTextarea?.addEventListener("input", () => {
        const text = scriptTextarea.value.trim();
        const words = text.length > 0 ? text.split(/\s+/) : [];

        if (words.length > 500) {
            scriptTextarea.value = words.slice(0, 500).join(" ");
            showToast("Giới hạn tối đa 500 từ cho kịch bản");
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

let cachedUser = null;

async function getUserInfoOnce() {
    if (cachedUser) return cachedUser; // ✅ Tránh gọi lại

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
            console.log('name', data.user.name)
            console.log('name', data.user.avatar)
            localStorage.setItem('userId',data.user.id)
            const nameDiv = document.querySelector('[data-key="user-name"]');
            if (nameDiv) nameDiv.textContent = data.user.name;
            const point = document.querySelector('[data-key="point"]');
            if (point) point.textContent = data.user.point;
            // (Tùy chọn) Gán ảnh đại diện
            const avatarImg = document.querySelector('[data-key="user-avatar"]');
            if (avatarImg) avatarImg.src = data.user.avatar;
            return cachedUser;
        } else {
            // if (!user) {
            //     window.location.href = "login.html";
            //     return;
            // }
            console.warn("❌ Không lấy được thông tin user:", data.error);
            return null;
        }
    } catch (err) {
        console.error("❌ Lỗi kết nối:", err);
        return null;
    }
}
