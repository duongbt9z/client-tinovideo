const editTranslations = {
  "vi": {
    "nav-settings": "Cài Đặt ",
    "tinovideo": "Tinovideo",
    "nav-create": "Tạo Video Mới",
    "nav-templates": "Edit Video",
    "nav-affiliate": "Affiliate",
    "nav-help": "Trợ giúp",
    "upgrade-btn": "Nâng cấp",
    "credits-remaining": "Credits còn lại:",
    "nav-create-veo": "Tạo video veo",
    "edit-title": "Chỉnh sửa video",
  }, "en": {
    "nav-settings": "Settings ",
    "nav-create-veo": "Create Veo Video",
    "tinovideo": "Tinovideo",
    "upgrade-btn": "Upgrade",
    "nav-create": "Create New Video",
    "nav-templates": "Edit Video",
    "credits-remaining": "Remaining credits:",
    "nav-affiliate": "Affiliate",
    "nav-help": "help",
    "edit-title": "Edit your video",
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

// Toggle sidebar on mobile
const btn = document.getElementById("sidebar-toggle");
const sidebar = document.getElementById("sidebar");

btn.addEventListener("click", () => {
  if (sidebar.style.display === "none") {
    sidebar.style.display = "block"; // Hoặc "flex", tùy bạn muốn hiện như thế nào
  } else {
    sidebar.style.display = "none";
  }
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
});
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

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.display = "none";
  }
}
function switchLanguage(lang) {
  localStorage.setItem('tinovideo-language', lang);
  const t = editTranslations[lang];
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

    if (el.tagName === 'INPUT') {
      el.placeholder = t[key];
    } else {
      el.textContent = t[key];
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('tinovideo-language') || 'vi';
  switchLanguage(savedLang);
});