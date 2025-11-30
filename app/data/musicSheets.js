export const musicSheets = [
  {
    id: 1,
    title: "abuelita",
    difficulty: "Intermediate",
    price: "3.00",
    description: "A song dedicated to my grandmother.",
    stripeLink: "https://buy.stripe.com/test_8x2aEW1QMb1xgdT0lmeAg00", // Stripe Payment Link - In Stripe Dashboard, set success_url to: https://yourdomain.com/api/payment-success?session_id={CHECKOUT_SESSION_ID}
    // stripeLink: "https://buy.stripe.com/9B6bJ08g1c5acBQ0sfgIo00", // Stripe  Link - Product: prod_TWHePpQ2qZxDz7 - In Stripe Dashboard, set success_url to: https://yourdomain.com/api/payment-success?session_id={CHECKOUT_SESSION_ID}
    image: "/images/abuelita.jpg", // Image path in public folder
    composedDate: "2024-01-15", // Date when the song was composed (YYYY-MM-DD)
    pdfPath: "abuelita.pdf", // PDF filename (stored securely)
  },
];

