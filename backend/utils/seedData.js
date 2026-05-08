const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load env
dotenv.config();

// Models
const User = require('../models/User');
const Product = require('../models/Product');
const Crop = require('../models/Crop');

const connectDB = require('../config/db');

const seedData = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany();
    await Product.deleteMany();
    await Crop.deleteMany();

    // ── Create Users ────────────────────────────
    console.log('👤 Creating users...');

    const farmer = await User.create({
      name: 'Manjeet Lodha',
      email: 'manjeet@farmit.com',
      phone: '9876543210',
      password: 'password123',
      role: 'farmer',
      location: 'Guna, Madhya Pradesh',
      preferredLanguage: 'en',
    });

    const expert1 = await User.create({
      name: 'Dr. Ravi Kumar',
      email: 'ravi@farmit.com',
      phone: '9876543211',
      password: 'password123',
      role: 'expert',
      location: 'New Delhi',
    });

    const expert2 = await User.create({
      name: 'Dr. Sunita Devi',
      email: 'sunita@farmit.com',
      phone: '9876543212',
      password: 'password123',
      role: 'expert',
      location: 'Jaipur, Rajasthan',
    });

    const vendor = await User.create({
      name: 'AgriMart India',
      email: 'vendor@farmit.com',
      phone: '9876543213',
      password: 'password123',
      role: 'vendor',
      location: 'Mumbai, Maharashtra',
    });

    // ── Create Crops ────────────────────────────
    console.log('🌾 Creating crops...');

    await Crop.create([
      {
        cropName: 'Wheat',
        variety: 'Lok-1',
        growthPercentage: 65,
        cropStage: 'Grain Filling',
        healthStatus: 'Healthy',
        diseaseRisk: 'None',
        soilMoisture: 18,
        acreage: 2.5,
        farmerId: farmer._id,
        nextAction: 'Harvesting in 18 days',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrnaOut2o3NiA8wuftZUesZmlTSSIGvCnzuiXGtIXxm8niujcsKrNac6pWYe7ml22n1uxVg7TjvWA4lBmXVFbreYXQy2GZjku-GXmQH7cBOgaSse4x_j1EMcF1kL6UvGW1mKHMrMfceUZMPAXh8XRQM6C3K1S7KEH4sZHCi1fx6klAz_ebFqG565PWV03RQj14gtZKZQkJYSBqph0YY4OMY-SXETlmtATPXvEQCQ9DCVq8RMurGP8552dl3DnaMJoA8I1MEPvlFjU',
      },
      {
        cropName: 'Mustard',
        variety: 'Black',
        growthPercentage: 40,
        cropStage: 'Growing',
        healthStatus: 'Needs Attention',
        diseaseRisk: 'Aphid attack risk detected',
        soilMoisture: 22,
        acreage: 1.0,
        farmerId: farmer._id,
        nextAction: 'Irrigation in 2 days',
        image: '/mustard_field.png',
      },
    ]);

    // ── Create Products ─────────────────────────
    console.log('🛒 Creating products...');

    await Product.create([
      {
        productName: 'NPK Fertilizer (10-26-26)',
        category: 'Fertilizers',
        price: 850,
        originalPrice: 999,
        stock: 150,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG8rjz0zxTqfCqPtaQ94L2qfWVIqhz4XFPrSM1H5H3T2ioIgBwVRs-KPOvQJnMPHp0CVlNOGjKQnMlXPq4GfMCYDeFGdJmJJuMXR1VqBz3dZd3bkwj3gIbr0P-jZEtIPaSxRGrwYlVDRSLcCw',
        description: 'High-quality NPK fertilizer for balanced crop nutrition. Ideal for wheat, rice, and vegetables.',
        rating: 4.5,
        reviewCount: 128,
        tags: ['Best Seller', '-15%'],
        seller: vendor._id,
      },
      {
        productName: 'Neem Oil Organic Pesticide',
        category: 'Organic',
        price: 320,
        originalPrice: 399,
        stock: 200,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC58KO8_JkjZjDX6UYPqwK7TlNyj4n-CrxQ0mxqUjvWWnO6pAqRqmJbmcJf1LccR0DM1XhPFOiOLv0GZdH8z4HxRFWYlCZvkTcFd_P4WAfHnxnFqxnW-6xqvzOcW9eGVw',
        description: '100% organic neem-based pesticide for natural pest control. Safe for crops and soil.',
        rating: 4.7,
        reviewCount: 89,
        tags: ['Organic', '-20%'],
        seller: vendor._id,
      },
      {
        productName: 'Wheat Seeds (HD-2967)',
        category: 'Seeds',
        price: 450,
        originalPrice: 500,
        stock: 300,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNtiXvY2hvHrB0H116DC92rppfahtv5qVNnE_u-zc5QtN_gbGe2EvO2DAhiih1NcnBh5Up8xUiF4UVIq-vklIHFlCenlNZt4Ogp-MJRh2zE-qcuiemWIdvmy0tXGKiBdfn6J9QzfnQ1cIif4pEwHfTZU_wrQxmcYRGYLr8_Vr1ooCSWZp2e_98tejJtInu5kphHo2OYaqeIsi3hnC2SyJ7RaHD-jihCz16Ynga_y9nvdxovSn5LRWE2V9Ff_XKVBu2OUlUusbB9C0',
        description: 'High-yield wheat variety ideal for Rabi season. Disease resistant and drought tolerant.',
        rating: 4.6,
        reviewCount: 245,
        tags: ['Top Rated'],
        seller: vendor._id,
      },
      {
        productName: 'Hand Sprayer (16L)',
        category: 'Tools',
        price: 1200,
        originalPrice: 1500,
        stock: 50,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjfPaLhxe2dfrXSPsCGmV-0lYRcaAU8UrRcW-DLCQ8A7tBuM1nYSjNMCKM4lOu4x7lWFpVwRUEVxSHVfJqfRrjk7-G5Ym9WnxJjv6rA2RYqf3xRNwCOVcj8',
        description: 'Heavy-duty 16-liter manual sprayer for pesticide and fertilizer application.',
        rating: 4.3,
        reviewCount: 67,
        tags: ['-20%'],
        seller: vendor._id,
      },
      {
        productName: 'DAP Fertilizer (50kg)',
        category: 'Fertilizers',
        price: 1350,
        originalPrice: 1350,
        stock: 100,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG8rjz0zxTqfCqPtaQ94L2qfWVIqhz4XFPrSM1H5H3T2ioIgBwVRs-KPOvQJnMPHp0CVlNOGjKQnMlXPq4GfMCYDeFGdJmJJuMXR1VqBz3dZd3bkwj3gIbr0P-jZEtIPaSxRGrwYlVDRSLcCw',
        description: 'Di-Ammonium Phosphate for strong root development. Essential for Rabi crops.',
        rating: 4.4,
        reviewCount: 190,
        tags: [],
        seller: vendor._id,
      },
      {
        productName: 'Imidacloprid Insecticide',
        category: 'Pesticides',
        price: 280,
        originalPrice: 350,
        stock: 180,
        description: 'Systemic insecticide for sucking pests. Effective against aphids, whiteflies, and jassids.',
        rating: 4.2,
        reviewCount: 56,
        tags: ['-20%'],
        seller: vendor._id,
      },
    ]);

    console.log('\n✅ Seed data inserted successfully!');
    console.log(`   👤 Users: 4 (1 farmer, 2 experts, 1 vendor)`);
    console.log(`   🌾 Crops: 2`);
    console.log(`   🛒 Products: 6`);
    console.log(`\n   📧 Login credentials:`);
    console.log(`   Farmer: manjeet@farmit.com / password123`);
    console.log(`   Expert: ravi@farmit.com / password123`);
    console.log(`   Vendor: vendor@farmit.com / password123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
