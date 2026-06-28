const FAQS = [
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard orders are processed and shipped within 2–5 business days. Expedited shipping (1–2 business days) is available at checkout for an additional fee. Orders placed before 12 PM on business days are prioritised for same-day dispatch.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! All orders over $50 within the contiguous US qualify for free standard shipping. Orders under $50 ship for a flat $5.99 fee. Free shipping is applied automatically at checkout — no code needed.",
      },
      {
        q: "Do you ship internationally?",
        a: "We ship to 50+ countries worldwide. International orders typically arrive in 7–14 business days depending on destination and customs clearance. Local duties and import taxes may apply and are the buyer's responsibility.",
      },
      {
        q: "Can I track my order?",
        a: "Yes. A tracking number is emailed to you as soon as your order ships. You can use it directly on the carrier's website or follow the link in your shipping confirmation email. Tracking updates are usually live within a few hours of dispatch.",
      },
      {
        q: "What carriers do you use?",
        a: "Domestic orders ship via USPS, UPS, or FedEx depending on your location and chosen speed. International orders go through DHL Express or USPS Priority Mail International. The carrier is selected at the time of fulfilment for the fastest available route.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    items: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 30 days of delivery, no questions asked. Items must be unused, in their original packaging, and with all tags still attached. Once we receive and inspect the item, your refund or exchange will be processed promptly.",
      },
      {
        q: "How do I start a return?",
        a: "Email returns@example.com with your order number and the reason for your return. We'll send a prepaid return shipping label within 24 hours. Drop off the package at any authorised carrier location and you're done.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are issued within 5–7 business days after we receive and inspect your returned item. You'll receive an email confirmation the moment it's processed. The time it takes to appear in your account depends on your bank or card issuer.",
      },
      {
        q: "Which items cannot be returned?",
        a: "Digital downloads, gift cards, and items marked 'Final Sale' are non-returnable. Opened personal care or hygiene products are also excluded for health and safety reasons. If you're unsure whether your item qualifies, reach out before sending it back.",
      },
      {
        q: "Can I exchange for a different size or color?",
        a: "Yes. Start a return for the original item and place a new order for the size or colour you need. Once your return is approved, we'll expedite the replacement shipment at no extra cost. Both actions can happen simultaneously so you're not left waiting.",
      },
    ],
  },
  {
    category: "Payments & Pricing",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with 256-bit SSL encryption. Payment is charged at the time of order confirmation.",
      },
      {
        q: "Do you offer discount codes or promotions?",
        a: "Subscribe to our newsletter for 10% off your very first order. We also run seasonal flash sales and share exclusive codes on our Instagram @pixelandpine. Promo codes can be entered at checkout and apply to eligible items only.",
      },
      {
        q: "Is sales tax charged?",
        a: "Sales tax is calculated at checkout based on your delivery address, in line with applicable local tax laws. The exact amount is shown before you confirm payment. International orders may be subject to local VAT or import duties separately.",
      },
      {
        q: "Do products come with a warranty?",
        a: "Most products include a 1-year manufacturer's warranty covering defects in materials and workmanship. Full warranty terms are listed on each product page. If a product fails within the warranty period, contact us and we'll handle the claim directly.",
      },
      {
        q: "What if I receive a damaged item?",
        a: "Contact us within 7 days of delivery and include clear photos of the damage. We'll arrange a free replacement or issue a full refund — whichever you prefer. You won't need to return the damaged item in most cases.",
      },
    ],
  },
  {
    category: "Orders & Support",
    items: [
      {
        q: "Can I cancel or modify my order?",
        a: "Modifications and cancellations are possible within 1 hour of placing your order. Email support@example.com immediately with your order number and the change you need. After that window closes, the order moves to fulfilment and can no longer be changed — but you can still return it after delivery.",
      },
      {
        q: "What are your customer support hours?",
        a: "Our support team is available Monday–Friday, 9 AM–6 PM IST, and aims to respond to all emails within 24 hours. For instant answers outside those hours, the AI chat widget on this page is available around the clock. Urgent issues are escalated to on-call staff.",
      },
      {
        q: "Do you have a loyalty rewards program?",
        a: "Yes! Pine Rewards lets you earn 1 point for every $1 spent. Redeem 100 points for $5 off any future order with no minimum spend. Sign up for free at checkout or at example.com/rewards — points never expire on active accounts.",
      },
      {
        q: "How do I contact customer support?",
        a: "You can reach us at support@example.com for any general enquiries or order issues. The live chat widget in the bottom-right corner gives you instant AI-powered answers any time of day. For return-specific queries, email returns@example.com instead.",
      },
      {
        q: "Will an out-of-stock item be restocked?",
        a: "Popular products are restocked on a regular cycle. Click 'Notify Me' on the product page and we'll email you the moment it's available again. If a product has been permanently discontinued, this will be noted on the listing.",
      },
    ],
  },
];

function renderFaqs() {
  const grid = document.querySelector("#faq-grid");
  if (!grid) return;

  grid.innerHTML = FAQS.map((section) => `
    <div class="faq-category">
      <h3>${section.category}</h3>
      <div class="faq-list">
        ${section.items.map((item) => `
          <details class="faq-item">
            <summary>${item.q}</summary>
            <p>${item.a}</p>
          </details>
        `).join("")}
      </div>
    </div>
  `).join("");
}

renderFaqs();
