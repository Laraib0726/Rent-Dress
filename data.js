// Catalog Data for DressCycle - Authentic Luxury Apparel Collection
const OUTFITS_DATA = [
  {
    id: 'outfit-1',
    name: 'Royal Emerald Zari Lehenga',
    designer: 'Sabyasachi Heritage',
    category: 'Lehenga',
    gender: 'Women',
    occasion: 'Bridal & Reception',
    retailPrice: 48000,
    rentalPrice: 4200,
    deposit: 5000,
    rating: 4.9,
    reviewsCount: 38,
    sizes: ['S', 'M', 'L'],
    colors: ['Emerald Green', 'Antique Gold'],
    fabric: 'Raw Silk & Handcrafted Zardozi',
    image: 'assets/lehenga_emerald.png',
    description: 'A handcrafted emerald green raw silk lehenga featuring traditional zardozi embroidery, tailored blouse, and sheer organza drape.',
    lender: {
      name: 'Ananya Sharma',
      city: 'Delhi'
    },
    features: ['Professional Dry Cleaned', 'Custom Alteration Support', 'Insured Doorstep Delivery', 'Complementary Garment Bag']
  },
  {
    id: 'outfit-2',
    name: 'Velvet Imperial Groom Sherwani',
    designer: 'Manish Malhotra Couture',
    category: 'Sherwani',
    gender: 'Men',
    occasion: 'Groom & Wedding',
    retailPrice: 35000,
    rentalPrice: 3200,
    deposit: 4000,
    rating: 4.95,
    reviewsCount: 42,
    sizes: ['M', 'L', 'XL'],
    colors: ['Deep Royal Blue', 'Gold'],
    fabric: 'Micro Velvet & Metallic Threadwork',
    image: 'assets/sherwani_velvet.png',
    description: 'Bespoke royal blue micro-velvet sherwani accented with gold threadwork, tailored churidar trousers, and a silk stole.',
    lender: {
      name: 'Vikramaditya R.',
      city: 'Mumbai'
    },
    features: ['Includes Stole & Safa', 'Sanitized & Steam Ironed', 'Free Return Pick-up']
  },
  {
    id: 'outfit-3',
    name: 'Midnight Velvet Italian Tuxedo',
    designer: 'Armani Black Label',
    category: 'Tuxedo',
    gender: 'Men',
    occasion: 'Gala & Black Tie',
    retailPrice: 28000,
    rentalPrice: 2600,
    deposit: 3500,
    rating: 4.88,
    reviewsCount: 29,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Midnight Black', 'Silk Satin Lapel'],
    fabric: 'Super 120s Italian Wool & Velvet Satin',
    image: 'assets/tuxedo_gala.png',
    description: 'Classic single-breasted tuxedo featuring satin peak lapels, tailored trousers, crisp white tuxedo shirt, and adjustable satin bow tie.',
    lender: {
      name: 'Rohan Mehta',
      city: 'Bangalore'
    },
    features: ['Includes Shirt & Bow Tie', 'Pre-tailored Slim Fit', '100% Refundable Deposit']
  },
  {
    id: 'outfit-4',
    name: 'Midnight Navy Gala Gown',
    designer: 'Gaurav Gupta Sculpted',
    category: 'Gown',
    gender: 'Women',
    occasion: 'Cocktail & Evening Gala',
    retailPrice: 42000,
    rentalPrice: 3800,
    deposit: 4500,
    rating: 4.92,
    reviewsCount: 31,
    sizes: ['XS', 'S', 'M'],
    colors: ['Navy Blue', 'Silver Metallic'],
    fabric: 'Stretch Tulle with Hand-sewn Sequins',
    image: 'assets/gown_gala.png',
    description: 'Sculpted mermaid gala gown featuring hand-sewn navy sequin gradients and a structured boned bodice.',
    lender: {
      name: 'Priyal V.',
      city: 'Mumbai'
    },
    features: ['Built-in Corset', 'Includes Garment Bag', 'Hassle-free Courier Pickup']
  },
  {
    id: 'outfit-5',
    name: 'Imperial Ivory Chanderi Sherwani',
    designer: 'Tarun Tahiliani',
    category: 'Sherwani',
    gender: 'Men',
    occasion: 'Groom & Wedding',
    retailPrice: 55000,
    rentalPrice: 4800,
    deposit: 6000,
    rating: 4.98,
    reviewsCount: 54,
    sizes: ['M', 'L', 'XXL'],
    colors: ['Ivory', 'Rose Gold Accents'],
    fabric: 'Raw Chanderi Silk & Dabka Embroidery',
    image: 'assets/sherwani_ivory.png',
    description: 'Raw chanderi silk sherwani detailed with micro-dabka hand embroidery, paired with silk trousers and an embroidered organza drape.',
    lender: {
      name: 'Karan Singhania',
      city: 'Jaipur'
    },
    features: ['Royal Heritage Collection', 'Ozone Sanitized', 'Free Doorstep Fitting']
  },
  {
    id: 'outfit-6',
    name: 'Blush Pink Organza Floral Lehenga',
    designer: 'Anita Dongre Inspired',
    category: 'Lehenga',
    gender: 'Women',
    occasion: 'Sangeet & Mehendi',
    retailPrice: 32000,
    rentalPrice: 2900,
    deposit: 3500,
    rating: 4.9,
    reviewsCount: 22,
    sizes: ['S', 'M', 'L'],
    colors: ['Blush Pink', 'Pastel Flora'],
    fabric: 'Pure Silk Organza & Gotta Patti',
    image: 'assets/lehenga_emerald.png',
    description: 'Lightweight pastel pink organza lehenga hand-painted with botanical motifs and bordered with fine gotta patti trims.',
    lender: {
      name: 'Simran Kaur',
      city: 'Chandigarh'
    },
    features: ['Lightweight & Breathable', 'Adjustable Drawstring Waist', 'Sanitized & Scented']
  },
  {
    id: 'outfit-7',
    name: 'Asymmetric Indo-Western Kurta Set',
    designer: 'Shantanu & Nikhil',
    category: 'Indo-Western',
    gender: 'Men',
    occasion: 'Sangeet & Party',
    retailPrice: 18000,
    rentalPrice: 1900,
    deposit: 2000,
    rating: 4.79,
    reviewsCount: 19,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal Grey', 'Oxidized Silver'],
    fabric: 'Matte Poly-Silk & Leatherette Trims',
    image: 'assets/tuxedo_gala.png',
    description: 'Contemporary draped asymmetric jacket over a structured black kurta and slim-fit trousers.',
    lender: {
      name: 'Aditya Kapoor',
      city: 'Pune'
    },
    features: ['Modern Slim Silhouette', 'Stain-Resistant Fabric Treatment', 'Instant Booking']
  },
  {
    id: 'outfit-8',
    name: 'Deep Maroon Mirror-Work Anarkali',
    designer: 'Abhinav Mishra',
    category: 'Anarkali',
    gender: 'Women',
    occasion: 'Sangeet & Festive',
    retailPrice: 26000,
    rentalPrice: 2400,
    deposit: 2500,
    rating: 4.87,
    reviewsCount: 36,
    sizes: ['M', 'L', 'XL'],
    colors: ['Deep Maroon', 'Real Mirrorwork'],
    fabric: 'Georgette & Sheer Net Dupatta',
    image: 'assets/lehenga_emerald.png',
    description: 'Floor-length flared maroon georgette anarkali suit detailed with authentic mirror embroidery and intricate border trims.',
    lender: {
      name: 'Meera Rajput',
      city: 'Udaipur'
    },
    features: ['Includes Matching Churidar', 'Mirrorwork Protection Guarantee', '24h Deposit Refund']
  }
];

// Initial State for Customer Orders
const INITIAL_DEMO_ORDER = {
  orderId: 'DC-8942-IN',
  outfitName: 'Royal Emerald Zari Lehenga',
  outfitImage: 'assets/lehenga_emerald.png',
  designer: 'Sabyasachi Heritage',
  rentalPrice: 4200,
  deposit: 5000,
  size: 'M',
  startDate: '2026-10-15',
  wearDate: '2026-10-16',
  returnDate: '2026-10-18',
  currentStepIndex: 0,
  steps: [
    { title: 'Booked', subtitle: 'Order & Security Deposit Authorized', date: 'Oct 15, 09:30 AM' },
    { title: 'Dispatched', subtitle: 'Sanitized & Dispatched via Courier', date: 'Oct 15, 04:15 PM' },
    { title: 'Delivered', subtitle: 'Arrived at Customer Doorstep', date: 'Oct 16, 11:00 AM' },
    { title: 'Returned', subtitle: 'Picked up by Courier & Inspected', date: 'Oct 18, 05:00 PM' },
    { title: 'Deposit Refunded', subtitle: '₹5,000 Transferred to Bank Account', date: 'Oct 19, 10:00 AM' }
  ]
};
