const API_BASE_URL = 'https://admin.tinovideo.com';
const settingsTranslations = {
  "vi": {
    "nav-settings": "Cài Đặt",
    "tinovideo": "Tinovideo",
    "nav-create": "Tạo Video Mới",
    "nav-templates": "Edit Video",
    "nav-affiliate": "Affiliate",
    "nav-help": "Trợ giúp",
    "user-avatar": "",

    "credits-remaining": "Credits còn lại:",
    "point": "100",
    "upgrade-btn": "Nâng cấp",
    "new-video-btn": "",
    "ho-so": "👤 Hồ sơ",
    "thanh-toan": "💳 Thanh toán",
    "thong-tin-ca-nhan": "Thông tin cá nhân",
    "ho-va-ten": "Họ và tên",
    "user-name-i": "",
    "email": "Email",
    "user-email": "",
    // "goi-hien-tai": "Gói hiện tại: Pro Nâng\n                cấp",
    // "user-plan-main": "Pro",
    "goi-dich-vu-hien-tai": "Gói dịch vụ hiện tại",
    // "user-plan-main-payment": "Pro Plan",
    "point-main": "100",
    "mua-them-credits": "Mua thêm Credits",
    "lich-su-thanh-toan": "Lịch sử thanh toán"
  },
  "en": {
    "nav-settings": "Settings",
    "tinovideo": "Tinovideo",
    "nav-create": "Create New Video",
    "nav-templates": "Edit Video",
    "nav-affiliate": "Affiliate",
    "nav-help": "Help",
    "user-avatar": "",
    "credits-remaining": "Remaining credits:",
    "point": "100",
    "upgrade-btn": "Upgrade",
    "new-video-btn": "New Video",
    "ho-so": "👤 Profile",
    "thanh-toan": "💳 Billing",
    "thong-tin-ca-nhan": "Personal Information",
    "ho-va-ten": "Full Name",
    "user-name-i": "",
    "email": "Email",
    "user-email": "",
    // "goi-hien-tai": "Current Plan: Pro Upgrade",
    // "user-plan-main": "Pro",
    "goi-dich-vu-hien-tai": "Current Subscription Plan",
    // "user-plan-main-payment": "Pro Plan",
    "point-main": "100",
    "mua-them-credits": "Buy More Credits",
    "lich-su-thanh-toan": "Payment History"
  }
}

// PATCHED switchLanguage
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.display = "none";
  }
}
function switchLanguage(lang) {
  localStorage.setItem('tinovideo-language', lang);
  const t = settingsTranslations[lang];
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
    }
    else if (el.tagName === 'IMG') {
      return;
    }
    else if (el.classList.contains('tab')) {
      el.innerText = t[key];
    }
    else {
      // Nếu là element có con (ví dụ: <p>Gói hiện tại: <strong>Pro</strong></p>)
      const firstTextNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
      if (firstTextNode) {
        firstTextNode.textContent = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });
}


window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('tinovideo-language') || 'vi';
  switchLanguage(savedLang);
});

const SECTIONS = ["dashboard", "create", "projects", "templates", "affiliate", "settings", "help"];
function showSection(name) {
  SECTIONS.forEach(sec => {
    const el = document.getElementById(`${sec}-section`);
    if (el) {
      el.classList.toggle("hidden", sec !== name);
    }
  });

  document.querySelectorAll(".sidebar-item").forEach(item => {
    const isActive = item.getAttribute("onclick")?.includes(`showSection('${name}')`);
    item.classList.toggle("active", isActive);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("settings");

  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });

  });

  const btn = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
btn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});
  // btn.addEventListener("click", () => {
  //   if (sidebar.style.display === "none") {
  //     sidebar.style.display = "block";
  //   } else {
  //     sidebar.style.display = "none";
  //   }
  // });
});


async function loadPaymentHistoryOnLoad() {
  const token = localStorage.getItem("jwt");
  const listDiv = document.getElementById("payment-list");
  const wrap = document.getElementById("payment-history");
  if (!token || !listDiv || !wrap) return;

  listDiv.innerHTML = "<div>⏳ Đang tải lịch sử thanh toán...</div>";

  try {
    const res = await fetch(`${API_BASE_URL}/api/user-payment/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();

    if (!data.success || data.data.length === 0) {
      listDiv.innerHTML = "<p>📭 Bạn chưa có giao dịch nào.</p>";
      return;
    }

    listDiv.innerHTML = "";
    const summary = `
            <div class="mt-6 p-4 bg-gray-600 rounded-lg border border-gray-500">
                <div><strong>📊 Tổng giao dịch:</strong> ${data.total_plans} lần</div>
               
            </div>
        `;
    listDiv.innerHTML += summary;
    data.data.forEach(item => {
      const html = `
                <div class="p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <div><strong>🔹 Người thanh toán:</strong> ${item.payer_name}</div>
                    <div><strong>📦 Gói:</strong> ${item.plan_name}</div>
                    <div><strong>💰 Số tiền:</strong> ${item.amount.toLocaleString()} VNĐ</div>
                  
                    <div><strong>🕒 Ngày xác nhận:</strong> ${item.confirmed_at}</div>
                </div>`;
      listDiv.innerHTML += html;
    });


  } catch (err) {
    console.error("❌ Lỗi khi lấy lịch sử:", err);
    listDiv.innerHTML = "<p class='text-red-400'>❌ Lỗi khi lấy lịch sử thanh toán.</p>";
  }
}

window.addEventListener("DOMContentLoaded", loadPaymentHistoryOnLoad);

