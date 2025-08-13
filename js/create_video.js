const dashboardTranslations = {
  "vi": {
    "page-title": "Tạo video - Tinovideo",
    "lang-vi": "VI",
    "lang-en": "EN",
    "brand-name": "Tinovideo",
    "nav-create": "Tạo Video Mới",
    "nav-create-veo": "Tạo video veo",
    "nav-edit": "Edit Video",
    "nav-affiliate": "Affiliate",
    "nav-settings": "Cài Đặt",
    "nav-help": "Trợ giúp",
    "credits-remaining": "Credits còn lại:",
    "upgrade-btn": "Nâng cấp",
    "page-header": "Tạo Video",
    "form-title": "Tạo Video bằng AI Veo",
    "label-duration": "Thời lượng video:",
    "duration-16": "16s",
    "duration-24": "24s",
    "duration-32": "32s",
    "label-product-name": "Tên sản phẩm:",
    "placeholder-product-name": "Nhập tên sản phẩm...",
    "btn-generate-script": "Tạo kịch bản cho video",
    "note-script": "Kịch bản sẽ sinh dựa trên tên sản phẩm.",
    "btn-upload": "📂 Chọn ảnh",
    "btn-generate-video": "🚀 TẠO VIDEO",
    "status-ready": "🟢 Sẵn sàng.",
    "label-log": "📝 Log chạy:",
    "btn-clear-log": "Xoá log"
  },
  "en": {
    "page-title": "Create videos - Tinovideo",
    "lang-vi": "VI",
    "lang-en": "EN",
    "brand-name": "Tinovideo",
    "nav-create": "Create New Video",
    "nav-create-veo": "Create Veo Video",
    "nav-edit": "Edit Video",
    "nav-affiliate": "Affiliate",
    "nav-settings": "Settings",
    "nav-help": "Help",
    "credits-remaining": "Remaining credits:",
    "upgrade-btn": "Upgrade",
    "page-header": "Create Video",
    "form-title": "Create Video with AI Veo",
    "label-duration": "Video duration:",
    "duration-16": "16s",
    "duration-24": "24s",
    "duration-32": "32s",
    "label-product-name": "Product name:",
    "placeholder-product-name": "Enter product name...",
    "btn-generate-script": "Generate script for Videos",
    "note-script": "The script will be generated based on the product name.",
    "btn-upload": "📂 Choose images",
    "btn-generate-video": "🚀 CREATE VIDEO",
    "status-ready": "🟢 Ready.",
    "label-log": "📝 Execution log:",
    "btn-clear-log": "Clear log"
  }
}

const uploadBtn = document.getElementById("uploadBtn");
const imageUpload = document.getElementById("imageUpload");
const imageList = document.getElementById("imageList");
const generateBtn = document.getElementById("generateBtn");
const logOutput = document.getElementById("logOutput");
const clearBtn = document.getElementById("clearBtn");
const statusLabel = document.getElementById("statusLabel");
const durationSelect = document.getElementById("durationSelect");
const productNameInput = document.getElementById("productName");
const productNameSection = document.getElementById("productNameSection");
const generateScriptBtn = document.getElementById("generateScriptBtn");

const uploadedFiles = []; // ✅ quản lý ảnh ở đây
const maxImagesMap = { 16: 2, 24: 3, 32: 4 };


