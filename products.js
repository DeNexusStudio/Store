// Edit this file to add, remove or update products.
// Put image files in /assets and use paths such as "assets/my-product.jpg".
// Add any category name you like; filters are generated automatically.
export const PRODUCTS = [
  {
    id: "herbal-tonic", name: "Kalido", category: "Syrup",
    description: "Kalido Syrup was expertly formulated to fight fungal, bacterial and viral infections.",
    ingredients: ["Piper guineense, Garcinia kola, Allium Cepa, Allium Saltvum, Eugenia Caryophyllata."],
    dosage: "Manufacture by Luvitus Global Dosage take 2 spoon twice daily.",
    usage: "(morning & night).",
    warnings: "Not to be used by Children under 12yrs, pregnant and breadfeeding women.",
    storage: "Store below 30°C.", otherInfo: "Luvitus Global, 7756950, EXP:12/2028.",
    image: "assets/Kalido sy.jpg", video: "", rating: 4.8, ratingCount: 24,
    variants: [{ size: "320ml", price: 8500, oldPrice: 10000 }, { size: "500ml", price: 12000, oldPrice: 14000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  },
  {
    id: "herbal-capsules", name: "Kalido", category: "Capsule",
    description: "Kalido Capsule was expertly formulated to fight fungal, bacterial and viral infections.",
    ingredients: ["Piper guineense, Garcinia kola, Allium Cepa, Allium Saltvum, Eugenia Caryophyllata."],
   dosage: "Manufacture by Luvitus Global Dosage take 2 spoon twice daily.",
    usage: "(morning & night).",
    warnings: "Not to be used by Children under 12yrs, pregnant and breadfeeding women.",
    storage: "Store below 30°C.", otherInfo: "Luvitus Global, 7756950, EXP:12/2028.",
    image: "assets/Kali sy.png", video: "", rating: 4.6, ratingCount: 18,
    variants: [{ size: "40 capsules", price: 6500, oldPrice: 7500 }, { size: "60 capsules", price: 11000, oldPrice: 13000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  },

  {
    id: "herbal-capsules", name: "Semron", category: "Capsule",
    description: "Semron Herbal Capsule was expertly formulated to provide comprehensive support for individuals managing blood sugar.",
    ingredients: ["Menthe,Citrullus-Colocynthis,Globimetula-brannil,Allium Satlvum,Vemonia Amygdalina."],
    dosage: "Manufacture by Luvitus Global Dosage take 2 spoon twice daily.",
    usage: "(morning & night).",
    warnings: "Not to be used by Children under 12yrs, pregnant and breadfeeding women.",
     storage: "Store below 30°C.", otherInfo: "Luvitus Global, 7756950, EXP:12/2028.",
    image: "assets/Semron cap.jpg", video: "", rating: 4.6, ratingCount: 18,
    variants: [{ size: "40 capsules", price: 6500, oldPrice: 7500 }, { size: "60 capsules", price: 11000, oldPrice: 13000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  },
    {
    id: "herbal-capsules", name: "Yemsil", category: "Capsule",
    description: "Yemsil Capsule was expertly formulated to aids treatment of malaria and typhoid.",
    ingredients: ["Menthe, piper Guineense, Allum Cepa, Allum Saltvum, Elytraria Maginata."],
    dosage: "Manufacture by Luvitus Global Dosage take 2 spoon twice daily.",
    usage: "(morning & night).",
    warnings: "Not to be used by Children under 12yrs, pregnant and breadfeeding women.",
    storage: "Store below 30°C.", otherInfo: "Luvitus Global, 7756950, EXP:12/2028.",
    image: "assets/Yemsil cap.jpg", video: "", rating: 4.6, ratingCount: 18,
    variants: [{ size: "40 capsules", price: 6500, oldPrice: 7500 }, { size: "60 capsules", price: 11000, oldPrice: 13000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  },
  {
    id: "botanical-cream", name: "Heamist Smart Balm", category: "Cream",
    description: "Replace this sample with a complete, accurate description of the product and its intended use.",
    ingredients: ["Add verified ingredient 1", "Add verified ingredient 2"],
    dosage: "Add verified quantity/frequency and directions for application.",
    usage: "Explain how and where the product should be applied.",
    warnings: "Add relevant skin-sensitivity warnings and external-use instructions, if applicable.",
    storage: "Add storage instructions.", otherInfo: "Add manufacturer, net weight, expiry or other relevant information.",
    image: "assets/Heamist Smart Balm.jpg", video: "", rating: 4.9, ratingCount: 31,
    variants: [{ size: "100g", price: 5500, oldPrice: 6500 }, { size: "200g", price: 9500, oldPrice: 11000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  },
   {
    id: "botanical-cream", name: "Skin Guard", category: "Cream",
    description: "Replace this sample with a complete, accurate description of the product and its intended use.",
    ingredients: ["Add verified ingredient 1", "Add verified ingredient 2"],
    dosage: "Add verified quantity/frequency and directions for application.",
    usage: "Explain how and where the product should be applied.",
    warnings: "Add relevant skin-sensitivity warnings and external-use instructions, if applicable.",
    storage: "Add storage instructions.", otherInfo: "Add manufacturer, net weight, expiry or other relevant information.",
    image: "assets/Skin Guard.jpg", video: "", rating: 4.9, ratingCount: 31,
    variants: [{ size: "100g", price: 5500, oldPrice: 6500 }, { size: "200g", price: 9500, oldPrice: 11000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  },
  {
    id: "herbal-soap", name: "Herbal Cleansing Bar", category: "Soap",
    description: "Replace this sample with a complete, accurate description of the product and its intended use.",
    ingredients: ["Add verified ingredient 1", "Add verified ingredient 2"],
    dosage: "Not applicable — add usage frequency or manufacturer's directions.",
    usage: "Add the manufacturer's directions for use.", warnings: "Add relevant warnings.",
    storage: "Add storage instructions.", otherInfo: "Add manufacturer, net weight, expiry or other relevant information.",
    image: "assets/product-soap.svg", video: "", rating: 4.7, ratingCount: 12,
    variants: [{ size: "150g", price: 2500, oldPrice: 3000 }],
    returnPolicy: "Expired products only. Contact the seller within five (5) working days of receipt. The seller reviews each claim against the full store policy."
  }
];
