/* ---------------------  payment.js  --------------------- */
const API_MAIN_BASE_URL = 'https://admin.tinovideo.com';

document.addEventListener("DOMContentLoaded", () => {
  /* ===== 1. LẤY & HIỂN THỊ GÓI ===== */
  const plan = JSON.parse(localStorage.getItem("selectedPlan") || "null");
  if (!plan) {
    alert("Không tìm thấy thông tin gói!");
    return;
  }

  document.querySelector(".course-title").textContent = plan.name;
  document.querySelector(".course-subtitle").textContent =
    `Gói ${plan.name} - thanh toán ${plan.billed}`;
  document.querySelector(".html-badge").textContent = plan.name;
  document.querySelector(".price-row span:nth-child(2)").textContent = plan.price;
  document.querySelector(".total-amount").textContent = plan.price;

  const featureList = document.querySelector(".features");
  featureList.innerHTML = "";
  (plan.features || []).forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    featureList.appendChild(li);
  });

  /* ===== 2. ẨN QR LÚC ĐẦU ===== */
  const qrContainer = document.querySelector(".qr-container");
  qrContainer.classList.add("hidden");                 // cần CSS .hidden {display:none}
  const qrImg = document.getElementById("qr");

  /* ===== 3. CHUẨN BỊ DỮ LIỆU THANH TOÁN ===== */
  const amount = Number(plan.price.replace(/\D/g, ""));               // 200000
  document.querySelector(".value.amount").textContent = new Intl.NumberFormat("vi-VN").format(amount) + " đ";
  const rawData = localStorage.getItem("auth_data");
  let auth_data = null;  // Khai báo biến toàn cục
  let userId = null;
  if (rawData) {
    const auth_data = JSON.parse(rawData);
    userId = auth_data.id;
  } else {
    console.warn("⚠️ auth_data not found in localStorage");
  }
  const vietqrOption = document.querySelector(".method-option");
  if (!vietqrOption) return;
  async function handleVietqrClick() {
    if (vietqrOption.dataset.loading) return;
    vietqrOption.dataset.loading = "1";
    const reference = "VD" + plan.name + "T7LQRX8M" + userId;
    document.querySelector(".value.reference").textContent = reference;

    try {
      const res = await fetch(`${API_MAIN_BASE_URL}/api/vietqr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          description: reference,
        })
      });

      if (!res.ok) throw new Error(`API trả ${res.status}`);

      // ---- Xác định kiểu dữ liệu trả về ----
      const ct = res.headers.get("content-type") || "";
      let qrUrl = "";

      if (ct.startsWith("image/")) {                    // ảnh PNG trực tiếp
        const blob = await res.blob();
        qrUrl = URL.createObjectURL(blob);
      } else if (ct.includes("application/json")) {     // JSON
        const data = await res.json();
        qrUrl = data.url || data.qr_url || "";
      } else {                                         // plain-text
        qrUrl = (await res.text()).trim();
      }

      if (!qrUrl) throw new Error("Không nhận được URL QR");

      // ---- Hiển thị kết quả ----
      qrImg.src = qrUrl;
      qrContainer.classList.remove("hidden");           // hiện khối QR
       pollPaymentStatus(reference);

    } catch (err) {
      console.error("VietQR API error:", err);
      alert("Không lấy được QR. Vui lòng thử lại!");
      delete vietqrOption.dataset.loading;
      // gắn lại listener để người dùng thử lần nữa
      vietqrOption.addEventListener("click", handleVietqrClick, { once: true });
    }
  }
 function pollPaymentStatus(reference, retries = 20, delay = 5000) {
  let attempt = 0;

  const interval = setInterval(async () => {
    attempt++;
    console.log(`🔄 Kiểm tra trạng thái thanh toán – Lần ${attempt}`);

    try {
      const res = await fetch(`${API_MAIN_BASE_URL}/api/vietqr/status?reference=${reference}`);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();

      if (data.paid) {
        clearInterval(interval);
        alert(`✅ Đã nhận ${data.amount.toLocaleString()}đ từ ${data.payer_name || 'người gửi'} lúc ${data.trans_time || '...'}!`);

        // 👉 Xử lý tiếp sau khi thanh toán thành công
        // Ví dụ: unlock UI, reload, chuyển trang...
        // window.location.href = "/thank-you";

      } else if (attempt >= retries) {
        clearInterval(interval);
        alert("⏱ Hết thời gian chờ chuyển khoản.");
      }
    } catch (err) {
      console.error("❌ Lỗi khi kiểm tra thanh toán:", err);
      if (attempt >= retries) clearInterval(interval);
    }
  }, delay);
}




  // Gắn listener CHỈ MỘT LẦN; sau khi thành công sẽ tự gỡ, không gọi lại
  vietqrOption.addEventListener("click", handleVietqrClick, { once: true });
});
/* ------------------------------------------------------- */