uploadBtn.addEventListener("click", () => {
  const productName = productNameInput.value.trim();
  if (!selectedDuration) {
    showToast("Vui Lòng chọn thời gian video trước", 'warning')
    return;
  }
  if (!productName) {
    showToast("Vui Lòng Nhập Tên Sản Phầm trước", 'warning')
    productNameInput.focus();
    return;
  }


  imageUpload.click();
});
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
// durationSelect.addEventListener("change", () => {
//   const duration = parseInt(durationSelect.value);
//   productNameSection.style.display = "block";
// });
let selectedDuration = null;
const buttons = document.querySelectorAll('.duration-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('bg-blue-500'));
    buttons.forEach(b => b.classList.add('bg-gray-600'));

    btn.classList.remove('bg-gray-600');
    btn.classList.add('bg-blue-500');

    selectedDuration = parseInt(btn.dataset.value); // ✅ lưu giá trị duration
    console.log("Thời lượng đã chọn:", selectedDuration);


    // console.log("Thời lượng đã chọn:", selectedDuration);
  });
});
imageUpload.addEventListener("change", () => {
  // const duration = parseInt(durationSelect.value);
  const maxImages = maxImagesMap[selectedDuration] || Infinity;

  const currentCount = imageList.querySelectorAll("li").length;

  const files = Array.from(imageUpload.files);
  const remainingSlots = maxImages - currentCount;
  const filesToAdd = files.slice(0, remainingSlots);

  if (filesToAdd.length < files.length) {
    showToast(`Bạn chỉ có thể chọn tối đa ${maxImages} ảnh cho video ${duration}s.`, 'warning')
  }

  for (const file of filesToAdd) {
    uploadedFiles.push(file); // ✅ lưu file vào mảng đồng bộ

    const reader = new FileReader();
    reader.onload = () => {
      const wrapper = document.createElement("li");

      const imageWrapper = document.createElement("div");
      imageWrapper.style.position = "relative";
      imageWrapper.style.display = "inline-block";

      const imageEl = document.createElement("img");
      imageEl.src = reader.result;
      imageEl.className = "image-preview";

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×";
      removeBtn.title = "Xoá ảnh này";
      removeBtn.className = "remove-overlay-btn";
      removeBtn.addEventListener("click", () => {
        const index = Array.from(imageList.children).indexOf(wrapper);
        if (index !== -1) {
          uploadedFiles.splice(index, 1); // ✅ xoá file tương ứng
        }
        wrapper.remove();
      });

      imageWrapper.appendChild(imageEl);
      imageWrapper.appendChild(removeBtn);
      wrapper.appendChild(imageWrapper);
      imageList.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  }

  imageUpload.value = ""; // 👈 reset input để chọn lại ảnh sau
});

clearBtn.addEventListener("click", () => logOutput.value = "");
let generatedScenes = [];
generateScriptBtn.addEventListener("click", async () => {
  const productName = productNameInput.value.trim();
  const items = imageList.querySelectorAll("li");
  // 🛡️ Check thời lượng
  if (!selectedDuration) {
    showToast("Vui lòng chọn thời gian video", 'warning');
    return;
  }

  // 🛡️ Check tên sản phẩm
  if (!productName) {
    showToast("Vui lòng nhập tên sản phẩm.", 'warning');
    return;
  }
  userId = localStorage.getItem("userId");
  try {
    log("🧠 Đang tạo kịch bản cho ảnh...");
    const res = await fetch("https://admin.tinovideo.com/api/generate-veo-script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: productName, duration: selectedDuration, userId: userId }),
    });

    const data = await res.json();
    if (!res.ok) {
      // ✅ Lấy lỗi từ API
      let errMsg = data.error || data.message || "Không thể tạo kịch bản";
      showToast(`Lỗi: ${errMsg}`, 'error');
      throw new Error(errMsg);
    }
    showToast("Tạo kịch bản thành công", 'success')
    const scenes = data.scenes || [];
    if (scenes.length === 0) throw new Error("Không có scene nào được trả về");
    generatedScenes = scenes;
    items.forEach((li, idx) => {
      const scene = scenes[idx];
      if (!scene) return;

      let span = li.querySelector("span.prompt-input");
      if (!span) {
        span = document.createElement("span");
        span.className = "prompt-input";
        li.appendChild(span);
      }
      span.value = scene.prompt || "";
    });

    log("✅ Kịch bản đã được tạo và chèn vào ảnh.");
  } catch (err) {
    log("❌ Lỗi: " + err.message);
    // showToast("Lỗi tạo kịch bản: ", 'error');
  }
});

// generateBtn.addEventListener("click", async () => {
//   const userId = "abc123"; // 👉 Thay bằng user_id thực tế của bạn
//   const items = imageList.querySelectorAll("li");

