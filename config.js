/* ==========================================================================
   ARGONMAX LANDING PAGE — YOUR DETAILS
   Edit the values below. Everything else on the page updates automatically.
   ========================================================================== */
window.ARGONMAX = {
  // Your JVZoo / WarriorPlus / Stripe buy link. Every "Get Instant Access" button uses it.
  // Leave empty while testing: buttons then scroll to the offer section.
  checkoutUrl: "https://launchpadjv.com/product/checkout/5707?page=4807&offer=574&offerProduct=6862",

  // Product login URL for the Access ArgonMax button on thank-you.html.
  // Set your checkout provider’s post-purchase redirect to yoursite.com/thank-you.html.
  accessUrl: "https://argon-login.thenextgenai.online/",

  // Help center used on the post-purchase account-access page.
  helpCenterUrl: "https://teamkalki.tawk.help/",

  // Front-end price, number only (shown as $17 everywhere).
  price: "17",

  // Shown in the Founder's Note signature (section 47).
  founderName: "[Your Name]",

  // Support email (footer + FAQ). Leave empty to keep the plain "Contact/Support" text.
  supportEmail: "",

  // Demo video (section 30). Paste a normal YouTube/Vimeo link (e.g. "https://www.youtube.com/watch?v=VIDEO_ID"),
  // an EMBED url, or a direct .mp4 link. It plays when a visitor clicks the player.
  // Empty = the player shows an animated "illustrative preview" instead.
  demoVideoUrl: "",

  // Launch deadline for the countdown in section 45. Use a REAL date only, e.g. "2026-11-30T23:59:00Z".
  // Empty = no countdown is shown (we never fake urgency).
  launchEndsAt: "",

  // Primary checkout countdown. A launchEndsAt deadline takes priority when set.
  // Otherwise starts once per browser and stays expired after reaching zero.
  offerCountdownMinutes: 49,

  // Footer links
  termsUrl: "terms-of-use.html",
  privacyUrl: "privacy-policy.html",
  refundUrl: "refund-policy.html",

  // OTO Funnel Configuration (OTO 1 to OTO 10)
  // Set your checkout URL for each OTO here when ready.
  oto: {
    1: { name: "Unlimited Pro", price: "47", dsName: "Unlimited Pro Lite", dsPrice: "27", checkoutUrl: "https://launchpadjv.com/product/checkout/5840?page=4960&offer=574&offerProduct=6864", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5901?page=5010&offer=574&offerProduct=6865", nextUrl: "oto2.html" },
    2: { name: "Creative PRO (Gold)", price: "87", dsName: "Creative PRO Silver", dsPrice: "47", checkoutUrl: "https://launchpadjv.com/product/checkout/5841?page=4961&offer=574&offerProduct=6866", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5902?page=5011&offer=574&offerProduct=6867", nextUrl: "oto3.html" },
    3: { name: "DFY Pack", price: "67", dsName: "DFY Lite", dsPrice: "37", checkoutUrl: "https://launchpadjv.com/product/checkout/5842?page=4962&offer=574&offerProduct=6868", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5903?page=5012&offer=574&offerProduct=6869", nextUrl: "oto4.html" },
    4: { name: "Automation / Bulk", price: "39", dsName: "Bulk Lite", dsPrice: "27", checkoutUrl: "https://launchpadjv.com/product/checkout/5843?page=4963&offer=574&offerProduct=6870", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5904?page=5013&offer=574&offerProduct=6871", nextUrl: "oto5.html" },
    5: { name: "Traffic / Leads", price: "47", dsName: "Traffic Lite", dsPrice: "27", checkoutUrl: "https://launchpadjv.com/product/checkout/5844?page=4964&offer=574&offerProduct=6872", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5905?page=5014&offer=574&offerProduct=6873", nextUrl: "oto6.html" },
    6: { name: "Agency", price: "97", dsName: "Agency Lite", dsPrice: "67", checkoutUrl: "https://launchpadjv.com/product/checkout/5845?page=4965&offer=574&offerProduct=6874", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5906?page=5015&offer=574&offerProduct=6875", nextUrl: "oto7.html" },
    7: { name: "Reseller", price: "67", dsName: "Reseller Lite", dsPrice: "47", checkoutUrl: "https://launchpadjv.com/product/checkout/5846?page=4966&offer=574&offerProduct=6876", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5907?page=5016&offer=574&offerProduct=6877", nextUrl: "oto8.html" },
    8: { name: "Whitelabel", price: "197", dsName: "Whitelabel Lite", dsPrice: "97", checkoutUrl: "https://launchpadjv.com/product/checkout/5847?page=4967&offer=574&offerProduct=6878", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5908?page=5017&offer=574&offerProduct=6879", nextUrl: "oto9.html" },
    9: { name: "Enterprise / Team", price: "127", dsName: "Enterprise Lite", dsPrice: "77", checkoutUrl: "https://launchpadjv.com/product/checkout/5848?page=4968&offer=574&offerProduct=6880", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5909?page=5018&offer=574&offerProduct=6881", nextUrl: "oto10.html" },
    10: { name: "VIP DFY + Coaching", price: "97", dsName: "VIP Lite", dsPrice: "47", checkoutUrl: "https://launchpadjv.com/product/checkout/5849?page=4969&offer=574&offerProduct=6807", dsCheckoutUrl: "https://launchpadjv.com/product/checkout/5910?page=5019&offer=574&offerProduct=6882", nextUrl: "thank-you.html" }
  }
};
