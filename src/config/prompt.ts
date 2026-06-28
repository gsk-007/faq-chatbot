export const SYSTEM_PROMPT = `
You are a helpful and friendly customer support agent for Pixel & Pine, a small e-commerce lifestyle store.
Answer clearly and concisely — keep replies to 2–4 sentences unless the question genuinely needs more detail.
If you don't know something, say so honestly rather than making it up.
Always maintain a warm, professional tone.
`;

const storeKnowledge = {
  store: {
    name: "Pixel & Pine",
    description: "Online store selling lifestyle, home, and tech accessories. Ships worldwide.",
  },
  shipping: {
    standard: "2–5 business days (US)",
    expedited: "1–2 business days, available at checkout",
    free_threshold: "Free standard shipping on US orders over $50; flat $5.99 below that",
    international: "50+ countries, 7–14 business days, buyer pays customs/duties",
    carriers: "Domestic: USPS, UPS, FedEx. International: DHL Express, USPS Priority Mail International",
    tracking: "Tracking number emailed when order ships",
  },
  returns: {
    window: "30 days from delivery",
    condition: "Unused, original packaging, tags attached",
    how_to_start: "Email returns@example.com with order number; prepaid label sent within 24h",
    refund_timeline: "5–7 business days after item received and inspected",
    non_returnable: "Digital downloads, gift cards, Final Sale items, opened personal care products",
    exchanges: "Return original item and place new order; replacement expedited on approval",
  },
  products: {
    warranty: "1-year manufacturer warranty on most items (details on product page)",
    damaged_items: "Contact within 7 days with photos; free replacement or full refund",
    restock: "Popular items restocked regularly; use 'Notify Me' on product page",
  },
  payments: {
    methods: "Visa, MasterCard, Amex, PayPal, Apple Pay, Google Pay, Shop Pay",
    security: "256-bit SSL encryption",
    currency: "USD",
    tax: "Calculated at checkout based on delivery address",
    discounts: "10% off first order via newsletter; flash sales on Instagram @pixelandpine",
  },
  orders: {
    cancellation_window: "Within 1 hour of placement; email support@example.com with order number",
    after_cutoff: "Order moves to fulfilment after 1h; initiate return after delivery",
    status_updates: "Email notifications at each stage: confirmed, shipped, out for delivery, delivered",
  },
  loyalty: {
    program: "Pine Rewards",
    earn: "1 point per $1 spent",
    redeem: "100 points = $5 off, no minimum spend",
    signup: "Free; at checkout or example.com/rewards",
    expiry: "Points never expire on active accounts",
  },
  support: {
    hours: "Monday–Friday, 9 AM–6 PM IST",
    response_time: "Within 24 hours on business days",
    email: "support@example.com",
    returns_email: "returns@example.com",
    chat: "AI widget available 24/7",
  },
};

export const STORE_FAQ = JSON.stringify(storeKnowledge, null, 2);
