document.addEventListener("DOMContentLoaded", () => {
  const billingButtons = document.querySelectorAll(".billing-btn")
  const priceAmounts = document.querySelectorAll(".amount")
  const billedAmounts = document.querySelectorAll(".billed-amount")
  const originalPrices = document.querySelectorAll(".original-price")

  // Handle billing toggle
  billingButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      billingButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get selected billing period
      const selectedBilling = this.dataset.billing

      // Update prices
      updatePrices(selectedBilling)
    })
  })

  function updatePrices(billing) {
    // Update price amounts
    priceAmounts.forEach((amount) => {
      const newPrice = amount.dataset[billing]
      if (newPrice) {
        amount.textContent = newPrice
      }
    })

    // Update billed amounts
    billedAmounts.forEach((billed) => {
      const newBilled = billed.dataset[billing]
      if (newBilled) {
        billed.textContent = newBilled
      }
    })

    // Update original prices
    originalPrices.forEach((original) => {
      const newOriginal = original.dataset[billing]
      if (newOriginal) {
        original.textContent = newOriginal
      }
    })

    // Update discount visibility
    updateDiscountVisibility(billing)
  }

  function updateDiscountVisibility(billing) {
    const discountBadges = document.querySelectorAll(".discount")

    discountBadges.forEach((badge) => {
      if (billing === "monthly") {
        badge.style.display = "none"
      } else {
        badge.style.display = "inline-block"
      }
    })

    // Hide original prices for monthly billing
    originalPrices.forEach((price) => {
      if (billing === "monthly") {
        price.style.display = "none"
      } else {
        price.style.display = "block"
      }
    })
  }

  // Add subscribe button functionality
  const subscribeButtons = document.querySelectorAll(".subscribe-btn")

  subscribeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".pricing-card")
      const planName = card.querySelector("h3").textContent
      const currentPrice = card.querySelector(".amount").textContent

      // Add loading state
      const originalText = this.textContent
      this.textContent = "Processing..."
      this.disabled = true

      // Simulate API call
      // setTimeout(() => {
      //   alert(`Redirecting to checkout for ${planName} plan at $${currentPrice}/month`)
      //   this.textContent = originalText
      //   this.disabled = false
      // }, 1500)

      const billed = card.querySelector(".billed-amount").textContent
      const features = Array.from(card.querySelectorAll(".features li")).map(li => li.textContent)

      const selectedPlan = {
        name: planName,
        price: currentPrice,
        billed: billed,
        features: features
      }

      localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan))

      // Chuyển sang trang thanh toán
      window.location.href = "payment.html"

    })
  })

  // Add hover effects for pricing cards
  const pricingCards = document.querySelectorAll(".pricing-card")

  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "none"
    })
  })

  // Initialize with yearly billing
 updatePrices("monthly");
})