//   if (items.length === 0) return alert("Vui lòng chọn ít nhất một ảnh.");
//   if (items.length !== uploadedFiles.length) return alert("Dữ liệu ảnh không đồng bộ. Vui lòng chọn lại ảnh.");

//   const formData = new FormData();
//   formData.append("user_id", userId);
//   const prompts = [{
//         "aspectRatio": "16:9",
//         "durationSeconds": 8,
//         "enhancePrompt": true,
//         "generateAudio": true,
//         "negativePrompt": "blurry, low quality, distorted, watermark, cartoonish, static camera, dull colors, low light, text on screen, subtitles, captions, bad anatomy, bad facial features, unprofessional look, overly sexualized, emphasizing body shape, revealing clothing.",
//         "personGeneration": "allow_young_adult",
//         "prompt": "A young adult woman, with a trendy and stylish appearance, is casually posing in a well-lit modern apartment. She's wearing the Justdun B18 cotton long-fiber stretch bodycon t-shirt. Close-up shots highlighting the soft, smooth texture of the shirt and its comfortable fit.  Tracking shot showcasing the shirt's form-fitting design without emphasizing body details. The overall mood is relaxed and confident. The background is slightly blurred, focusing attention on the model and the shirt.",
//         "seed": 7872,
//         "voiceOver": "Chào cả nhà! Mình đang diện em áo thun Justdun B18 siêu xinh này nè! Chất liệu cotton lông mịn, mặc lên mát rượi lại co giãn thoải mái cực luôn. Form ôm body nhưng không hề khó chịu nha!  Đẹp xuất sắc, lại chất lượng nữa chứ!"
//     },
//     {
//         "aspectRatio": "16:9",
//         "durationSeconds": 8,
//         "enhancePrompt": true,
//         "generateAudio": true,
//         "negativePrompt": "blurry, low quality, distorted, watermark, cartoonish, static camera, dull colors, low light, text on screen, subtitles, captions, bad anatomy, bad facial features, unprofessional look, overly sexualized, emphasizing body shape, revealing clothing, awkward posing.",
//         "personGeneration": "allow_young_adult",
//         "prompt": "The same young adult woman is now moving dynamically in a stylish cafe setting.  She's gracefully interacting with her surroundings, possibly sipping coffee or looking at her phone, showcasing the shirt's comfort and flexibility through natural movement. Quick cuts and dynamic angles are used to emphasize the versatility and everyday wearability of the shirt. The camera uses a combination of close-up shots and wider shots, showing the shirt in various poses and lighting conditions.  The overall aesthetic is modern and trendy.",
//         "seed": 7873,
//         "voiceOver": "Mặc đi học, đi chơi hay cà phê chill cùng bạn bè đều ok hết nha! Chất cotton này mặc cả ngày cũng không bị bí đâu.  Justdun B18 – áo thun quốc dân đây rồi!  Link mua hàng ở dưới nha mọi người, nhanh tay nào!"
//     }]

//   for (let i = 0; i < items.length; i++) {
//     const file = uploadedFiles[i];
//     if (!file) continue;
//     formData.append("images", file);
//     formData.append("prompts", JSON.stringify(prompts[i]));
//   }

//   log("🔄 Đang gửi yêu cầu tạo video...");
//   statusLabel.textContent = "⏳ Đang tạo video...";
//   generateBtn.disabled = true;

//   try {
//     const res = await fetch("https://admin.tinovideo.com/api/generate-veo", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await res.json();
//     if (res.ok) {
//       log("✅ " + result.message);
//       statusLabel.textContent = "✅ Thành công!";
//     } else {
//       log("❌ Lỗi: " + (result.error || "Không xác định"));
//       statusLabel.textContent = "❌ Lỗi khi tạo video";
//     }
//   } catch (err) {
//     log("❌ Lỗi kết nối: " + err.message);
//     statusLabel.textContent = "❌ Lỗi hệ thống";
//   }

