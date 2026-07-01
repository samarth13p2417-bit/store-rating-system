const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Clean existing data in correct order (respecting foreign keys)
    console.log('🗑️  Cleaning existing data...');
    await prisma.rating.deleteMany({});
    console.log('   ✓ Ratings deleted');
    await prisma.store.deleteMany({});
    console.log('   ✓ Stores deleted');
    await prisma.user.deleteMany({});
    console.log('   ✓ Users deleted\n');

    // Hash passwords
    console.log('🔐 Hashing passwords...');
    const adminPassword = await bcrypt.hash('Admin@1234', 10);
    const ownerPassword = await bcrypt.hash('Owner@1234', 10);
    const userPassword = await bcrypt.hash('User@1234', 10);
    console.log('   ✓ Passwords hashed\n');

    // Create Admin
    console.log('👤 Creating admin user...');
    const admin = await prisma.user.create({
      data: {
        name: 'System Administrator User',
        email: 'admin@storerating.com',
        password: adminPassword,
        address: '123 Admin Street, Admin City, State 12345',
        role: 'ADMIN',
      },
    });
    console.log(`   ✓ Admin created: ${admin.email}\n`);

    // Create Store Owners
    console.log('🏪 Creating store owners...');
    const owner1 = await prisma.user.create({
      data: {
        name: 'Robert Store Owner One',
        email: 'owner1@storerating.com',
        password: ownerPassword,
        address: '456 Owner Avenue, Business District, State 23456',
        role: 'OWNER',
      },
    });
    console.log(`   ✓ Owner 1 created: ${owner1.email}`);

    const owner2 = await prisma.user.create({
      data: {
        name: 'Jennifer Store Owner Two',
        email: 'owner2@storerating.com',
        password: ownerPassword,
        address: '789 Commerce Blvd, Trade Center, State 34567',
        role: 'OWNER',
      },
    });
    console.log(`   ✓ Owner 2 created: ${owner2.email}`);

    const owner3 = await prisma.user.create({
      data: {
        name: 'Michael Store Owner Three',
        email: 'owner3@storerating.com',
        password: ownerPassword,
        address: '321 Market Street, Shopping Area, State 45678',
        role: 'OWNER',
      },
    });
    console.log(`   ✓ Owner 3 created: ${owner3.email}\n`);

    // Create Stores
    console.log('🏬 Creating stores...');
    const store1 = await prisma.store.create({
      data: {
        name: 'Sunrise Electronics Store',
        email: 'sunrise@store.com',
        address: '100 Tech Park Drive, Silicon Valley, State 56789',
        ownerId: owner1.id,
      },
    });
    console.log(`   ✓ Store 1 created: ${store1.name}`);

    const store2 = await prisma.store.create({
      data: {
        name: 'Mountain View Book Store One',
        email: 'mountainview@store.com',
        address: '200 Library Lane, University Town, State 67890',
        ownerId: owner2.id,
      },
    });
    console.log(`   ✓ Store 2 created: ${store2.name}`);

    const store3 = await prisma.store.create({
      data: {
        name: 'Golden Gate Fashion Store',
        email: 'goldengate@store.com',
        address: '300 Fashion Street, Style District, State 78901',
        ownerId: owner3.id,
      },
    });
    console.log(`   ✓ Store 3 created: ${store3.name}\n`);

    // Create Normal Users
    console.log('👥 Creating normal users...');
    const user1 = await prisma.user.create({
      data: {
        name: 'Alice Johnson Normal User',
        email: 'alice@user.com',
        password: userPassword,
        address: '111 Residential Road, Suburb Area, State 89012',
        role: 'USER',
      },
    });
    console.log(`   ✓ User 1 created: ${user1.email}`);

    const user2 = await prisma.user.create({
      data: {
        name: 'Bob Williams Normal User Two',
        email: 'bob@user.com',
        password: userPassword,
        address: '222 Apartment Complex, Downtown, State 90123',
        role: 'USER',
      },
    });
    console.log(`   ✓ User 2 created: ${user2.email}`);

    const user3 = await prisma.user.create({
      data: {
        name: 'Charlie Brown Normal User',
        email: 'charlie@user.com',
        password: userPassword,
        address: '333 Cottage Lane, Countryside, State 01234',
        role: 'USER',
      },
    });
    console.log(`   ✓ User 3 created: ${user3.email}`);

    const user4 = await prisma.user.create({
      data: {
        name: 'Diana Prince Normal User',
        email: 'diana@user.com',
        password: userPassword,
        address: '444 Hero Boulevard, Metro City, State 12345',
        role: 'USER',
      },
    });
    console.log(`   ✓ User 4 created: ${user4.email}\n`);

    // Create Ratings
    console.log('⭐ Creating ratings...');
    const ratingsData = [
      // Alice's ratings
      { rating: 5, userId: user1.id, storeId: store1.id },
      { rating: 4, userId: user1.id, storeId: store2.id },
      { rating: 3, userId: user1.id, storeId: store3.id },
      // Bob's ratings
      { rating: 4, userId: user2.id, storeId: store1.id },
      { rating: 5, userId: user2.id, storeId: store2.id },
      { rating: 4, userId: user2.id, storeId: store3.id },
      // Charlie's ratings
      { rating: 3, userId: user3.id, storeId: store1.id },
      { rating: 2, userId: user3.id, storeId: store2.id },
      { rating: 5, userId: user3.id, storeId: store3.id },
      // Diana's ratings
      { rating: 5, userId: user4.id, storeId: store1.id },
      { rating: 3, userId: user4.id, storeId: store3.id },
    ];

    for (const ratingData of ratingsData) {
      await prisma.rating.create({ data: ratingData });
    }
    console.log(`   ✓ ${ratingsData.length} ratings created\n`);

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('✅ Database seeded successfully!');
    console.log('═══════════════════════════════════════');
    console.log('\n📊 Summary:');
    console.log(`   • 1 Admin user`);
    console.log(`   • 3 Store owners`);
    console.log(`   • 3 Stores`);
    console.log(`   • 4 Normal users`);
    console.log(`   • ${ratingsData.length} Ratings`);
    console.log('\n🔑 Login Credentials:');
    console.log('   Admin:  admin@storerating.com / Admin@1234');
    console.log('   Owner1: owner1@storerating.com / Owner@1234');
    console.log('   Owner2: owner2@storerating.com / Owner@1234');
    console.log('   Owner3: owner3@storerating.com / Owner@1234');
    console.log('   User1:  alice@user.com / User@1234');
    console.log('   User2:  bob@user.com / User@1234');
    console.log('   User3:  charlie@user.com / User@1234');
    console.log('   User4:  diana@user.com / User@1234');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Database connection closed.');
  }
}

seed();
