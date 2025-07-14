// ./js/subscribe.js


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

  // slide in
  setTimeout(() => toast.classList.remove('translate-x-full'), 10);

  // slide out + remove
  setTimeout(() => {
    toast.classList.add('translate-x-full');
    setTimeout(() => toast.remove(), 200);
  }, 2000);
}

document.addEventListener("DOMContentLoaded", () => {
  /* ───────────────── DOM cache ───────────────── */
  const billingBtns = document.querySelectorAll(".billing-btn");
  const priceEls = document.querySelectorAll(".amount");
  const origPriceEls = document.querySelectorAll(".original-price");
  const billedEls = document.querySelectorAll(".billed-amount");
  const periodEls = document.querySelectorAll(".price .period");

  /* ─────────────── Helpers ──────────────────── */
  const setActiveBtn = btn => {
    billingBtns.forEach(b => b.classList.toggle("active", b === btn));
  };

  const updatePrices = mode => {
    /* 1️⃣ Cập nhật giá, dòng gốc, billed-amount */
    priceEls.forEach(el => el.textContent = el.dataset[mode] || "--");
    origPriceEls.forEach(el => {
      const txt = el.dataset[mode] || "";
      el.textContent = txt;
      // Ẩn khi rỗng (tháng) – hiện khi có (năm)
      el.style.display = txt ? "block" : "none";
    });
    billedEls.forEach(el => {
      const txt = el.dataset[mode] || "";
      el.textContent = txt;
      el.style.display = txt ? "block" : "none";
    });

    /* 2️⃣ Badge “Giảm XX%” chỉ hiện ở năm */
    document.querySelectorAll(".discount").forEach(el => {
      el.style.display = mode === "yearly" ? "inline-block" : "none";
    });

    /* 3️⃣ Đổi hậu tố /Tháng – /Năm */
    periodEls.forEach(el => el.textContent = mode === "monthly" ? "/Tháng" : "/Năm");
  };
  const freeClaimed = localStorage.getItem("free_claimed");

  if (freeClaimed === "true") {
    document.querySelectorAll(".subscribe-btn").forEach(btn => {
      const plan = btn.dataset.plan;
      if (plan === "free") {
        btn.disabled = true;
        btn.innerText = "Đã nhận";
        btn.style.backgroundColor = "#ccc"; // hoặc đổi sang class CSS
        btn.style.cursor = "not-allowed";   // cho UX rõ hơn
      }
    });
  }

  /* ─────────────── Event: toggle tháng / năm ─────────────── */
  billingBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      setActiveBtn(btn);
      updatePrices(btn.dataset.billing);   // "monthly" | "yearly"
    });
  });

  updatePrices("monthly");                 // Khởi tạo

  /* ───────────────── Thưởng Free & Checkout ─────────────── */
  // async function claimFree() {
  //   try {
  //     const token = localStorage.getItem("jwt");
  //     const free_claimed = localStorage.getItem("free_claimed");
  //     if free_claimed == true{
  //       const resp = await fetch("http://localhost:5000/api/free", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       const data = await resp.json();
  //       if (!resp.ok) throw new Error(data?.message || "Lỗi không xác định");
  //       showToast('🎉 Bạn vừa nhận 50 điểm!', 'success');
  //     } catch (err) {
  //       // alert(err.message);
  //       showToast(err.message, 'error');
  //     }
  //     else{
  //       showToast('🎉 Bạn đã nhận 50 điểm!', 'error');
  //     }
  //   }

  // }
  async function claimFree(buttonElement) {
    const token = localStorage.getItem("jwt");
    const free_claimed = localStorage.getItem("free_claimed");

    // Đã nhận rồi
    if (free_claimed === "true") {
      showToast('🎉 Bạn đã nhận 50 điểm trước đó rồi!', 'error');

      // Vô hiệu hóa nút nếu có truyền vào
      if (buttonElement) {
        buttonElement.disabled = true;
        buttonElement.innerText = "Đã nhận";
        buttonElement.style.backgroundColor = "#ccc"; // đổi màu xám
      }

      return;
    }

    try {
      const resp = await fetch("http://localhost:5000/api/free", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await resp.json();

      if (!resp.ok) throw new Error(data?.message || "Lỗi không xác định");

      showToast('🎉 Bạn vừa nhận 50 điểm!', 'success');
      localStorage.setItem("free_claimed", "true");

      // Nếu có nút thì vô hiệu hoá luôn sau khi nhận
      if (buttonElement) {
        buttonElement.disabled = true;
        buttonElement.innerText = "Đã nhận";
        buttonElement.style.backgroundColor = "#ccc";
      }

    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  function buildPlanObject(cardEl) {
    return {
      name: cardEl.querySelector(".plan-header h3").textContent.trim(),
      price: cardEl.querySelector(".price .amount").textContent.trim(),
      billed: document.querySelector(".billing-btn.active")?.dataset.billing === "yearly"
        ? "Theo năm" : "Theo tháng",
      period: document.querySelector(".billing-btn.active")?.dataset.billing === "yearly"
        ? "Y" : "M",
      features: [...cardEl.querySelectorAll(".features li")].map(li => li.textContent.trim())
    };
  }

  function openCheckout(cardEl) {
    const planObj = buildPlanObject(cardEl);
    localStorage.setItem("selectedPlan", JSON.stringify(planObj));
    window.location.href = "./payment.html";
  }

  /* ─────────────── Event: click các gói ─────────────── */
  document.querySelectorAll(".subscribe-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const plan = btn.dataset.plan; // "free", "max", ...
      if (plan === "free") {
        claimFree(btn); // ✅ Truyền btn để xử lý UI
      } else {
        const card = btn.closest(".pricing-card");
        if (card) openCheckout(card);
      }
    });
  });

});