//   generateBtn.disabled = false;
// });
generateBtn.addEventListener("click", async () => {
  const userId = localStorage.getItem("userId");
  const items = imageList.querySelectorAll("li");
  const productName = productNameInput.value.trim();
  if (!selectedDuration) {
    showToast("Vui Lòng chọn thời gian video trước", 'warning')
    return;
  }
  if (!productName) {
    showToast("Vui Lòng Nhập Tên Sản Phầm trước", 'warning')
    productNameInput.focus();
    return;
  }
  if (items.length === 0) return showToast("Vui lòng chọn ít nhất một ảnh.", "warning");
  if (items.length !== uploadedFiles.length) return showToast("Dữ liệu ảnh không đồng bộ. Vui lòng chọn lại ảnh.", "error");

  const formData = new FormData();
  formData.append("user_id", userId);

  // 🔹 Lấy prompt & voiceOver từ các textarea đã gắn khi generate script
  for (let i = 0; i < items.length; i++) {
    const file = uploadedFiles[i];
    if (!file) continue;

    const prompt = items[i].querySelector("span.prompt-input")?.value
      || generatedScenes[i]?.prompt
      || "";
    const voiceOver = items[i].querySelector("span.voiceover-input")?.value
      || generatedScenes[i]?.voiceOver
      || "";
    if (!prompt || !voiceOver) {
      showToast("Vui lòng tạo kịch bản trước!");
      return;
    }
    const sceneData = {
      aspectRatio: "16:9",
      durationSeconds: 8,
      enhancePrompt: true,
      generateAudio: true,
      negativePrompt:
        "blurry, low quality, distorted, watermark, cartoonish, static camera, dull colors, low light, text on screen, subtitles, captions, bad anatomy, bad facial features, unprofessional look, overly sexualized, emphasizing body shape, revealing clothing.",
      personGeneration: "allow_young_adult",
      prompt,
      seed: Math.floor(1000 + Math.random() * 9000),
      voiceOver
    };

    formData.append("images", file);
    formData.append("prompts", JSON.stringify(sceneData));
  }

  log("🔄 Đang gửi yêu cầu tạo video...");
  statusLabel.textContent = "⏳ Đang tạo video...";
  generateBtn.disabled = true;

  try {
    const res = await fetch("https://admin.tinovideo.com/api/generate-veo", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      log("✅ " + result.message);
      statusLabel.textContent = "✅ Thành công! vui lòng check thư mục Downloads trên máy";
      showToast("Tạo video bản thành công", 'success')
    } else {
      showToast("Tạo video bản thành công", 'error')
      log("❌ Lỗi: " + (result.error || "Không xác định"));
      statusLabel.textContent = "❌ Lỗi khi tạo video";
    }
  } catch (err) {
    log("❌ Lỗi kết nối: " + err.message);
    // statusLabel.textContent = "❌ Lỗi hệ thống";
    showToast("❌ Lỗi hệ thống", 'error')
  }

  generateBtn.disabled = false;
});

function log(msg) {
  logOutput.value += msg + "\n";
  logOutput.scrollTop = logOutput.scrollHeight;
}
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
  // const claimedPlans = [
  //   user.role && "Free",
  //   user.role && "Standard",
  //   user.role && "Pro",
  //   user.role && "Max"
  // ].filter(Boolean);

  // let highestPlan = "Chưa có gói";
  // const PLAN_PRIORITY = ["Max", "Pro", "Standard", "Free"];
  // for (const plan of PLAN_PRIORITY) {
  //   if (claimedPlans.includes(plan)) {
  //     highestPlan =  user.role ;
  //     break;
  //   }
  // }

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
window.addEventListener("DOMContentLoaded", async () => {
  const user = await getUserInfoOnce();
  if (user) {
    // Sau khi fill xong thì lưu userId để chia sẻ link
    localStorage.setItem("userId", user.id);
  }
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
  const upgradeBtn = document.querySelector(".upgrade-btn");
  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", () => {
      window.location.href = "subscribe.html";
    });
  }
  const btn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  btn.addEventListener("click", () => {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "block"; // Hoặc "flex", tùy bạn muốn hiện như thế nào
    } else {
      sidebar.style.display = "none";
    }
  });
});

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