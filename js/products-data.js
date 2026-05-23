// Product Database
const products = [
    // T-Shirts
    {
        id: 1,
        name: 'Premium Cotton T-Shirt',
        category: 'fashion',
        subcategory: 't-shirts',
        price: 599,
        originalPrice: 899,
        emoji: '👕',
        rating: 4.5,
        reviews: 128,
        description: 'High-quality 100% cotton comfortable T-shirt for everyday wear',
        specs: [
            'Material: 100% Premium Cotton',
            'Sizes: S, M, L, XL, XXL',
            'Colors: Black, White, Navy, Gray',
            'Comfortable fit',
            'Machine washable'
        ]
    },
    {
        id: 2,
        name: 'Casual Striped T-Shirt',
        category: 'fashion',
        subcategory: 't-shirts',
        price: 449,
        originalPrice: 799,
        emoji: '👕',
        rating: 4.3,
        reviews: 95,
        description: 'Trendy striped design perfect for casual outings',
        specs: [
            'Material: Cotton Blend',
            'Pattern: Striped',
            'Fits: Regular',
            'Lightweight',
            'Quick dry'
        ]
    },
    {
        id: 3,
        name: 'Graphic Print T-Shirt',
        category: 'fashion',
        subcategory: 't-shirts',
        price: 549,
        originalPrice: 850,
        emoji: '👕',
        rating: 4.6,
        reviews: 156,
        description: 'Stylish graphic print T-shirt with vibrant colors',
        specs: [
            'Material: Cotton Jersey',
            'Print: Digital graphic',
            'Durable colors',
            'Comfortable neckline',
            'Breathable fabric'
        ]
    },

    // Panjabi
    {
        id: 4,
        name: 'Traditional Cotton Panjabi',
        category: 'fashion',
        subcategory: 'panjabi',
        price: 1299,
        originalPrice: 1899,
        emoji: '👗',
        rating: 4.7,
        reviews: 203,
        description: 'Elegant traditional cotton panjabi for all occasions',
        specs: [
            'Material: 100% Cotton',
            'Design: Traditional',
            'Sizes: S to 3XL',
            'Perfect for festivals',
            'Hand embroidered options available'
        ]
    },
    {
        id: 5,
        name: 'Modern Casual Panjabi',
        category: 'fashion',
        subcategory: 'panjabi',
        price: 999,
        originalPrice: 1499,
        emoji: '👗',
        rating: 4.4,
        reviews: 142,
        description: 'Contemporary panjabi with modern cuts and patterns',
        specs: [
            'Material: Cotton Linen Blend',
            'Contemporary design',
            'Comfortable fit',
            'Easy care',
            'Available in multiple colors'
        ]
    },
    {
        id: 6,
        name: 'Premium Silk Panjabi',
        category: 'fashion',
        subcategory: 'panjabi',
        price: 2499,
        originalPrice: 3999,
        emoji: '👗',
        rating: 4.8,
        reviews: 178,
        description: 'Luxurious silk panjabi for special occasions',
        specs: [
            'Material: Pure Silk',
            'Elegant finish',
            'Premium embroidery',
            'Perfect for weddings',
            'Dry clean recommended'
        ]
    },

    // Hoodies
    {
        id: 7,
        name: 'Warm Winter Hoodie',
        category: 'fashion',
        subcategory: 'hoodies',
        price: 1199,
        originalPrice: 1899,
        emoji: '🧥',
        rating: 4.6,
        reviews: 187,
        description: 'Cozy and warm hoodie perfect for winter season',
        specs: [
            'Material: Fleece lined',
            'Hood with drawstring',
            'Kangaroo pocket',
            'Sizes: S to XXL',
            'Durable zipper'
        ]
    },
    {
        id: 8,
        name: 'Casual Gray Hoodie',
        category: 'fashion',
        subcategory: 'hoodies',
        price: 899,
        originalPrice: 1399,
        emoji: '🧥',
        rating: 4.5,
        reviews: 134,
        description: 'Stylish gray hoodie for everyday comfort',
        specs: [
            'Material: Cotton Poly Blend',
            'Comfortable fit',
            'Multiple colors',
            'Lightweight',
            'Machine washable'
        ]
    },
    {
        id: 9,
        name: 'Premium Tech Hoodie',
        category: 'fashion',
        subcategory: 'hoodies',
        price: 1499,
        originalPrice: 2299,
        emoji: '🧥',
        rating: 4.7,
        reviews: 201,
        description: 'High-tech hoodie with moisture-wicking properties',
        specs: [
            'Material: Technical blend',
            'Moisture wicking',
            'Breathable fabric',
            'Water resistant',
            'Perfect for active wear'
        ]
    },

    // Watches
    {
        id: 10,
        name: 'Digital Sports Watch',
        category: 'watches',
        subcategory: 'digital',
        price: 2499,
        originalPrice: 4999,
        emoji: '⌚',
        rating: 4.5,
        reviews: 267,
        description: 'Feature-rich digital sports watch with multiple functions',
        specs: [
            'Water resistant: 50M',
            'LED display',
            'Multiple time zones',
            'Stopwatch & Timer',
            'Battery: 3-4 years',
            'Durable plastic band'
        ]
    },
    {
        id: 11,
        name: 'Analog Classic Watch',
        category: 'watches',
        subcategory: 'analog',
        price: 3499,
        originalPrice: 6999,
        emoji: '⌚',
        rating: 4.6,
        reviews: 189,
        description: 'Elegant analog watch with classic design',
        specs: [
            'Stainless steel case',
            'Water resistant: 30M',
            'Quartz movement',
            'Leather strap',
            'Date window',
            'Scratch resistant glass'
        ]
    },
    {
        id: 12,
        name: 'Smart Watch Pro',
        category: 'watches',
        subcategory: 'smartwatch',
        price: 5999,
        originalPrice: 9999,
        emoji: '⌚',
        rating: 4.7,
        reviews: 342,
        description: 'Advanced smartwatch with health monitoring features',
        specs: [
            'AMOLED Display',
            'Heart rate monitor',
            'Sleep tracking',
            'Bluetooth connectivity',
            'Battery: 7 days',
            'Waterproof: 50M',
            'Fitness modes: 100+'
        ]
    },

    // Gadgets
    {
        id: 13,
        name: 'Wireless Earbuds',
        category: 'gadgets',
        subcategory: 'earbuds',
        price: 1899,
        originalPrice: 3999,
        emoji: '🎧',
        rating: 4.6,
        reviews: 421,
        description: 'Premium wireless earbuds with noise cancellation',
        specs: [
            'Noise cancellation: Active',
            'Battery: 6 hours per charge',
            'Charging case: 24 hours total',
            'Bluetooth 5.0',
            'Water resistant: IPX4',
            'Touch controls'
        ]
    },
    {
        id: 14,
        name: 'Portable Power Bank',
        category: 'gadgets',
        subcategory: 'powerbank',
        price: 1299,
        originalPrice: 2499,
        emoji: '🔋',
        rating: 4.5,
        reviews: 567,
        description: 'High-capacity power bank for multiple device charging',
        specs: [
            'Capacity: 20000mAh',
            'Output: Dual USB',
            'Charging time: 4 hours',
            'Compact design',
            'LED display',
            'Supports fast charging'
        ]
    },
    {
        id: 15,
        name: 'USB-C Fast Charger',
        category: 'gadgets',
        subcategory: 'charger',
        price: 799,
        originalPrice: 1599,
        emoji: '🔌',
        rating: 4.4,
        reviews: 289,
        description: 'Fast USB-C charger for all compatible devices',
        specs: [
            'Power: 65W',
            'Ports: USB-C x 2',
            'Fast charging',
            'Compact size',
            'Heat dissipation',
            'Multiple device support'
        ]
    },

    // Electronics
    {
        id: 16,
        name: 'LED Table Lamp',
        category: 'electronics',
        subcategory: 'lighting',
        price: 899,
        originalPrice: 1699,
        emoji: '💡',
        rating: 4.5,
        reviews: 198,
        description: 'Modern LED table lamp with adjustable brightness',
        specs: [
            'Power: 12W LED',
            'Brightness levels: 3',
            'Touch control',
            'USB rechargeable',
            'Battery life: 8 hours',
            'Modern design'
        ]
    },
    {
        id: 17,
        name: 'Bluetooth Speaker',
        category: 'electronics',
        subcategory: 'speaker',
        price: 2299,
        originalPrice: 4499,
        emoji: '🔊',
        rating: 4.6,
        reviews: 412,
        description: 'Powerful Bluetooth speaker with rich bass',
        specs: [
            'Power: 30W',
            'Bluetooth 5.0',
            'Battery: 12 hours',
            'Water resistant: IPX6',
            'Portable design',
            'Bass enhancement'
        ]
    },
    {
        id: 18,
        name: 'Mini Projector',
        category: 'electronics',
        subcategory: 'projector',
        price: 7999,
        originalPrice: 12999,
        emoji: '🎬',
        rating: 4.7,
        reviews: 156,
        description: 'Compact projector for movies and presentations',
        specs: [
            'Resolution: 1080p',
            'Brightness: 2000 lumens',
            'Contrast: 100000:1',
            'Connectivity: HDMI, USB, WiFi',
            'Portable & lightweight',
            'Built-in speaker'
        ]
    },

    // Accessories
    {
        id: 19,
        name: 'Phone Stand Holder',
        category: 'gadgets',
        subcategory: 'accessories',
        price: 299,
        originalPrice: 599,
        emoji: '📱',
        rating: 4.4,
        reviews: 234,
        description: 'Adjustable phone stand for all devices',
        specs: [
            'Adjustable angle',
            'Universal compatibility',
            'Aluminum material',
            'Non-slip base',
            'Portable design',
            'Lifetime warranty'
        ]
    },
    {
        id: 20,
        name: 'Cable Organizer Set',
        category: 'gadgets',
        subcategory: 'accessories',
        price: 399,
        originalPrice: 799,
        emoji: '🔌',
        rating: 4.3,
        reviews: 167,
        description: 'Cable organizer set for neat cable management',
        specs: [
            'Quantity: 5 pieces',
            'Flexible silicone',
            'Multiple sizes',
            'Reusable design',
            'Color: Black',
            'Easy to clean'
        ]
    },
    {
        id: 21,
        name: 'Phone Screen Protector',
        category: 'gadgets',
        subcategory: 'accessories',
        price: 199,
        originalPrice: 499,
        emoji: '📱',
        rating: 4.5,
        reviews: 512,
        description: 'Tempered glass screen protector with easy installation',
        specs: [
            'Material: Tempered Glass',
            'Thickness: 0.3mm',
            'Hardness: 9H',
            'Easy installation',
            'Anti-fingerprint coating',
            'Clear transparency'
        ]
    },
    {
        id: 22,
        name: 'Fabric Shoulder Bag',
        category: 'fashion',
        subcategory: 'accessories',
        price: 799,
        originalPrice: 1499,
        emoji: '👜',
        rating: 4.4,
        reviews: 289,
        description: 'Stylish fabric shoulder bag for everyday use',
        specs: [
            'Material: Canvas',
            'Capacity: 12L',
            'Water resistant',
            'Multiple compartments',
            'Adjustable strap',
            'Durable stitching'
        ]
    },
    {
        id: 23,
        name: 'Leather Wallet',
        category: 'fashion',
        subcategory: 'accessories',
        price: 699,
        originalPrice: 1299,
        emoji: '👛',
        rating: 4.5,
        reviews: 324,
        description: 'Premium leather wallet with multiple card slots',
        specs: [
            'Material: Genuine Leather',
            'Card slots: 8',
            'RFID protection',
            'Compact design',
            'Available colors: 3',
            'Lifetime durability'
        ]
    },
    {
        id: 24,
        name: 'Sunglasses UV400',
        category: 'fashion',
        subcategory: 'accessories',
        price: 1299,
        originalPrice: 2499,
        emoji: '😎',
        rating: 4.6,
        reviews: 401,
        description: 'Premium UV400 sunglasses with stylish design',
        specs: [
            'UV protection: 400',
            'Lens type: Polarized',
            'Frame: Metal',
            'Design: Trendy',
            'Multiple styles',
            'Hard case included'
        ]
    }
];